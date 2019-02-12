//  @flow

import React from 'react';
import type {SystemStatus} from "../../usecases/checkSystems";
import {checkSystems} from "../../usecases/checkSystems";
import {getSettings, saveSettings} from "../../core/SettingsRepository";


class Installer extends React.Component<any, SystemStatus> {

  state = {
    printer: null,
    backup: null,
    backupIp: "",
    druckerIp: "",
    pristine: true
  }

  checkState = async () => {
    const status = await checkSystems();
    console.log(status);
    this.setState({
      printer: status.printer,
      backup: status.backup
    })
  }

  updateDruckerIp = e => this.setState({ druckerIp: e.target.value, pristine: false})
  updateBackupIp = e => this.setState({ backupIp: e.target.value, pristine: false})
  save = async (e) => {
    saveSettings({
      printerBase: this.state.druckerIp,
      backupBase: this.state.backupIp,
    })
    this.setState({pristine: true})
    await this.checkState();
  }

  componentDidMount = this.checkState

  render = () => <div>
    <h2>Status</h2>

    <div>
      <label>Drucker IP: (ohne HTTPS://)</label>
      <input type={"text"} placeholder={getSettings().printerBase} value={this.state.druckerIp} onChange={this.updateDruckerIp}/>
    </div>
    <div>
      <label>Backup System (ohne HTTPS://)</label>
      <input type={"text"} placeholder={getSettings().backupBase} value={this.state.backupIp} onChange={this.updateBackupIp} />
    </div>
    {this.state.pristine || <button onClick={this.save}>Jetzt speichern</button>}
    <div>Drucker System(IP: {getSettings().backupBase}): <span>{ this.state.printer ? <span>OK</span> : <span>NOT OK</span> || null }</span></div>
    <div>Backup System(IP: {getSettings().printerBase}): <span>{ this.state.backup ? <span>OK</span> : <span>NOT OK</span>|| null }</span></div>
  </div>
}

export { Installer }