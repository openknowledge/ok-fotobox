import s from "styled-components";
import {theme} from "../theme";


export const Container = s.div`
  width: 1280px;
  height: 835px;
  box-sizing: border-box;
  background: ${theme.primaryColor};
  display: flex;
  justify-content: center;
  align-items: flex-start;
  position: absolute;
  flex-direction: column;
  overflow: hidden;
`;

export const Modal = s.div`
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99999;
  background: rgba(0,0,0, 0.40);
  height: 100%;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

export const Control = s.div`
  background: ${props => props.theme.primaryColor};
  width: 100%;
`;


export const CameraIcon = s.button`
  width: 150px;
  height: 150px;
  outline: none;
  border-radius: 50%;
  border: 1px solid ${theme.color};
  background: white;
  color: white;
  background: ${theme.primaryColor};
  font-size: 70px;
  cursor: pointer;
  position: absolute;
  right: 50px;
   user-select: none;
   z-index: 999;
  
  
  &:hover {
    background: white;
    color: ${theme.primaryColor};
  }
`;

export const Icon = s.span`
  color: white;
  background: ${props => props.type === 'YES' ? 'green' : 'red'};;
  width: 150px;
  height: 150px;
  font-size: 30px;
  cursor: pointer;
  border-radius: 50%;
  display: inline-flex;
  justify-content: center;
  align-items: center;  
  &:hover {
    background: ${props => props.type === 'YES' ? 'green' : 'red'};
    color: white;
  }
`;

export const CamContainer = s.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  left: 0;
  
  img {
    position: absolute;
    width: 1540px;
    height: 867px;
  }
  
  video {
    object-fit: scale-down;
    position: absolute;
    width: 1540px;
    height: 867px;
  }
`;

export const ButtonLayout = s.div`
  position: absolute;
  right: 30px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 500px;
`;