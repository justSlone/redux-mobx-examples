import React from "react";
import Link from "../components/Link";
import { observer, inject } from "mobx-react";
import { StoreView, StoreActions } from "../stores";

const mapViewToProps = (view: StoreView, ownProps: any) => ({
  active: ownProps.filter === view.visibilityFilter
});

const mapActionsToProps = (actions: StoreActions, ownProps: any) => ({
  onClick: () => actions.setVisibilityFilter(ownProps.filter)
});

// This can be replaced by a connect function
export default inject("store")(
  observer(({ store, ...props }) => (
    <Link
      {...mapViewToProps(store.view, props)}
      {...mapActionsToProps(store.actions, props)}
      {...props}
    />
  ))
);
