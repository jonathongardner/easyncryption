export default {
  type: 'nothing',
  ignore: true,
  label: 'No',
  warn: () => 'No encryption method selected. Are you sure you want to continue?',
  generateKey(identifier) {
    return Promise.resolve({
      filename: `${identifier}.enk`, toSave: { encryptionKey: '', decryptionKey: '' }
    })
  },
  encrypt: (key, dataUrl) => Promise.resolve([dataUrl]),
  decrypt: (key, dataUrl) => Promise.resolve(dataUrl[0]),
  algorithm: 'none',
}
