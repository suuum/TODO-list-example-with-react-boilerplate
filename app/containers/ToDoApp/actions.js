/*
 *
 * ToDoApp actions
 *
 */

import { DEFAULT_ACTION, ADD_ITEM_TO_TODOLIST } from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function addItemToToDoList(item) {
  return {
    type: ADD_ITEM_TO_TODOLIST,
    item,
  };
}
