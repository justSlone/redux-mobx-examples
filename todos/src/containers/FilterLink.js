import React from "react";
import Link from "../components/Link";
import { observer, inject } from "mobx-react";

const mapStateToProps = (state, ownProps) => {
  console.log(state.visibilityFilter);
  return {
    active: ownProps.filter === state.visibilityFilter
  };
};

const mapActionsToProps = (actions, ownProps) => ({
  onClick: () => actions.setVisibilityFilter(ownProps.filter)
});

export default inject("store")(
  observer(({ store, ...props }) => (
    <Link
      {...mapStateToProps(store.state, props)}
      {...mapActionsToProps(store.actions, props)}
      {...props}
    />
  ))
);
