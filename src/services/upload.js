import mime from 'mime-types'
import { storage } from 'firebase'

export const uploadImage = async (file) => {
  const type = mime.lookup(file.name)

  const storageRef = storage().ref()
  const imagesRef = storageRef.child(`images/${Date.now()}.${mime.extensions[type][0]}`)

  await imagesRef.put(file)

  return imagesRef.getDownloadURL()
}
