## get /api/losts?page&count
возвращает список потерянных вещей с пагинацией
page - страница, если не указано, то 1
count - кол-во объявлений в странице, если не указано то 10

пример запроса ```/api/losts?page=1&count=20```

пример ответа
```json lines
{
    "error": false,
    "items": [
        {
            "id": 1, // уникальный индетификатор объявления
            "description": "Нашел студенческий билет", // описание
            "photo": "/photos/dsvcsdkc.jpg", // ссылка на фото
            "phone": "+79997776666" // номер телефона
        },
        ...
    ]
}
```

## get /api/lost/:id
возвращает определенное объявление по индетификатору

пример ответа если передан корректный индетификатор
```json lines
{
  "error": false,
  "id": 1, // уникальный индетификатор объявления
  "description": "Нашел студенческий билет", // описание
  "photo": "/photos/dsvcsdkc.jpg", // ссылка на фото
  "phone": "+79997776666" // номер телефона
}
```
если объявления с таким id не существует, то возвращает код 404
```json lines
{
  "error": "Объявление не найдено"
}
```

## post /api/lost
запрос в формате multipart/form-data
```html
<form>
  <textarea name="description" required></textarea>
  <input type="tel" name="phone" required> 
  <input type="file" name="photo" accept="image/*" required>
</form>
```
в случае успеха код 201
```json lines
{
  "error": false,
  "id": 1, // уникальный индетификатор объявления
  "description": "Нашел студенческий билет", // описание
  "photo": "/photos/dsvcsdkc.jpg", // ссылка на фото
  "phone": "+79997776666" // номер телефона
}
```
в случае ошибки код 400
```json lines
{
  "error": "Текст ошибки"
}
```

