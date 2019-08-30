/*
 *
 * ToDoApp reducer
 *
 */
import produce from 'immer';
import {
  ADD_ITEM_TO_TODOLIST,
  REMOVE_ITEM_FROM_TODOLIST,
  CHANGE_TODOLIST_ITEM,
  TOGGLE_ITEM_EDIT_MODE,
} from './constants';

export const initialState = {
  todoList: [],
  itemText: '',
};

/* eslint-disable default-case, no-param-reassign */
const toDoAppReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case ADD_ITEM_TO_TODOLIST: {
        let index = 1;
        if (draft.todoList.length > 0) {
          index =
            draft.todoList.reduce(
              (max, character) => (character.id > max ? character.id : max),
              draft.todoList[0].id,
            ) + 1;
        }

        draft.todoList.push({ id: index, text: action.itemText });
        break;
      }
      case REMOVE_ITEM_FROM_TODOLIST:
        draft.todoList.splice(
          draft.todoList.findIndex(el => el.id === +action.itemId),
          1,
        );
        break;
      case CHANGE_TODOLIST_ITEM:
        draft.todoList = draft.todoList.map(el => {
          if (el.id === +action.item.id)
            return { ...action.item, isEdit: action.isEdit };

          return el;
        });

        break;
      case TOGGLE_ITEM_EDIT_MODE:
        draft.todoList.map(el => {
          if (el.isEdit === true) {
            el.isEdit = false;
          }

          return el;
        });

        draft.todoList.map(el => {
          if (el.id === action.id) {
            el.isEdit = action.isEdit;
          }

          return el;
        });
        break;
    }
  });

export default toDoAppReducer;
