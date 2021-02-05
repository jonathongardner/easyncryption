import { readDataURL, readFile } from './file-functions'
import Nothing from './encryptions/nothing'
import AES from './encryptions/aes'
import RSA from './encryptions/rsa'
import RSA_AES from './encryptions/rsa+aes'

export const encryptions = {
  [Nothing.type]: Nothing,
  [AES.type]: AES,
  [RSA.type]: RSA,
  [RSA_AES.type]: RSA_AES,
}

const download = (filename, uri) => {
  const element = document.createElement('a');
  element.setAttribute('href', uri);
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}
export const textDataURL = (text) => {
  return `data:text/plain;charset=utf-8,${encodeURIComponent(text)}`
}
// returns promise encrypted string
export const encryptFile = async (key, file) => {
  const { encryption: { encrypt } } = key
  const dataURL = await readDataURL(file)
  const encText = await encrypt(key, dataURL)
  const appVersion = process.env.VUE_APP_VERSION
  const encFilename = `${file.name}.enc`
  console.log(appVersion)

  const encDataURL = textDataURL([appVersion, ...encText].join('\n'))
  download(encFilename, encDataURL)

  return { encFilename, encDataURL }
}

export const decryptFile = async (key, file) => {
  const { encryption: { decrypt } } = key
  const [appVersion, ...encText] = await readFile(file).then(text => text.split('\n'))
  console.log(appVersion)
  const dataURL = await decrypt(key, encText)

  const filename = file.name.replace(/.enc$/,"")
  download(filename, dataURL)

  return { filename, dataURL }
}
