# 记点“笔记”

## 可观察的数据（observable）

- 对于 Array Object Map 这些数据结构，直接用 observable() 包裹起来。

```js
const map = observable(new Map());
map.set('a', 520);
console.log(map.get('a')); //520
```

- 对于 Number String Boolean 必须用 observable.box() 包裹起来。

```js
let num = observable.box(20);
let str = observable.box('jingjing');
let bool = observable.box(false);
console.log(num, str, bool);
```

## 对可观察的数据做出反应

### computed

- 计算值(computed values)是可以根据现有的状态或其它计算值衍生出的值。
- 不要把 computed 和 autorun 搞混。它们都是响应式调用的表达式，但是，如果你想响应式的产生一个可以被其它 observer 使用的值，请使用 @computed，如果你不想产生一个新值，而想要达到一个效果，请使用 autorun。
