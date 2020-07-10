import { observable, computed, autorun, when, reaction, action } from 'mobx';

class Store {
  @observable array = [];
  @observable obj = {};
  @observable map = new Map();

  @observable string = 'jing';
  @observable number = 520;
  @observable bool = false;
  @computed get mixed() {
    return store.string + '/' + store.number;
  }
  //类比合并更新 不会多次更新
  @action.bound bar() {
    this.number = 1314;
    this.string = 'hao';
  }
}

let store = new Store();

// 1、computed

// let foo = computed(() => {
//   return store.string + '/' + store.number;
// });
// console.log(foo.get());

// foo.observe((jing) => {
//   console.log(jing);
// });

// store.number = 1314;
// store.string = 'haohao';

// 2、autorun

// autorun(() => {
//   console.log(store.mixed);
// });
// store.number = 1314;
// store.string = 'haohao';

// 3、when

// console.log('before');
// when(
//   () => store.bool,
//   () => console.log('it`s true!')
// );
// console.log('after');
// store.bool = true;

// 4、reaction

reaction(
  () => [store.number, store.string],
  (arr) => {
    console.log(arr.join('/'));
  }
);
// store.number = 1314;
// store.string = 'haohao';
let bar = store.bar;
bar();
