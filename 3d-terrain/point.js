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