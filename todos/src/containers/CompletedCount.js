import React from "react";
import Count from "../components/Count";
import { observer, inject } from "mobx-react";

const mapStateToProps = state => ({
  count: state.completedTodosCount
});

// This can be replaced by a connect function
export default inject("store")(
  observer(({ store, ...props }) => (
    <Count {...mapStateToProps(store.state)} {...props} />
  ))
);
