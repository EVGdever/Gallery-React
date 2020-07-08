/**
 * Порт для запуска сервера
 * Так же нужно изминять в client/package.json в поле "proxy" = http://localhost:<port>
 *
 * @type {number}
 */
const port = 5000;

/**
 * Путь к json файлу с данными о картинках
 * @type {string}
 */
const pathData = 'uploads/imagesData.json';

/**
 * Путь к json файлу с данными о картинках
 * @type {string}
 */
const pathFakeData = './fakeData.json';

/**
 * Максимальное кол-во обрабатываемых картинок за 1 раз
 * @type {number}
 */
const MAX_COUNT = 10;

module.exports = {
    port,
    pathData,
    pathFakeData,
    MAX_COUNT
}
