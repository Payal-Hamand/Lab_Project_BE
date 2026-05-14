import multer from 'multer'

import {
  CloudinaryStorage
} from 'multer-storage-cloudinary'

import cloudinary from '../config/cloudinary.js'

const storage =
  new CloudinaryStorage({

    cloudinary,

    params: {

      folder: 'lab-reports',

      resource_type: 'raw',

      allowed_formats: [
        'pdf',
        'jpg',
        'jpeg',
        'png'
      ]

    }

  })
  console.log(storage)

const upload = multer({
  storage
})

export default upload