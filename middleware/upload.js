// const multer = require('multer')
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "Images");
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + file.originalname);
//   },
// });

// const upload = multer({
//   storage: storage,
//   limits: { fileSize: "1000000" },
//   fileFilter: (req, file, cb) => {
//     const fileTypes = /jpeg|jpg|png|pdf/;
//     const mimeType = fileTypes.test(file.mimetype);
//     const extname = fileTypes.test(path.extname(file.originalname));

//     if (mimeType && extname) {
//       return cb(null, true);
//     }
//     cb("Give proper files formate to upload");
//   },
// });

// const uploadMultiple = upload.fields([{name:'PONo_doc'}, {name:'GST_doc'}, {name:'MSME_doc'}, {name:'SEZ_doc'}])

// module.exports = {
//     upload
// }
