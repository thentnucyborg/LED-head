import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { drawBox, drawDome } from './Draw';

const Wrapper = styled.div`
  
`;

class Frame extends Component {
  constructor() {
    super();
    this.ctx = null;
    this.canvasElement = null;
  }

  componentDidUpdate() {
    this.draw();
  }

  draw() {
    if (this.canvasElement) {
      const context = this.canvasElement.getContext('2d');
      if (this.props.mode === 'CYBORGHEAD') {
        context.clearRect(0, 0, 500, 500);
        drawDome({ ctx: context, grid: this.props.grid });
      } else {
        context.clearRect(0, 0, 500, 500);
        drawBox({ ctx: context, grid: this.props.grid });
      }
    }
  }

  render() {
    return (
      <Wrapper>
        <canvas
          ref={(element) => this.canvasElement = element}
          width='500px'
          height='500px'/>
      </Wrapper>
    );
  }
}
Frame.propTypes = {
  mode: PropTypes.string.isRequired,
  grid: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)).isRequired,
};

export default Frame;


