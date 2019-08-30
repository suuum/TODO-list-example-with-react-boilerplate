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
import DivSpaceBetween from './DivSpaceBetween';

const ToDoApp = ({
  todoList,
  onAddItemToToDoList,
  onRemoveItemFromToDoList,
  onToggleItemEditMode,
  onChangeItemInToDoList,
}) => {
  useInjectReducer({ key: 'toDoApp', reducer });
  useInjectSaga({ key: 'toDoApp', saga });

  const [inputs, setInputs] = useState({ addNodeText: '' });
  const [fields, setFields] = useState(todoList);
  const isHidden = inputs.addNodeText.length === 0;

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

  useEffect(() => {
    setFields(todoList);
  }, [todoList]);

  const applyFilter = showDone => {
    console.log('todoList', typeof todoList, showDone);
    if (showDone) {
      setFields(todoList.filter(x => x.isDone));
    } else if (!showDone) {
      setFields(todoList.filter(x => !x.isDone));
    } else {
      setFields(todoList);
    }
  };

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
        {!isHidden ? (
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
                <DivSpaceBetween>
                  <Div>
                    <input type="checkbox" />
                    <span>{item.text}</span>
                  </Div>

                  <Div>
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
                </DivSpaceBetween>
              ) : (
                <DivSpaceBetween>
                  <Input
                    type="text"
                    value={item.text || ''}
                    onChange={e => handleInputDynamicChange(listItemId, e)}
                  />
                  <button
                    type="button"
                    onClick={onChangeItemInToDoList.bind(this, {
                      item,
                      isEdit: false,
                    })}
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    onClick={onToggleItemEditMode.bind(this, item.id, false)}
                  >
                    Cancel
                  </button>
                </DivSpaceBetween>
              )}
            </Div>
          </li>
        ))}
      </ul>
      <Div>
        <button type="button" onClick={applyFilter.bind(this, null)}>
          Show all
        </button>
      </Div>
      <Div>
        <button type="button" onClick={applyFilter.bind(this, false)}>
          Show show in progress
        </button>
      </Div>
      <Div>
        <button type="button" onClick={applyFilter.bind(this, true)}>
          Show done
        </button>
      </Div>
      <Div />
    </div>
  );
};

ToDoApp.propTypes = {
  todoList: PropTypes.array,
  onAddItemToToDoList: PropTypes.func,
  onRemoveItemFromToDoList: PropTypes.func,
  onToggleItemEditMode: PropTypes.func,
  onChangeItemInToDoList: PropTypes.func,
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
    onChangeItemInToDoList: updateObject => {
      dispatch(changeItemInDoList(updateObject.item, updateObject.isEdit));
    },
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
