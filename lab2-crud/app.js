const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

app.use((req, res, next) => {
console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
next();
});

let recipes = [
{ id: 1, title: 'Salad', time: 10, ingredients: ['tomato', 'cucumber', 'pepper', 'onion', 'salad'], difficulty: '1'},
{ id: 2, title: '', time: 7, ingredients: [], difficulty: '2'},
{ id: 3, title: '', time: 60, ingredients: '', difficulty: '3'}
];

let nextId = 4;

app.get('/recipes', (req, res) => {
res.json({
count: recipes.length,
recipes: recipes
});
});

app.get('/recipes/:id', (req, res) => {
const id = parseInt(req.params.id);
const recipe = recipes.find(i => i.id === id);
if (!recipe) {
return res.status(404).json({ error: 'Элемент не найден' });
}
res.json(recipe);
});

app.post('/recipes', (req, res) => {
const { title, time} = req.body;
if (!title || time === undefined) {
return res.status(400).json({
error: 'Поля title и time обязательны'
});
}

const newRecipe = {
id: nextId++,
title: title,
time: time
};
recipes.push(newRecipe);

res.status(201).json(newRecipe);
});

app.put('/recipes/:id', (req, res) => {
const id = parseInt(req.params.id);
const index = recipes.findIndex(i => i.id === id);
if (index === -1) {
return res.status(404).json({ error: 'Элемент не найден' });
}
const { title, time} = req.body;

recipes[index] = {
id: id,
title: title || recipes[index].title,
time: time !== undefined ? time : recipes[index].time
};
res.json(recipes[index]);
});

app.delete('/recipes/:id', (req, res) => {
const id = parseInt(req.params.id);
const index = recipes.findIndex(i => i.id === id);
if (index === -1) {
return res.status(404).json({ error: 'Элемент не найден' });
}
const deletedRecipe = recipes.splice(index, 1)[0];

res.json({
message: 'Элемент удалён',
deleted: deletedRecipe
});
});

app.get('/recipes?search=', (req, res)) 

app.use((req, res) => {
res.status(404).json({ error: 'Маршрут не найден' });
});

app.listen(port, () => {
console.log(`Сервер запущен на http://localhost:${port}`);
});