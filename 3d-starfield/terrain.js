(function(){
    function render (context, points) {
        console.log ('render called');
        var angle   = 0,
            center  = new Point3D (400,400,400);

        return function () {
            context.clearRect(0,0,800,600);
            if (points.length < 1000) {
                points.push (randomPoint());
            }
            if (angle > 360) {angle = 0;}
            points.map (
                function (pt) {
                    return pt.subtract (center);
                }
            ).map (
                function (pt) {
                    return y_rotate(pt, angle);
                }
            )/*.map (
                function (pt) {
                    return x_rotate(pt, angle);
                }
            )//.map (
                function (pt) {
                    return z_rotate(pt,angle);
                }
            )/**/.map (
                function (pt) {
                    return project (pt,700);
                }
            ).map (
                function (pt) {
                    return {
                        x: pt['x'] + center.x,
                        y: pt['y'] + center.y,
                        scale: pt['scale']
                    }
                }
            ).forEach (
                function (pt) {
                    if (pt.scale < 0) {return;}

                    context.fillStyle = 'rgba(255,255,255,' + pt.scale + ')';
                    context.beginPath();
                    context.arc(pt.x, pt.y, 4*pt.scale, 0, Math.PI * 2, true);
                    context.closePath();
                    context.fill();
                }
            );
            angle = angle + 1;
        }
    }

    function randomInt (min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function randomPoint () {
        return new Point3D (
            randomInt (-100,900),
            randomInt (-100,900),
            randomInt (-100,900),
            1,
            randomInt (1,10)
        );
    }

    function init() {
        console.log ('inited');
        var viewport    = document.getElementById('viewport'),
            context     = viewport.getContext ('2d'),
            points      = [];

        context.strokeStyle = '#aaa';
        context.lineWidth   = 1;

        setInterval (render (context, points), 50);
    }

    document.body.onload = init;
}());