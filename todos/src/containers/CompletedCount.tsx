import React from "react";
import Count from "../components/Count";
import { observer, inject } from "mobx-react";

const mapStoreToProps = store => ({
  count: store.completedTodosCount
});

// This can be replaced by a connect function
export default inject("store")(
  observer(({ store, ...props }) => (
    <Count {...mapStoreToProps(store)} {...props} />
  ))
);
