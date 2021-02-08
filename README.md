# EasyNCRYPTION

Putting the e-asy in encryption.

This web app is to help easily encrypt files. All encryption/decryption is done locally
in the browser using [Forge](https://github.com/digitalbazaar/forge).

This app is to help and does not guarantee the encryption of any files do to bugs or
other issues. IT IS UP TO THE USERS TO ENSURE THE FILES ARE ENCRYPTED CORRECTLY AND
MEET THE NECESSARY STANDARDS.

## Symmetric vs Asymmetric keys
Symmetric encryption uses the same key to encrypt and decrypt the data. To share encrypted data the encryption key must be shared and if it is compromised the data is compromised.

Asymmetric encryption uses a pair of keys, public key (used to encrypt the plain text) and private key (used to decrypt the cypher text). This then allows the public key to be shared without compromising the data because it can only be used to encrypt the data, not decrypt it.

Symmetric keys are better for encrypting large data cause they are usually faster. They also might be needed if multiple people need to decrypt the data. Asymmetric is good for smaller data and if encrypted data is being shared with one user.

These two types of keys can be combined. For this a public key would be shared then a symmetric encryption would be used to encrypt the data, then the key for the symmetric encryption would be encrypted using the asymmetric public key. This would allow for larger files to be encrypted and for it to be faster.

## Encryption Types
Symmetric:
  - Advanced Encryption Standard (AES)

Asymmetric:
  - Rivest–Shamir–Adleman (RSA)

Asymmetric + Symmetric:
  - RSA + AES

## Encryption key format
### Private keys (`.enk`)
```json
{
  "identifier": "My secret missions key",
  "type": "encryption type",
  "encryptionKey": "abc...",
  "decryptionKey": "def..."
}
```
  - `identifier` - A name to help user identify the key
  - `type` - The encryption type. Supported types are `aes`, `rsa`, `rsa+aes` (recommended)
  - `encryptionKey` - The encryption key.
  - `decryptionKey` - The decryption key.

### Public keys (`.enk.pub`)
```json
{
  "identifier": "My secret missions key",
  "type": "encryption type",
  "encryptionKey": "abc..."
}
```
  - `identifier` - A name to help user identify the key
  - `type` - The encryption type. Supported types are `aes`, `rsa`, `rsa+aes` (recommended)
  - `encryptionKey` - The encryption key.

### Encrypted files (`.enc`)
  - First line version of app used to encrypt
  - Other lines encryption type specific data (i.e. the rsa encrypted aes key)
  - Last line the encrypted dataURL

## Development
Helpful commands:
```sh
npm install # setup
npm run serve # Compiles and hot-reloads for development
npm run build # Compiles and minifies for production
npm run lint # Lints and fixes files
```

### TODO
