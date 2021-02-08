import Forge from 'node-forge'

const { pki: { rsa: { generateKeyPair }, publicKeyToPem, publicKeyFromPem, privateKeyToPem, privateKeyFromPem }, util: { encodeUtf8, encode64, decode64 } } = Forge
export default {
  type: 'rsa',
  label: 'RSA',
  // allow type so rsa+aes can be passed
  generateKey({ length = 4096 } = {}) {
    // return promise because it uses workers
    return new Promise((res, rej) => {
      generateKeyPair({bits: length, workers: 2}, (err, { publicKey, privateKey }) => {
        if (err) {
          rej(err)
        } else {
          const encryptionKey = publicKeyToPem(publicKey)

          res({
            private: { decryptionKey: privateKeyToPem(privateKey), encryptionKey },
            public: { encryptionKey },
          })
        }
      });

    })
  },
  encrypt: ({ encryptionKey }, text) => {
    const publicKey = publicKeyFromPem(encryptionKey)

    const input = encodeUtf8(text)
    return Promise.resolve([encode64(publicKey.encrypt(input))])
  },
  decrypt: ({ decryptionKey }, [encText]) => {
    const privateKey = privateKeyFromPem(decryptionKey)
    const input = decode64(encText)

    return Promise.resolve(privateKey.decrypt(input))
  },
  algorithm: 'assymmetric',
}
