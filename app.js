const express = require('express')
const engine = require('express-handlebars').engine
const fileUpload = require('express-fileupload');
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('gay');
require('dotenv').config()
const app = express()
const port = 3000

//app.use
app.use(express.static('public'));
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');
app.use(fileUpload());

function makeid() {
  var text = "";
  var possibleLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  var possibleNumbers = "0123456789";

  for (var i = 0; i < 2; i++)
    text += possibleLetters.charAt(Math.floor(Math.random() * possibleLetters.length));
  for (var i = 0; i < 3; i++)
    text += possibleNumbers.charAt(Math.floor(Math.random() * possibleNumbers.length));

  return text;
}

db.serialize(() => {
  db.run("CREATE TABLE IF NOT EXISTS files (file TEXT, token TEXT, protected TEXT);");
  db.all("SELECT file, token FROM files", (err, rows) => {
    console.log(rows)
    for (let index = 0; index < rows.length; index++) {
      console.log("adding new route: " + rows[index].token)
      app.get('/' + rows[index].token, (req, res) => {
        res.sendFile(__dirname+'/uploads/' + rows[index].file)
      })

    }

    app.get('/', (req, res) => {
      res.render('index');
    })

    app.post('/upload', function (req, res) {
      let sampleFile;
      let uploadPath;
      var id = makeid()

      if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({ result: "not ok" });
      }

      // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
      sampleFile = req.files.file;

      // Use the mv() method to place the file somewhere on your server
      sampleFile.mv(process.env["FILE_DIR"] + sampleFile.name, function (err) {
        if (err)
          return res.status(500).send(err);
        db.run("INSERT OR IGNORE INTO files(file, token) VALUES(?, ?)", sampleFile.name, id, (err)=>{
          if(err==null) {
            res.json({ success: true, link:"/"+id })
            app.get('/' + id, (req, res) => {
              res.sendFile(__dirname+'/uploads/' + sampleFile.name)
            })
          }
          else res.status(400).json({ result: "not ok" });

        })
      });
    });

    app.listen(process.env["PORT"] || port, () => {
      console.log(`Example app listening on port ${process.env["PORT"] || port}`)
    })
  })
});