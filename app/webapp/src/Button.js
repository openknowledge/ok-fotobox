import s from 'styled-components'
import {theme} from './theme'

export const Button = s.button`
  min-width: 100px;
  height: 100px;
  padding: 15px;
  border-radius: 50%;
  font-size: 30px;
  border: 1px solid ${theme.primaryColor};
  color: ${theme.primaryColor};
  
  display: flex;
  outline: none;
  background: white;
  align-items: center;
  justify-content: center;
  
  cursor: pointer;
  outline: none;
  
  &:focus,
  &:active {
    outline: none;
  }
  
  &:hover {
    background: ${theme.primaryColor};
    font-size: 30px;
    color: white;
  }
  
`;