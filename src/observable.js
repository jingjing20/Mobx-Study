import { observable } from 'mobx';
// array object map 直接用 observable 监听

const map = observable(new Map());
map.set('a', 520);
console.log(map.get('a'));

// number string Boolean 需要用 observable.box

let num = observable.box(20);
let str = observable.box('jingjing');
let bool = observable.box(false);
console.log(num, str, bool);
