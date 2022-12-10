import path from 'path'
import express from 'express'
import multer from 'multer'
const router = express.Router();
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, path.join(__dirname, '/uploads/'))
  },
  filename(req, file, cb) {
    cb(
      null,
      new Date().toISOString().replace(/:/g, '-') + file.originalname
    )
  },
})

function checkFileType(file, cb) {
  const filetypes = /jpg|jpeg|png/
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
  const mimetype = filetypes.test(file.mimetype)

  if (extname && mimetype) {
    return cb(null, true)
  } else {
    cb('Images only!')
  }
}

const upload = multer({
  storage,
  limits: {fileSize: 1024 * 1024 * 1024, fieldSize: 10000000000},
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb)
  },
})

router.post('/', upload.single('image'), (req, res) => {
  res.send(`/${req.file.path}`)
})
// router.get('/', upload.single('image'), (req, res) => {
//   res.send(`/${req.file.path}`)
// })
// router.post('/',(req, res) => {
//   res.sendFile(__dirname + "/index.html");
// })


export default router
