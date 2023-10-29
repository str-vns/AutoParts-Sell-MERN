const multer = require('multer');
const path = require('path');

module.exports = multer(
    {
        limits: {fieldSize : 50 * 1024 * 1024},
        storage: multer.diskStorage({}),
       fileFilter: (req,file,cb) => {
            let ext = path.extname(file.originalname).toLowerCase();
            if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png")
            {
                cb(new Error("File type is not supported"),false);
                return;

            }
            cb(null,true);
        }
    }
)