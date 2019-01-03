let foo = "bar";
export {foo}
// export class FilterStore {  
//   private state = new FilterStoreState();
//   actions = new FilterStoreActions(this.state);
//   view = new FilterStoreView(this.state);
  
//   // get state() {
//   //   return this._state as DeepReadonly<FilterStoreState>
//   // }
// }

// function createStore<T,V,A>(
//   state: Constructor<T>,
//   view: Constructor<V> ,
//   actions: Constructor<A> 
//   ): {view: V, actions: A} {
//   let _state = new state();
//   return {view: new view(_state), actions: new actions(_state)}
// }

// let foo = createStore(FilterStoreState, FilterStoreView, FilterStoreActions);

// class NewFilterStore<T,V,A> {
//   private state: T
//   public view: V
//   public actions: A

//   constructor(
//     State: Constructor<T>,
//     View: Constructor<V> ,
//     Actions: Constructor<A> 
//   ) {
//     this.state = new State();
//     this.view = new View(this.state);
//     this.actions = new Actions(this.state);
//   }
// }

// let foo2 = new NewFilterStore(FilterStoreState, FilterStoreView, FilterStoreActions);



// let NewNewFilterStore = CreateStore(FilterStoreState, FilterStoreView, FilterStoreActions);
// let foo3 = new NewNewFilterStore();

// export {NewNewFilterStore as NewFilterStore}
// console.log(foo3.view);
// console.log(foo3.actions);

