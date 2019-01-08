export enum VisibilityFilters {
    SHOW_ALL,
    SHOW_COMPLETED,
    SHOW_ACTIVE,
  }
  
  export interface FilterState {
    visibilityFilter: VisibilityFilters
  }
  
  export const initialFilterState: FilterState = {
    visibilityFilter: VisibilityFilters.SHOW_ALL
  }
  