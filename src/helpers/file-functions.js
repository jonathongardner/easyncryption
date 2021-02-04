import { encryptions } from '@/helpers/encryptions'

export const readDataURL = (file) => {
  return new Promise((resolve) => {
    const fileReader = new FileReader();
    fileReader.onload = (event) => {
      resolve(event.target.result, file)
    }
    fileReader.readAsDataURL(file);
  })
}
export const readFile = (file) => {
  return new Promise((resolve) => {
    const fileReader = new FileReader();
    fileReader.onload = (event) => {
      resolve(event.target.result, file)
    }
    fileReader.readAsText(file);
  })
}

function validJSON (text) {
  try {
    const o = JSON.parse(text)

    // Handle non-exception-throwing cases:
    // Neither JSON.parse(false) or JSON.parse(1234) throw errors, hence the type-checking,
    // but... JSON.parse(null) returns null, and typeof null === "object",
    // so we must check for that, too. Thankfully, null is falsey, so this suffices:
    if (o && typeof o === "object") {
        return o
    }
  }
  catch (e) {
    // console.log(e)
  }

  return null
}

export const parseEnkFile = async (file, extensions, jsonKeys) => {
  // if one doesnt end with extenstion throw error
  if (extensions.every(ext => !file.name.endsWith(ext))) {
    throw { message: 'Invalid file.' }
  }

  const json = await readFile(file).then(validJSON)
  if (!json) { // Invalid json if null
    throw { message: 'Invalid file format.' }
  }

  if (jsonKeys.some(k => !Object.prototype.hasOwnProperty.call(json, k))) {
    throw { message: 'Invalid keys' }
  }

  json.filename = file.name
  json.encryption = encryptions[json.type]
  if (!json.encryption) {
    throw { message: 'Invalid encryption type' }
  }
  return json
}
