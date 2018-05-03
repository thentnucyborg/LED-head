import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;
`;

const Group = styled.div`
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  justify-content: center;
  margin: 0.5rem;
`;

const Button = styled.button`
  margin: 0.3rem;
  padding: 0.35
  rem;
  width: 100px;
  color: azure;
  font-size: 1rem;
  border-radius: 5px;
  ${({ color }) => `
    border: 2px solid ${color};
    background: ${color};
  `}
  opacity: 0.8;
  &:focus {
    outline: 0;
  }
  &:hover {
    opacity: 1;
  }
`;

const Controls = ({ setMode, startShow, stopShow, setShow, isRunning, showIndex }) => (
  <Wrapper>
    <Group>
      <Button color={'Blue'} onClick={() => setMode('LEDCUBE')}> Box </Button>
      <Button color={'Blue'} onClick={() => setMode('CYBORGHEAD')}> Dome </Button>
    </Group>
    <Group>
      <Button color={'MediumBlue'} onClick={startShow}> Start </Button>
      <Button color={'MediumBlue'} onClick={stopShow}> Stop </Button>
    </Group>
    <Group>
      <Button color={'MidnightBlue'} onClick={() => setShow(1)}> Nothing </Button>
      <Button color={'MidnightBlue'} onClick={() => setShow(2)}> Emo </Button>
      <Button color={'MidnightBlue'} onClick={() => setShow(3)}> Random </Button>
      <Button color={'MidnightBlue'} onClick={() => setShow(4)}> 4 </Button>
      <Button color={'MidnightBlue'} onClick={() => setShow(5)}> 5 </Button>
      <Button color={'MidnightBlue'} onClick={() => setShow(6)}> 6 </Button>
      <Button color={'MidnightBlue'} onClick={() => setShow(7)}> Brain </Button>
      <Button color={'MidnightBlue'} onClick={() => setShow(8)}> 8 </Button>
    </Group>
  </Wrapper>
);

Controls.propTypes = {
  setMode: PropTypes.func.isRequired,
  startShow: PropTypes.func.isRequired,
  stopShow: PropTypes.func.isRequired,
  setShow: PropTypes.func.isRequired,
  isRunning: PropTypes.bool.isRequired,
  showIndex: PropTypes.number.isRequired,
};

export default Controls;
