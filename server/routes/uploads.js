const router = require('express').Router();
const multer = require('multer');
const { storage } = require('../cloudinary/index');

const uploads = multer({ storage });
router.post('/', uploads.array('files'), (req, res) => {
  try {
    const files = req.files.map((file) => ({
      path: file.path,
      filename: file.filename,
    }));
    return res.status(200).json({ files });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
