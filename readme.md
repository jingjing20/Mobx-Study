# 记点“笔记”

完整代码见 src/index.js

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

## 对可观察的数据（observable）做出反应

### computed

- 计算值(computed values)是可以根据现有的状态或其它计算值衍生出的值。
- 不要把 computed 和 autorun 搞混。它们都是响应式调用的表达式，但是，如果你想响应式的产生一个可以被其它 observer 使用的值，请使用 @computed，如果你不想产生一个新值，而想要达到一个效果，请使用 autorun。

```js
let foo = computed(() => {
  return store.string + '/' + store.number;
});
console.log(foo.get());

foo.observe((jing) => {
  console.log(jing);
});

store.number = 1314;
store.string = 'haohao';
```

### autorun

- autorun 用来自动运行什么？——传入 autorun 的函数参数。
- 什么时候 autorun 会自动运行？——修改 autorun 中引用的任意可观察数据。

```js
const { autorun } = require('mobx');

var numbers = observable([1, 2, 3]);
var sum = computed(() => numbers.reduce((a, b) => a + b, 0));

// autorun 返回一个可以清理 autorun 的参数即这里的 disposer
var disposer = autorun(() => console.log(sum.get()));
// 输出 '6'
numbers.push(4);
// 输出 '10'

disposer(); //调用 disposer 清理这个 autorun 之后再改变它的依赖关系不会再重新计算输出
numbers.push(5);
// 不会再输出任何值。`sum` 不会再重新计算。
```

### when

```js
when(predicate: () => boolean, effect?: () => void, options?)
```

when 观察并运行给定的 predicate，直到返回 true。 一旦返回 true，给定的 effect 就会被执行，然后 autorunner(自动运行程序) 会被清理。 该函数返回一个清理器以提前取消自动运行程序。

```js
console.log('before');
when(
  () => store.bool, //predicate
  () => console.log('it`s true!') //effect
);
console.log('after');
store.bool = true;
// before
// after
// it`s true!
```

### reaction

reaction 可以说是 autorun 的变种，对于如何追踪 observable 赋予了更细粒度的控制。 它接收两个函数参数，第一个(数据 函数)是用来追踪并返回数据作为第二个函数(效果 函数)的输入。 不同于 autorun 的是当创建时效果 函数不会直接运行，只有在数据表达式首次返回一个新值后才会运行。 在执行 效果 函数时访问的任何 observable 都不会被追踪。

```js
reaction(
  () => [store.number, store.string],
  (arr) => {
    console.log(arr.join('/'));
  }
);
store.number = 1314;
store.string = 'haohao';
```

## 改变（observable）

### action

- action 中会对更新操作合并

```js
//类比合并更新 不会多次更新
@action bar() {
  this.number = 1314;
  this.string = 'hao';
}

store.bar();
// 只会输出一次 1314/hao
```

### action.bound

- action.bound 可以绑定 this
- **action.bound 不可以和箭头函数一起使用！因为箭头函数的 this 指向不可以被改变。**

```js
//类比合并更新 不会多次更新
@action.bound bar() {
  this.number = 1314;
  this.string = 'hao';
}

let bar = store.bar;
bar();
// 同样只会输出一次 1314/hao
```
