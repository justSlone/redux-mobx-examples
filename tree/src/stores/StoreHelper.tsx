import React from 'react';
import { inject, observer } from 'mobx-react';
import { getRootStore, createStore } from 'satcheljs';
import { DeepReadonly } from 'ts-essentials';
import { type } from 'os';

export function connect<T>(mapSelectorsToProps: (selectors: any, ownProps: T) => any, mapActionsToProps: (actions: any, ownProps: T) => any) {
  return function connector(Component: any) {
    return inject("store")(
      observer(({ store, ...props }) => (
        <Component {...mapSelectorsToProps(store.selectors, props)} {...mapActionsToProps(store.actions, props)} {...props} />
      )));
  }
}

export function MixObj<A>(a: A): A;
export function MixObj<A, B>(a: A, b: B): A & B;
export function MixObj<A, B, C>(a: A, b: B, c: C): A & B & C;
export function MixObj<A, B, C, D>(a: A, b: B, c: C, d: D): A & B & C & D;
export function MixObj(...args: any[]): any {
  const newObj: any = {};
  for (const obj of args) {
    for (const key in obj) {
      //copy all the fields
      newObj[key] = obj[key];
    }
  }
  return newObj;
};

export function MixFun<A, A2, B, B2>(fa: (store: A2) => A, fb: (store: B2) => B): (store: A2 & B2) => A & B
export function MixFun<A, A2, B, B2, C, C2>(fa: (store: A2) => A, fb: (store: B2) => B, fc: (store: C2) => C): (store: A2 & B2 & C2) => A & B & C
export function MixFun<A, A2, B, B2, C, C2, D, D2>(fa: (store: A2) => A, fb: (store: B2) => B, fc: (store: C2) => C, fd: (store: D2) => D): (store: A2 & B2 & C2 & D2) => A & B & C & D
export function MixFun<A, A2, B, B2, C, C2, D, D2, E, E2>(fa: (store: A2) => A, fb: (store: B2) => B, fc: (store: C2) => C, fd: (store: D2) => D, fe: (store: E2) => E): (store: A2 & B2 & C2 & D2 & E2) => A & B & C & D & E
export function MixFun(...args: any[]) {
  return (store: any) => {
    let retObj = {};
    for (const f of args) {
      retObj = MixObj(retObj, f(store));
    }
    return retObj;
  }
}

export function MixFun2<A, B>(fa: (...args: any[]) => A, fb: (...args: any[]) => B): (...args: any[]) => A & B
export function MixFun2<A, B, C>(fa: (...args: any[]) => A, fb: (...args: any[]) => B, fc: (...args: any[]) => C): (...args: any[]) => A & B & C
export function MixFun2(...args: any[]) {
  return (...funArgs: any[]) => {
    let retObj = {};
    for (const f of args) {
      retObj = MixObj(retObj, f(...funArgs));
    }
    return retObj;
  }
}

export function realizeMixedStore<St, A, Se>(s1: { 
    initialState: St, 
    createActions: (store: () => St) => A, 
    createSelectors: (store: () => St) => Se, 
    registerMutators: (store: ()=>St, actions: A) => void,
  }) {
  type State = St
  type Actions = A
  type Selectors = Se
  class MixedClass {
    private store: () => State
    public getState: () => State
    public actions: Actions
    public selectors: Selectors
    constructor(name: string, initialState: State = s1.initialState) {
      this.store = createStore<St>(name, initialState);
      this.actions = s1.createActions(this.store);
      this.selectors = s1.createSelectors(this.store);
      this.getState = this.store; //as () => DeepReadonly<State>
    }
  }
  return MixedClass;
}

export function createStoreFromTemplate<St, A, Se>(name: string, template: { 
  initialState: St, 
  createActions: (store: () => St) => A, 
  createSelectors: (store: () => St) => Se, 
  registerMutators: (store: ()=>St, actions: A, selectors: Se) => void,
  registerOrchestrators: (actions: A) => void
}) {
  type State = St
  type Actions = A
  type Selectors = Se
  let _store = createStore<State>(name, template.initialState);
  let store = {
    getState: _store, //as () => DeepReadonly<State>,
    actions: template.createActions(_store),
    selectors: template.createSelectors(_store)
  }
  template.registerMutators(_store, store.actions, store.selectors);
  template.registerOrchestrators(store.actions);

  let connect = function connect<T>(mapSelectorsToProps: (selectors: Se, ownProps: T) => any, mapActionsToProps: (actions: A, ownProps: T) => any) {
    return function connector(Component: any) {
      return inject("store")(
        observer(({ store, ...props }) => (
          <Component {...mapSelectorsToProps(store.selectors, props)} {...mapActionsToProps(store.actions, props)} {...props} />
        )));
    }
  }
  return {store, connect};
}

export function getTypesFromTemplate<St, A, Se>(template: { initialState: St, createActions: (store: () => St) => A, createSelectors: (store: () => St) => Se }) {
  interface q {actions: A}
}

export function getTypesFromStore<St, A, Se>(store: { getState: () => DeepReadonly<St>, actions: A, selectors: Se }) {
  type StoreState = ReturnType<typeof store.getState>;
  type StoreActions = typeof store.actions;
  type StoreSelectors = typeof store.selectors;
}

export function createConnectFromTemplate<St, A, Se>(template: { initialState: St, createActions: (store: () => St) => A, createSelectors: (store: () => St) => Se }) {
  
  return connect;
}