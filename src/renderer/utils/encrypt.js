import { JSEncrypt } from 'jsencrypt' // https://github.com/travist/jsencrypt

export function encryptData(data, publicKey) {
  const encryptor = new JSEncrypt()
  encryptor.setPublicKey(publicKey)
  return encryptor.encrypt(data)
}

