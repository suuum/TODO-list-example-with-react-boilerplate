import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the exampleToDelete state domain
 */

const selectExampleToDeleteDomain = state =>
  state.exampleToDelete || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by ExampleToDelete
 */

const makeSelectExampleToDelete = () =>
  createSelector(
    selectExampleToDeleteDomain,
    substate => substate,
  );

export default makeSelectExampleToDelete;
export { selectExampleToDeleteDomain };
