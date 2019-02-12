import React from 'react';
import styled from 'styled-components';

type Props = {
   active: boolean;
   onClick: Function
}

export const FrameButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  width: 150px;
  position: absolute;
  z-index: 999;
  left: 0;
  top: 30px;
`;
export const FrameButton = (props: Props) => <Wrapper active={props.active} onClick={props.onClick}>
  <FrameImage src={props.frameUrl} />
</Wrapper>

const Wrapper = styled.div`
    width: 200px;
    height: 100px;
    padding: 15px;
    border: 2px solid ${props => props.active ? 'blue' : 'grey'};
    cursor: pointer;
    
    &:hover {
      background: #cce5ff;
    }
`;

const FrameImage = styled.img`
  width: 100%;
  height: 100%;
`;