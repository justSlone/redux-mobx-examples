import React from "react";
import Count from "../components/Count";
import { observer, inject } from "mobx-react";
import {Store} from '../stores'

const mapStoreToProps = (store: Store) => ({
  count: store.completedTodosCount
});

// This can be replaced by a connect function
export default inject("store")(
  observer(({ store, ...props }) => (
    <Count {...mapStoreToProps(store)} {...props} />
  ))
);
