import { observable, computed } from 'mobx';

class Store {
  @observable array = [];
  @observable obj = {};
  @observable map = new Map();

  @observable string = 'jing';
  @observable number = 520;
  @observable bool = false;
}

// computed

let store = new Store();
// computed
let foo = computed(() => {
  return store.string + '/' + store.number;
});
console.log(foo.get());

foo.observe((jing) => {
  console.log(jing);
});

store.number = 1314;
store.string = 'haohao';
