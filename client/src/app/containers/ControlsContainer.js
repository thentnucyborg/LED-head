import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { bindSelectorCreators } from '../utils/reduxUtils';
import Controls from '../components/Controls';
import * as actions from '../actions';
import * as selectors from '../selectors';

const ControlsContainer = (props) => (
  <Controls {...props} />
);

const mapDispatchToProps = (dispatch) => (
  bindActionCreators(actions, dispatch)
);

const mapStateToProps = (state) => (
  bindSelectorCreators(selectors, state)
);

export default connect(mapStateToProps, mapDispatchToProps)(ControlsContainer);
