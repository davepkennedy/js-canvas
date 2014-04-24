(function(){
    function midPoint (rect) {
        var x = 0,
            y = 0,
            z = 0;
        for (var i = 0; i < rect.length; i++) {
            x += rect[i].x;
            y += rect[i].y;
            z += rect[i].z;
        }

        x /= rect.length;
        y /= rect.length;
        z /= rect.length;
        y += randomInt (-25, 0);

        return new Point3D (x,y,z);
    }

    function subdiv (rect) {
        var ctr     = midPoint(rect),
            pt0_1   = new Point3D (rect[0].x, (rect[0].y+rect[1].y) / 2, ctr.z),
            pt1_2   = new Point3D (ctr.x, (rect[1].y+rect[2].y) / 2, rect[1].z),
            pt2_3   = new Point3D (rect[2].x, (rect[2].y+rect[3].y) / 2, ctr.z),
            pt3_0   = new Point3D (ctr.x, (rect[3].y+rect[0].y) / 2, rect[3].z);
        return [
            [rect[0], pt0_1, ctr, pt3_0],
            [pt0_1, rect[1], pt1_2, ctr],
            [ctr, pt1_2, rect[2], pt2_3],
            [pt3_0, ctr, pt2_3, rect[3]]
        ]
    } 

    function render (context, rects) {
        var angle   = 0,
            level   = 0,
            center  = new Point3D (400,400,400);

        return function () {
            context.clearRect(0,0,800,600);
            if (angle > 360) {angle = 0;}
            if (angle % 90 === 0 && level < 4) {
                var newRects = [];
                while (rects.length) {
                    var r = subdiv (rects.pop());
                    for (var i = 0; i < r.length; i++) {
                        newRects.push (r[i]);
                    }
                }
                rects = newRects;
                level ++;
            }

            rects.map (
                function (rect) {
                    return rect.map (
                        function (pt) {
                            return pt.subtract (center);
                        }
                    )
                }
            ).map (
                function (rect) {
                    return rect.map (
                        function (pt) {
                            return y_rotate(pt, angle);
                        }
                    )
                }
            )/*.map (
                function (pt) {
                    return x_rotate(pt, angle);
                }
            )*/.map (
                function (rect) {
                    return rect.map (
                        function (pt) {
                            return x_rotate(pt,30);
                        }
                    )
                }
            )/**/.map (
                function (rect) {
                    return rect.map (
                        function (pt) {
                            return project (pt,350);
                        }
                    )
                }
            ).map (
                function (rect) {
                    return rect.map (
                        function (pt) {
                            return {
                                x: pt['x'] + center.x,
                                y: pt['y'] + center.y,
                                scale: pt['scale']
                            }
                        }
                    )
                }
            ).forEach (
                function (rect) {
                    //if (pt.scale < 0) {return;}

                    context.beginPath();
                    context.moveTo(rect[0].x,rect[0].y);
                    context.lineTo(rect[1].x,rect[1].y);
                    context.lineTo(rect[2].x,rect[2].y);
                    context.lineTo(rect[3].x,rect[3].y);
                    context.lineTo(rect[0].x,rect[0].y);
                    context.stroke()
                    context.closePath();
                }
            );
            angle = angle + 0.25;
        }
    }

    function randomInt (min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function init() {
        console.log ('inited');
        var viewport    = document.getElementById('viewport'),
            context     = viewport.getContext ('2d'),
            rects       = [
                [
                    new Point3D (200, 500, 200),
                    new Point3D (200, 500, 600),
                    new Point3D (600, 500, 600),
                    new Point3D (600, 500, 200),
                ]
            ];

        context.strokeStyle = '#aaa';
        context.lineWidth   = 1;

        setInterval (render (context, rects), 10);
    }

    document.body.onload = init;
}());