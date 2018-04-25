import React from 'react';
import { connect } from 'react-redux';
import { bindSelectorCreators } from '../utils/reduxUtils';
import Frame from '../components/Frame/Frame';
import * as selectors from '../selectors';

const FrameContainer = (props) => (
  <Frame {...props} />
);

const mapStateToProps = (state) => (
  bindSelectorCreators(selectors, state)
);

export default connect(mapStateToProps, {})(FrameContainer);
