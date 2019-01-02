import React from 'react'
import FilterLink from '../containers/FilterLink'
import CompletedCount from '../containers/CompletedCount'
import { VisibilityFilters } from '../stores/FilterStore'

const Footer = () => (
  <React.Fragment>
  <div>
    <span>Show: </span>
    <FilterLink filter={VisibilityFilters.SHOW_ALL}>
      All
    </FilterLink>
    <FilterLink filter={VisibilityFilters.SHOW_ACTIVE}>
      Active
    </FilterLink>
    <FilterLink filter={VisibilityFilters.SHOW_COMPLETED}>
      Completed
    </FilterLink>
  </div>
  <div>
    <span>Completed: </span><CompletedCount/>
  </div>
  </React.Fragment>
)

export default Footer
