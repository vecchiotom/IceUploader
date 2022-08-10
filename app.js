const express = require('express')
const engine = require('express-handlebars').engine
require('dotenv').config()
const app = express()
const port = 3000

//app.use
app.use(express.static('public'));
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

app.get('/', (req, res) => {
    res.render('index');
})

app.listen(process.env["PORT"] || port, () => {
  console.log(`Example app listening on port ${process.env["PORT"] || port}`)
})