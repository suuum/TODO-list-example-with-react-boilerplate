/*
 *
 * ToDoApp reducer
 *
 */
import produce from 'immer';
import { ADD_ITEM_TO_TODOLIST } from './constants';

export const initialState = {
  todoList: [],
  itemText: '',
};

/* eslint-disable default-case, no-param-reassign */
const toDoAppReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case ADD_ITEM_TO_TODOLIST:
        draft.todoList.push(action.item);
        console.log('draft.todoList', draft.todoList);
        break;
    }
  });

export default toDoAppReducer;

// {
//   id:0,
//   text: 'Test',
//   completed: false
// }
