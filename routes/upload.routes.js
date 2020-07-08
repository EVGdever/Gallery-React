const {Router} = require('express');
const multer = require('multer');
const sizeOf = require('image-size');
const path = require('path');
const fs = require('fs');
const config = require('../config/config');

const router = Router();



const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({
    limits: {fileSize: 2 * 1024 * 1024},
    storage: storage,
    fileFilter: (req, file, cb) => {
        const ext =  path.extname(file.originalname);
        if (ext !== '.jpg' && ext !== '.jpeg' && ext !== '.png'){
            const err = new Error('Extension');
            err.code = "EXTENSION";
            return cb(err);
        }
        cb(null, true);
    }
}).array('file', config.MAX_COUNT);

router.post('/image', function (req, res) {
    upload(req, res, err => {
        let error = '';

        if (err) {
            if (err.code === 'LIMIT_FILE_SIZE') {
                error = 'Размер картинки не более 2мб.';
            }
            if (err.code === 'LIMIT_UNEXPECTED_FILE') {
                error = `Максимальное кол-во картинок: ${config.MAX_COUNT}`;
            }
            if (err.code === 'EXTENSION') {
                error = 'Только jpg или png';
            }
        }

        if (req.files.length > 0) {
            let oldData;
            let newData;
            const newImageData = [];

            req.files.forEach(file => {
                const size = sizeOf(`uploads/${file.filename}`);
                newImageData.push({
                    filename: file.filename,
                    width: size.width,
                    height: size.height
                });
            });

            if (fs.existsSync(config.pathData)) {
                oldData = JSON.parse(fs.readFileSync(config.pathData, 'utf8'));
            }

            newData = {
                galleryImages: oldData ? [...oldData.galleryImages, ...newImageData] : newImageData
            }

            fs.writeFile(config.pathData, JSON.stringify(newData), function (err) {
                if (err) throw err;
                console.log('File is update successfully.');
            });
        }

        res.status(200).json({
            status: !error,
            message: !error ? 'Картинка загружена' : error
        });
    });
})


module.exports = router;
