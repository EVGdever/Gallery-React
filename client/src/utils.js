import {IMG_MARGIN, MAX_ROW_HEIGHT, MAX_ROW_WIGHT, MIN_IMG_COUNT} from "./config";

function setMaxHeight(image, height = MAX_ROW_HEIGHT) {
    // рассчет коофициента уменьшения
    let heightRatio = image.height / height;
    image.height = height;
    image.width = image.width / heightRatio;

    return image;
}

function setupRows(images) {
    let rows = [];
    let nextImgIndex = 0;
    while (images.length > 0 && images.length > nextImgIndex) {
        let row = [];
        let imagesWidth = 0;
        // Наполнение строки минимальниым кол-вом элементов
        const nextCountRow = nextImgIndex + MIN_IMG_COUNT;
        for (let i = nextImgIndex; i < nextCountRow; i++) {
            if (images[i]) {
                nextImgIndex++;
                row.push(images[i]);
            }
        }

        // Приведение всех изображений к максимальной высоте сохраняя пропорции
        row.map(image => {
            const imgNormalHeight = setMaxHeight(image);
            imagesWidth += image.width + IMG_MARGIN;
            return imgNormalHeight;
        });

        // Наполнение строки до конца
        while (imagesWidth < MAX_ROW_WIGHT && images.length > nextImgIndex) {
            const nextImage = setMaxHeight(images[nextImgIndex]);
            imagesWidth += nextImage.width + IMG_MARGIN;
            row.push(nextImage);
            nextImgIndex++;
        }

        // Уменьшение высоты сохраняя пропорции, пока картинки не выравняются по правому краю
        let rowHeight = MAX_ROW_HEIGHT;
        while (imagesWidth > MAX_ROW_WIGHT) {
            // точность подсчета ширины
            rowHeight -= 0.5;

            imagesWidth = 0;
            row.forEach(image => {
                const reduceImage = setMaxHeight(image, rowHeight);
                imagesWidth += reduceImage.width + IMG_MARGIN;
            });
            // Убираем один отступ у последнего эллемента
            imagesWidth -= IMG_MARGIN;
        }

        rows.push(row);
    }

    return rows;
}

export default {
    setupRows,
}
