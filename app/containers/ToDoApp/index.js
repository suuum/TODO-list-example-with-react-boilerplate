/**
 *
 * ToDoApp
 *
 */

import React, { useState, memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import Button from 'components/Button';
import { makeSelectToDoApp, makeSelectItemText } from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import Div from './Div';
import Input from './Input';
import { addItemToToDoList } from './actions';

export function ToDoApp({ todoList, dispatch }) {
  useInjectReducer({ key: 'toDoApp', reducer });
  useInjectSaga({ key: 'toDoApp', saga });

  const [getItemValue, setItemValue] = useState('Hello Function Component!');
  const handleChange = event => setItemValue(event.target.value);
  const isEnabled = getItemValue.length > 0;

  console.log('isEnabled', isEnabled);

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
        <Input type="text" value={getItemValue} onChange={handleChange} />
        {isEnabled ? (
          <Button
            onClick={() => {
              dispatch(
                addItemToToDoList({ id: todoList.length, text: getItemValue }),
              );
              setItemValue('');
            }}
            disabled={isEnabled}
          >
            {' '}
            Add item
          </Button>
        ) : (
          <span>Elo</span>
        )}
      </Div>
      <ul>
        {todoList.map(item => (
          <li key={item.id}>
            <Div>
              <span>{item.text}</span>
              <Button>Remove</Button>
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
}

ToDoApp.propTypes = {
  todoList: PropTypes.array,
  itemText: PropTypes.string,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  todoList: makeSelectToDoApp(),
  itemText: makeSelectItemText(),
});

const withConnect = connect(mapStateToProps);

export default compose(
  withConnect,
  memo,
)(ToDoApp);
