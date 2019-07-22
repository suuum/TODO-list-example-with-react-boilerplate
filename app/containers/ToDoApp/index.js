/**
 *
 * ToDoApp
 *
 */

import React, { useState, memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import _ from 'lodash';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import Button from 'components/Button';
import { makeSelectToDoApp, makeSelectItemText } from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import Div from './Div';
import Input from './Input';
import {
  addItemToToDoList,
  removeItemFromToDoList,
  changeItemInDoList,
  toggleItemEditMode,
} from './actions';

const ToDoApp = ({
  todoList,
  itemText,
  dispatch,
  onAddItemToToDoList,
  onRemoveItemFromToDoList,
  onToggleItemEditMode,
}) => {
  useInjectReducer({ key: 'toDoApp', reducer });
  useInjectSaga({ key: 'toDoApp', saga });

  const [inputs, setInputs] = useState({ addNodeText: '' });
  const [fields, setFields] = useState(todoList);

  function handleInputDynamicChange(i, event) {
    const values = _.cloneDeep([...fields]);
    values[i].text = event.target.value;
    setFields(values);
  }

  const handleInputChange = event => {
    event.persist();
    setInputs(inputs => ({
      ...inputs,
      [event.target.name]: event.target.value,
    }));
  };

  const isEnabled = inputs.addNodeText.length > 0;
  useEffect(() => {
    console.log('fields', fields);
    setFields(todoList);
  }, [todoList]);

  return (
    <div>
      <Helmet>
        <title>ToDoApp</title>
        <meta name="description" content="Description of ToDoApp" />
      </Helmet>
      <h1>
        <FormattedMessage {...messages.title} />
      </h1>
      <Div>
        <Input
          type="text"
          name="addNodeText"
          value={inputs.addNodeText}
          onChange={handleInputChange}
        />
        {isEnabled ? (
          <button
            type="button"
            value={inputs.addNodeText}
            onClick={onAddItemToToDoList}
          >
            Add item
          </button>
        ) : (
          ''
        )}
      </Div>
      <ul>
        {fields.map((item, listItemId) => (
          <li key={item.id}>
            <Div>
              {!item.isEdit ? (
                <Div>
                  <span>{item.text}</span>
                  <button
                    type="button"
                    value={item.id}
                    onClick={onRemoveItemFromToDoList}
                  >
                    Remove
                  </button>
                  <button
                    type="button"
                    onClick={onToggleItemEditMode.bind(this, item.id, true)}
                  >
                    Update
                  </button>
                </Div>
              ) : (
                <Div>
                  <Input
                    type="text"
                    value={item.text || ''}
                    onChange={e => handleInputDynamicChange(listItemId, e)}
                  />
                  <button
                    type="button"
                    onClick={onToggleItemEditMode.bind(this, item.id, false)}
                  >
                    Save
                  </button>
                </Div>
              )}
            </Div>
          </li>
        ))}
      </ul>
      <span>Show all</span>
      <span>Show done</span>
      <span>Show show in progress</span>
      <Div />
    </div>
  );
};

ToDoApp.propTypes = {
  todoList: PropTypes.array,
  itemText: PropTypes.string,
  dispatch: PropTypes.func.isRequired,
  onAddItemToToDoList: PropTypes.func,
  onRemoveItemFromToDoList: PropTypes.func,
  onToggleItemEditMode: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  todoList: makeSelectToDoApp(),
  itemText: makeSelectItemText(),
});

function mapDispatchToProps(dispatch) {
  return {
    onAddItemToToDoList: evt => {
      dispatch(addItemToToDoList(evt.currentTarget.value));
    },
    onRemoveItemFromToDoList: evt =>
      dispatch(removeItemFromToDoList(evt.currentTarget.value)),
    onChangeItemInToDoList: evt =>
      dispatch(changeItemInDoList(evt.currentTarget.value)),
    onToggleItemEditMode: (id, isEdit) =>
      dispatch(toggleItemEditMode(id, isEdit)),
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(ToDoApp);
