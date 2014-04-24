var Point3D = function (x,y,z,w,v) {
	this.x = x;
	this.y = y;
	this.z = z;
	if (w) {this.w = w;}
	else {this.w = 1;}
	if (v) {this.v = v;}
	else {this.v = 1;}
};

var rad = Math.PI / 180;

Point3D.prototype = {

	rotate: function (angle, rotation, center) {
		if (!center) {center = new Point3D (0,0,0);}
		if (angle > 360) {angle -= 360;}
		if (angle < 0) {angle += 360;}
		return rotation (this.subtract(center), angle).add(center);
	},

	add: function (vector) {
		return new Point3D (
			this.x + vector.x,
			this.y + vector.y,
			this.z + vector.z,
			this.w,
			this.v
		);			
	},

	subtract: function (vector) {
		return new Point3D (
			this.x - vector.x,
			this.y - vector.y,
			this.z - vector.z,
			this.w,
			this.v
		);	
	},

	draw: function (canvas) {
		var fov = 700,
			scale = fov/(fov + this.z);
			x2d = this.x * scale;
			y2d = this.y * scale;
		
		if (scale < 0) return;

        canvas.fillStyle = 'rgba(255,255,255,' + scale + ')';
        canvas.beginPath();
		canvas.arc(x2d, y2d, 4*scale, 0, Math.PI * 2, true);
        canvas.closePath();
        canvas.fill();
	}
}

var x_rotate = function (point, angle) {
	if (angle > 360) {angle -= 360;}
	angle = angle * rad * point.v;
	return new Point3D (
		point.x,
		(point.y * Math.cos (angle)) + (point.z * -Math.sin(angle)),
		(point.y * Math.sin (angle)) + (point.z * Math.cos(angle)),
		point.w,
		point.v
	);
}

var y_rotate = function (point, angle) {
	if (angle > 360) {angle -= 360;}
	angle = angle * rad * point.v;
	return new Point3D (
		(point.x * Math.cos (angle)) + (point.z * Math.sin(angle)),
		point.y,
		(point.x * -Math.sin (angle)) + (point.z * Math.cos(angle)),
		point.w,
		point.v
	);
}

var z_rotate = function (point, angle) {
	if (angle > 360) {angle -= 360;}
	angle = angle * rad * point.v;
	return new Point3D (
		(point.x * Math.cos (angle)) + (point.y * -Math.sin(angle)),
		(point.x * Math.sin (angle)) + (point.y * Math.cos(angle)),
		point.z,
		point.w,
		point.v
	);	
}

var project = function (point, fov) {
	if (!fov) {fov = 350;}
	var scale = fov/(fov + point.z);
	return {
		x: point.x * scale,
		y: point.y * scale,
		scale: scale
	};
}