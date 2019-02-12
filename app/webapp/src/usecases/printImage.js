import {getSettings} from "../core/SettingsRepository";


export const printImage = async (imageUrl: string) => {
  console.log("Printing image to ", getSettings().printerBase)
  return await fetch('https://' + getSettings().printerBase + '/print', {
    method: 'POST',
    body: imageUrl
  })
}