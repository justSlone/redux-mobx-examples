type Constructor<T> = new(...args: any[]) => T;

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
