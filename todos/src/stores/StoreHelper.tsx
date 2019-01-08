import React from 'react';
import {inject, observer} from 'mobx-react';

type Constructor<T> = new (...args: any[]) => T;

export class View<T> {
  constructor(protected state: T) {}
}

export class Actions<T> {
  constructor(protected state: T) {}
}

export function CreateStore<S, V, A>(
  State: Constructor<S>,
  View: Constructor<V>,
  Actions: Constructor<A>
) {
  class StoreClass {
    private state: S;
    public view: V;
    public actions: A;
    constructor() {
      this.state = new State();
      this.view = new View(this.state);
      this.actions = new Actions(this.state);
    }
  }
  return StoreClass;
}

export function CreateStoreFactory<S, V, A>(
  State: Constructor<S>,
  View: Constructor<V>,
  Actions: Constructor<A>
) {
    return function() {
        let _state = new State();
        return {
          view: new View(_state),
          actions: new Actions(_state)
        };
    }
}

export function connect (mapSelectorsToProps: (selectors: any, ownProps: any)=>any, mapActionsToProps: (actions: any, ownProps: any)=>void) {
  return function connector (Component: any) {
    return inject("store")(
      observer(({ store, ...props }) => (
        <Component {...mapSelectorsToProps(store.selectors, props)} {...mapActionsToProps(store.actions, props)} {...props} />
      )));
  }
}