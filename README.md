# Галерея фотографий на React

Функционал компонента
  - Загрузка фейковых картинок при остутствии файлов на сервере
  - Загрузка файлов
  - Функция Drag and Drop
  - Динамическое выравнивание высоты и ширины картинки в зависимости от выставленных конфигураций
  - Конфигурирование параметров вывода 

## Какие скрипты есть в package.json сервера
  - "server" - Запуск backend
  - "client" - Запуск frontend
  - "delete-images" - Удаление всех загруженных фотографий
  - "dev" - Запуск приложения для использования нужно выполнить данный скрипт через IDE либо в консоли прописать команду `npm run dev`

## Что хотелось бы доделать
    1. Добавить форму для админа, для изменений конфигураций с помощью UI
    2. Добавить stub-картинки в момент подгрузки файлов с сервера
    3. Адптивность галереи (достигается за счет изминения констант в конфигурациях галереи)
    4. Поправить стили
    
## Файлы конфигураций
в файлах конфигурации добавленны коментарии для понимания за что отвечаеет каждая переменная.
### Файл конфигураций сервера - /config/config.js
### Файл конфигураций клиента - /client/src/config.js

