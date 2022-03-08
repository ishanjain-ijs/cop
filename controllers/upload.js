const multer = require('multer')
const path = require('path')
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'Images')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now()+file.originalname)
    }
  })
  
  const upload = multer({
    storage: storage,
    limits: { fileSize: '1000000' },
    fileFilter: (req, file, cb) => {
        const fileTypes = /jpg|png|JPG|PNG|JPEG|jpeg|pdf|PDF/
        const mimeType = fileTypes.test(file.mimetype)  
        const extname = fileTypes.test(path.extname(file.originalname))
  
        if(mimeType && extname) {
            return cb(null, true)
        }
        cb('Give proper files formate to upload')
    }
  })
  const uploadMultiple = upload.fields([
        { name: "PONo", maxCount: 1 },
        { name: "GST", maxCount: 1 },
        { name: "MSME", maxCount: 1 },
        { name: "SEZ", maxCount: 1 }
      ])


module.exports = uploadMultiple