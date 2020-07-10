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
