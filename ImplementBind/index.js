Function.prototype.myBind = function (obj) {
	return (...args) => {
		this.apply(obj ? obj : null, args);
	};
};

const obj1 = {
	name: "bbj1",
	method1: function () {
		console.log(this.name);
	},
	add: function (a, b, c) {
		console.log(100 + a + b + c);
	},
};
const obj2 = {
	name: "obj2",
	method1: function () {
		console.log(this.name);
	},
	add: function (a, b, c) {
		console.log(10 + a + b + c);
	},
};
obj1.method1();
obj2.method1();

obj1.add.bind(obj2)(1, 2, 3);
obj1.add.myBind(obj2)(1, 2, 3);
