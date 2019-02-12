import React from 'react';
import {Dialog, DialogContent, DialogTitlebar} from "./PrintDialog";
import {Modal} from "../Ui";

class PrintingDialog extends React.Component {

  render = () => <Modal>
    <Dialog>
      <DialogTitlebar>Druck erfolgreich</DialogTitlebar>
      <DialogContent>
        {this.props.error ? <h2>{this.props.error}</h2> : <div>
          Bitte waren Sie, während das Bild gedruckt wird.
          Dieser Dialog verschwindet automatisch, sobald das System bereit ist.
        </div>}
      </DialogContent>
    </Dialog>
  </Modal>
}

export {PrintingDialog}