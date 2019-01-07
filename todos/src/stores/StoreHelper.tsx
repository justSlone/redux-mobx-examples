import React from 'react';
import {inject, observer} from 'mobx-react';
import {DeepReadonly} from 'ts-essentials';

type Constructor<T> = new (...args: any[]) => T;

export class View<T> {
  constructor(protected state: DeepReadonly<T>) {}
} 

export class Actions<T> {
  constructor(protected state: T) {}
}

export function CreateStore_old<S, V, A>(
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

export function CreateStore<S,A>(
  StateCon: Constructor<S>,
  ActionsCon: Constructor<A>
) {
  class StoreClass {
    private state: S;
    public actions: A;
    constructor() {
      this.state = new StateCon();
      this.actions = new ActionsCon(this.state);
    }
    getState() {
      return this.state as DeepReadonly<S>
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

export function connect (mapViewToProps: (view: any, ownProps: any)=>any, mapActionsToProps: (view: any, ownProps: any)=>void) {
  return function connector (Component: any) {
    return inject("actions", "view")(
      observer(({ actions, view, ...props }) => (
        <Component {...mapViewToProps(view, props)} {...mapActionsToProps(actions, props)} {...props} />
      )));
  }
}