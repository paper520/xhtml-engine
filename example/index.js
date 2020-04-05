const template = require('fs').readFileSync('../code.html', 'utf-8');

let engine = require('../index')(template,[3]);

console.log(engine.valueOf());
console.log(engine + "");

console.log("parent:" + engine.parent());
console.log("parents:" + engine.parents());
console.log("children:" + engine.children());
console.log("siblings:" + engine.siblings());
console.log("next:" + engine.next());
console.log("nextAll:" + engine.nextAll());
console.log("prev:" + engine.prev());
console.log("prevAll:" + engine.prevAll());