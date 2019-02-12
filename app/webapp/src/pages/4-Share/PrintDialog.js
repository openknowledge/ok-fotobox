import React from 'react';
import styled from 'styled-components';
import {Modal} from "../Ui";
import {theme} from "../../theme";

export class PrintDialog extends React.Component {
  render = () => <Modal>
    <Dialog>
      <DialogTitlebar>
        <span>Wie viele Bilder möchtest du drucken?</span>
        <span className={"icon_close"} style={{width: "auto", height: "100%"}} onClick={this.props.close}/>
      </DialogTitlebar>
      <DialogContent>
        {[1, 2, 3, 4, 5].map(elem => <NumpadNumber onClick={this.props.print(elem)}>{elem}</NumpadNumber>)}
      </DialogContent>
    </Dialog>
  </Modal>
}

export const Dialog = styled.div`
  display: flex;
  flex-direction: column;
`

export const DialogTitlebar = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  padding: 15px;
  font-size: 30px;
  font-weight: 500;
  background: #82146e;
  box-sizing: border-box;
  color: white;
  justify-content: space-between;
`;
export const DialogContent = styled.div`
  display: flex;
  flex-direction: row;
  height: 150px;
  width: 750px;
  background: white;
  padding: 15px;
`

const NumpadNumber = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 50px;
  box-sizing: border-box;
  padding: 20px;
  min-width: 150px;
  height: 150px;
  border: 1px solid grey;
  cursor: pointer;
  
  :hover {
    background: ${theme.primaryColor};
    color: white;
  }
`;