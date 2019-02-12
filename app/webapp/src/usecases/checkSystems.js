// @flow
import {getSettings} from "../core/SettingsRepository";

export type SystemStatus = { printer: boolean; backup: printer };
export const checkSystems = async (): Promise<SystemStatus> => {
  const printer = await fetch('https://' + getSettings().printerBase).then(() => true).catch(() => false);
  const backup = await fetch('https://' + getSettings().backupBase).then(() => true).catch(() => false);
  return {
    printer, backup
  }
};

