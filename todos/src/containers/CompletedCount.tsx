import React from "react";
import Count from "../components/Count";
import { observer, inject } from "mobx-react";
import { StoreView } from '../stores'

const mapViewToProps = (view: StoreView) => ({
  count: view.completedTodosCount
});

// This can be replaced by a connect function
export default inject("store")(
  observer(({ store, ...props }) => (
    <Count {...mapViewToProps(store.view)} {...props} />
  ))
);
