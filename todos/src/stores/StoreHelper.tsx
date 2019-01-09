import React from 'react';
import {inject, observer} from 'mobx-react';
import {getRootStore, createStore} from 'satcheljs';
import {DeepReadonly} from 'ts-essentials';

export function connect(mapSelectorsToProps: (selectors: any, ownProps: any)=>any, mapActionsToProps: (actions: any, ownProps: any)=>any) {
  return function connector (Component: any) {
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

export function MixFun<A, A2, B, B2>(fa: (store: A2)=>A, fb: (store: B2)=>B): (store: A2&B2)=> A&B
export function MixFun<A, A2, B, B2, C, C2>(fa: (store: A2)=>A, fb: (store: B2)=>B, fc: (store: C2)=>C): (store: A2&B2&C2)=> A&B&C
export function MixFun<A, A2, B, B2, C, C2, D, D2>(fa: (store: A2)=>A, fb: (store: B2)=>B, fc: (store: C2)=>C, fd: (store: D2)=>D): (store: A2&B2&C2&D2)=> A&B&C&D
export function MixFun<A, A2, B, B2, C, C2, D, D2, E, E2>(fa: (store: A2)=>A, fb: (store: B2)=>B, fc: (store: C2)=>C, fd: (store: D2)=>D, fe: (store: E2)=>E): (store: A2&B2&C2&D2&E2)=> A&B&C&D&E
export function MixFun(...args: any[]) {
  return (store: any) => {
    let retObj = {};
    for(const f of args) {
      retObj = MixObj(retObj, f(store));
    }
    return retObj;
  }
}

export function realizeMixedStore<St, A, Se>(s1: {initialState: St, createActions: (store: ()=>St)=>A, createSelectors: (store: ()=>St)=>Se }) {
  type State = St
  type Actions = A
  type Selectors = Se
  class MixedClass {
    private store: ()=>State
    public getState: ()=>DeepReadonly<State>    
    public actions: Actions
    public selectors: Selectors
    constructor(name: string = "store", initialState: State = s1.initialState) {
      this.store = createStore<St>(name,initialState); 
      this.actions = s1.createActions(this.store);
      this.selectors = s1.createSelectors(this.store);     
      this.getState = this.store as ()=>DeepReadonly<State>  
    }    
  }
  return MixedClass;
}
