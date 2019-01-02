import React from "react";
import Link from "../components/Link";
import { observer, inject } from "mobx-react";
import {Store} from '../stores'

const mapStoreToProps = (store:Store, ownProps: any) => ({
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
