import RSA from './rsa'
import AES from './aes'

export default {
  type: 'rsa+aes',
  label: 'RSA+AES',
  generateKey: RSA.generateKey,
  encrypt: async ({ encryptionKey: rsaKey }, text) => {
    const { private: { encryptionKey: aesKey } } = await AES.generateKey()
    const aesKeyToEnc = JSON.stringify(aesKey)

    const toReturn = await Promise.all(
      [RSA.encrypt({ encryptionKey: rsaKey }, aesKeyToEnc), AES.encrypt({ encryptionKey: aesKey }, text)]
    ).then(promises => promises.flat())

    return toReturn
  },
  decrypt: async ({ decryptionKey: rsaKey }, [encAesKey, encText]) => {
    const stringAesKey = await RSA.decrypt({ decryptionKey: rsaKey }, [encAesKey])
    const aesKey = JSON.parse(stringAesKey)

    return await AES.decrypt({ decryptionKey: aesKey }, [encText])
  },
  algorithm: RSA.algorithm,
}
