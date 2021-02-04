import Forge from 'node-forge'
import { objectToDataURL } from '../file-functions'
const type = 'rsa'

export default {
  type,
  label: 'RSA',
  // allow type so rsa+aes can be passed
  generateKey(identifier, { length = 4096 } = {}) {
    // return promise so in future can maybe use webworkers to do async?
    // also rsa already uses async webworkers so
    return new Promise((res, rej) => {
      const pki = Forge.pki;
      pki.rsa.generateKeyPair({bits: length, workers: 2}, (err, { publicKey, privateKey }) => {
        if (err) {
          rej(err)
        } else {
          const pub = {
            identifier, type: this.type, encryptionKey: pki.publicKeyToPem(publicKey)
          }

          res([
            { filename: `${identifier}.enk`, dataURL: objectToDataURL({ ...pub, decryptionKey: pki.privateKeyToPem(privateKey) }), name: 'Public Key' },
            { filename: `${identifier}.enk.pub`, dataURL: objectToDataURL(pub), name: 'Private Key' },
          ])
        }
      });

    })
  },
  generateDataKey: (key) => Promise.resolve(key),
  encrypt: ({ encryptionKey }, text) => {
    const publicKey = Forge.pki.publicKeyFromPem(encryptionKey)

    const input = Forge.util.encodeUtf8(text)
    return Forge.util.encode64(publicKey.encrypt(input))
  },
  decrypt: ({ decryptionKey }, encText) => {
    const privateKey = Forge.pki.privateKeyFromPem(decryptionKey)
    const input = Forge.util.decode64(encText)

    return privateKey.decrypt(input)
  },
  algorithm: 'assymmetric',
}
