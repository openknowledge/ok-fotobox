
export type Settings = { printerBase: string, backupBase: string };
export const saveSettings = (settings: Settings) => {
  localStorage.setItem('settings', JSON.stringify(settings));
}

export const getSettings = (): Settings => {
  const settings = JSON.parse(localStorage.getItem('settings')) || {};
  if(!settings.printerBase) {
    settings.printerBase = "192.168.1.2:3000"
  }
  if(!settings.backupBase) {
    settings.backupBase = "192.168.1.2:5000"
  }
  return settings;
}
