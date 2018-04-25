import React from 'react';
import styled from 'styled-components';
import FrameContainer from '../containers/FrameContainer';
import ControlsContainer from '../containers/ControlsContainer';

const Wrapper = styled.div`
  font-family: Verdana, Geneva, sans-serif;
  width: 100vw;
  height: 100vh;
  background-image: radial-gradient(circle, #8ec1ff, #88b4ff, #8ea4ff, #9f91ff, #b679ff);
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;
`;

const Root = () => (
  <Wrapper>
    <FrameContainer />
    <ControlsContainer />
  </Wrapper>
);

export default Root;
