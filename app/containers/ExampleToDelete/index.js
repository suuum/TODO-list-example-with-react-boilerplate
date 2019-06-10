/**
 *
 * ExampleToDelete
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectExampleToDelete from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

export function ExampleToDelete() {
  useInjectReducer({ key: 'exampleToDelete', reducer });
  useInjectSaga({ key: 'exampleToDelete', saga });

  return (
    <div>
      <Helmet>
        <title>ExampleToDelete</title>
        <meta name="description" content="Description of ExampleToDelete" />
      </Helmet>
      <FormattedMessage {...messages.header} />
    </div>
  );
}

ExampleToDelete.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  exampleToDelete: makeSelectExampleToDelete(),
});

function mapDispatchToProps(dispatch) {
  return {
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
)(ExampleToDelete);
