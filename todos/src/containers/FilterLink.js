import React from "react";
import Link from "../components/Link";
import { observer, inject } from "mobx-react";

const mapStoreToProps = (store, ownProps) => ({
  active: ownProps.filter === store.state.visibilityFilter,
  onClick: () => store.setVisibilityFilter(ownProps.filter)
});

export default inject("optionsStore")(
  observer(({ optionsStore, ...props }) => (
    <Link {...mapStoreToProps(optionsStore, props)} {...props} />
  ))
);
