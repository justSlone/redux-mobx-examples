import React, {Context} from "react";
import { TreeStore } from "./TreeStoreClass";

export interface StoreContextInterface {
  treeStore: TreeStore;
}
const ctxt = React.createContext<StoreContextInterface>({} as StoreContextInterface);
export const StoreProvider = ctxt.Provider;
export const StoreConsumer = ctxt.Consumer;
export const injectFromStore = createInject(ctxt);





// type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

// export function withStoreContext<
//   P extends { storeContext?: StoreContextInterface },
//   R = Omit<P, "storeContext">
// >(Component: React.ComponentClass<P> | React.StatelessComponent<P>
// ): React.FunctionComponent<R> {
//   return function BoundComponent(props: R) {
//     return <StoreConsumer>
//       {value => <Component {...props} storeContext={value} />}
//     </StoreConsumer>;
//   };
// }

// type Omit<A extends object, K extends objKey> = Pick<A, Exclude<keyof A, K>>;
type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export function withStoreContext<
  P extends { storeContext: StoreContextInterface },
  R = Omit<P, "storeContext">
>(
  Component: React.ComponentClass<P> | React.StatelessComponent<P>
): React.SFC<R> {
  return function BoundComponent(props: R) {
    return (
      <StoreConsumer>
        {value => {
          let newProps = ({ ...props, storeContext: value } as unknown) as P;
          return <Component {...newProps} />;
        }}
      </StoreConsumer>
    );
  };
}

export function createInject<CI>(ctxt: Context<CI>) {
  return function injectFromStore<MappedProps>(mapContextToProps: (ctx: CI) => MappedProps) {
    return function injectContext<P extends MappedProps,R = Omit<P, keyof MappedProps>>
    ( Component: React.ComponentClass<P> | React.StatelessComponent<P>): React.SFC<R> {
      return function BoundComponent(props: R) {
        return (
          <ctxt.Consumer>
            {(value: CI) => {
              let mappedProps = mapContextToProps(value);
              let newProps = ({ ...props, ...mappedProps} as unknown) as P;
              return <Component {...newProps} />;
            }}
          </ctxt.Consumer>
        );
      };
    };
  }
}




function injectFromStoreOld<MappedProps>(
  mapContextToProps: (ctx: StoreContextInterface) => MappedProps
) {
  return function injectContext<
    P extends MappedProps,
    R = Omit<P, keyof MappedProps>
  >(    
    Component: React.ComponentClass<P> | React.StatelessComponent<P>
  ): React.SFC<R> {
    return function BoundComponent(props: R) {
      return (
        <StoreConsumer>
          {(value: StoreContextInterface) => {
            let mappedProps = mapContextToProps(value);
            let newProps = ({ ...props, ...mappedProps} as unknown) as P;
            return <Component {...newProps} />;
          }}
        </StoreConsumer>
      );
    };
  };
}


// export function replaceProps<InProps extends object, OutProps>(
//   mapProps: (propobj: InProps) => OutProps
// ) {
//   return function withStoreContext<
//     P extends OutProps,
//     R = Omit<P, keyof OutProps>
//   >(
//     inProps: InProps,
//     Component: React.ComponentClass<P> | React.StatelessComponent<P>
//   ): React.SFC<R> {
//     return function BoundComponent(props: R) {
//       return (
//         <StoreConsumer>
//           {value => {
//             let newProps = ({ ...props, ...mapProps(inProps) } as unknown) as P;
//             return <Component {...newProps} />;
//           }}
//         </StoreConsumer>
//       );
//     };
//   };
// }

export function replaceProps<OutProps>(
  addProps: () => OutProps
) {
  return function replacePropsHoc<
    P extends OutProps,
    R = Omit<P, keyof OutProps>
  >(    
    Component: React.ComponentClass<P> | React.StatelessComponent<P>
  ): React.SFC<R> {
    return function BoundComponent(props: R) {
      let newProps = ({ ...props, ...addProps() } as unknown) as P;
      return <Component {...newProps} />;
    };
  };
}




// (
//   Component: React.ComponentClass<P> | React.StatelessComponent<P>
// ): React.SFC<Omit<A, keyof D> & Partial<D>> =>

// export function injectStore<D extends object>(
//   mapStoreToProps: (storeContext: StoreContextInterface) => D
// ): <A extends D>(
//   component: React.ComponentType<A> | React.SFC<A>
// ) => React.SFC<Omit<A, keyof D> & Partial<D>> & IWrappedComponent<A>;

import { inject as mobxInject } from "mobx-react";

type objKey = string | number | symbol;

//type Omit<A extends object, K extends objKey> = Pick<A, Exclude<keyof A, K>>;

// type Argument<D extends object> = (stores: any) => D;

// type Result<D extends object> = <A extends D>(
//   component: React.ComponentType<A>
// ) => React.SFC<Omit<A, keyof D> & Partial<D>>;

// export default function inject<D extends object>(mapper: Argument<D>): Result<D> {
//   return mobxInject.call(null, mapper);
// }

declare module "mobx-react" {
  export function inject<D extends object>(
    mapStoreToProps: (storeContext: StoreContextInterface) => D
  ): <A extends D>(
    component: React.ComponentType<A> | React.SFC<A>
  ) => React.SFC<Omit<A, keyof D> & Partial<D>> & IWrappedComponent<A>;
}
