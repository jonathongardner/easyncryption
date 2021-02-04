import RSA from './rsa'
import AES, { genKey } from './aes'
const type = 'rsa+aes'

const mod = {
  type,
  label: 'RSA+AES',
  generateDataKey(key, { length = 32 } = {}) {
    const dataKey = genKey(length)
    return Promise.resolve({
      type: AES.type, identifier: 'file key', encryptionKey: dataKey, decryptionKey: dataKey
    })
  },
  encrypt: RSA.encrypt,
  decrypt: RSA.decrypt,
  algorithm: RSA.algorithm,
}
mod.generateKey = RSA.generateKey.bind(mod)

export default mod
