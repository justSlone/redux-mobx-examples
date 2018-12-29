import React from "react";
import Link from "../components/Link";
import { observer, inject } from "mobx-react";

const mapStoreToProps = (store, ownProps) => ({
  active: ownProps.filter === store.visibilityFilter,
  onClick: () => store.setVisibilityFilter(ownProps.filter)
});

// This can be replaced by a connect function
export default inject("store")(
  observer(({ store, ...props }) => (
    <Link
      {...mapStoreToProps(store, props)}      
      {...props}
    />
  ))
);
