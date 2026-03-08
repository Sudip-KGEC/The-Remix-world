const multer = require("multer");

const storage = multer.memoryStorage();

// File type validation
const fileFilter = (req, file, cb) => {

  const allowedTypes = [
    "audio/mpeg",      // mp3
    "audio/wav",
    "audio/flac",
    "video/mp4"
  ];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type. Only MP3, WAV, FLAC and MP4 allowed"), false);
  }

};

const upload = multer({
  storage,
  limits: {
    fileSize: 100 * 1024 * 1024 // 100MB
  },
  fileFilter
});

module.exports = upload;