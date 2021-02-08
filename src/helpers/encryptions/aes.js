import Forge from 'node-forge'
const { util: { encode64, decode64, createBuffer }, random: { getBytesSync }, cipher: { createCipher, createDecipher } } = Forge

export default {
  type: 'aes',
  label: 'AES',
  generateKey ({ length = 32 } = {}) {
    // return promise so in future can maybe use webworkers to do async?
    // also rsa already uses async webworkers so...
    const key = { key: encode64(getBytesSync(length)), iv: encode64(getBytesSync(length)) }
    return Promise.resolve({ private: { encryptionKey: key, decryptionKey: key } })
  },
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
    return Promise.resolve([encode64(cipher.output.getBytes())])
  },
  decrypt: ({ decryptionKey }, [encText]) => {
    const key = decode64(decryptionKey.key)
    const iv = decode64(decryptionKey.iv)
    const { mode = 'AES-CBC' } = decryptionKey
    // return AES.decrypt(encText, decryptionKey).toString(Latin1)
    const input = createBuffer(decode64(encText))
    const decipher = createDecipher(mode, key)
    decipher.start({ iv: iv })
    decipher.update(input)
    decipher.finish()
    return Promise.resolve(decipher.output.toString('utf8'))
  },
  algorithm: 'symmetric',
}
