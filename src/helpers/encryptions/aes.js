// import AES from 'crypto-js/aes'
// import Latin1 from 'crypto-js/enc-latin1'
import Forge from 'node-forge'
import { objectToDataURL } from '../file-functions'
const type = 'aes'
const { util: { encode64, decode64, createBuffer }, random: { getBytesSync }, cipher: { createCipher, createDecipher } } = Forge

export const genKey = (length) => {
  // console.log(Forge.util.encode64(key.key))
  // console.log(Forge.util.encode64(key.iv))
  return { key: encode64(getBytesSync(length)), iv: encode64(getBytesSync(length)) }
}
export default {
  type,
  label: 'AES',
  generateKey (identifier, { length = 32 } = {}) {
    // return promise so in future can maybe use webworkers to do async?
    // also rsa already uses async webworkers so
    const key = genKey(length)
    const json = { identifier, type: this.type, encryptionKey: key, decryptionKey: key }
    return Promise.resolve([
      { filename: `${identifier}.enk`, dataURL: objectToDataURL(json), name: 'Private Key' }
    ])
  },
  generateDataKey: (key) => Promise.resolve(key),
  encrypt: ({ encryptionKey }, text) => {
    const key = decode64(encryptionKey.key)
    const iv = decode64(encryptionKey.iv)
    const { mode = 'AES-CBC' } = encryptionKey
    // return AES.encrypt(text, encryptionKey).toString()
    const input = createBuffer(text, 'utf8')
    const cipher = createCipher(mode, key)
    cipher.start({ iv: iv })
    cipher.update(input)
    cipher.finish()
    return encode64(cipher.output.getBytes())
  },
  decrypt: ({ decryptionKey }, encText) => {
    const key = decode64(decryptionKey.key)
    const iv = decode64(decryptionKey.iv)
    const { mode = 'AES-CBC' } = decryptionKey
    // return AES.decrypt(encText, decryptionKey).toString(Latin1)
    const input = createBuffer(decode64(encText))
    const decipher = createDecipher(mode, key)
    decipher.start({ iv: iv })
    decipher.update(input)
    decipher.finish()
    return decipher.output.toString('utf8')
  },
  algorithm: 'symmetric',
}
