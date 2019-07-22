/*
 *
 * ToDoApp actions
 *
 */

import {
  DEFAULT_ACTION,
  ADD_ITEM_TO_TODOLIST,
  REMOVE_ITEM_FROM_TODOLIST,
  CHANGE_TODOLIST_ITEM,
  TOGGLE_ITEM_EDIT_MODE,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function addItemToToDoList(itemText) {
  return {
    type: ADD_ITEM_TO_TODOLIST,
    itemText,
  };
}

export function removeItemFromToDoList(itemId) {
  return {
    type: REMOVE_ITEM_FROM_TODOLIST,
    itemId,
  };
}

export function changeItemInDoList(item) {
  return {
    type: CHANGE_TODOLIST_ITEM,
    item,
  };
}

export function toggleItemEditMode(id, isEdit) {
  return {
    type: TOGGLE_ITEM_EDIT_MODE,
    id,
    isEdit,
  };
}
