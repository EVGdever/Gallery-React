const {Router} = require('express');
const fs = require('fs');
const config = require('../config/config');

const router = Router();


router.get('/all', (req, res) => {
    let imagesData = fs.existsSync(config.pathData) ?
        JSON.parse(fs.readFileSync(config.pathData, 'utf8')) :
        JSON.parse(fs.readFileSync(config.pathFakeData, 'utf8'));

    if (imagesData.galleryImages.length <= 0) {
        imagesData = JSON.parse(fs.readFileSync(config.pathFakeData, 'utf8'));
    }

    res.status(200).json(imagesData.galleryImages);
});

router.post('/:imgName/delete', (req, res) => {
    try {
        const imagesData = JSON.parse(fs.readFileSync(config.pathData, 'utf8'));
        const afterReduce = imagesData.galleryImages.filter(image => {
            return image.filename !== req.params.imgName;
        })

        const newData = {
            galleryImages: afterReduce
        }
        fs.writeFile(config.pathData, JSON.stringify(newData), function (err) {
            if (err) throw err;
            console.log('File is update successfully.');
        });

        res.status(200).json({ message: `картинка ${req.params.imgName} успешно удаленна` });
    } catch (e) {
        res.status(500).json({ message: 'Не удалось удалить картинку' });
    }
});

module.exports = router;
