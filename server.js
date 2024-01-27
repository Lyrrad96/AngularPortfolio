const express = require('express');

const sqlite3 = require('sqlite3');

const db = new sqlite3.Database('D:\\VSCode\\Portfolio\\portfolio\\src\\db\\grids.db');

const app = express();
const port = 4000;

app.get('/tet', (req, res) => {
  res.send('Hello World from Node.js server!');
});

app.post('/insert', (req, res) => {
  //Executing run() Method
  console.log(new Date())
  db.run(`INSERT INTO jim(date, name, category) VALUES(?, ?, ?)`,[new Date(), 'pp2', 'push'],
      function(error){
        res.send('done')
      }
  );
});

app.post('/insert', (req, res) => {
  //Executing run() Method
  console.log(new Date())
  db.run(`INSERT INTO jim(date, name, category) VALUES(?, ?, ?)`,[new Date(), 'pp2', 'push'],
      function(error){
        res.send('done')
      }
  );
});

app.post('/read', (req, res) => {
  var data = []
  //Retrieving All Rows
  db.all("SELECT * FROM jim", (error, rows) => {
    console.log(error, rows)
    if(error) {
      res.send(error)
      return
    }
    rows.forEach((row) => {
      row.date = new Date(row.date)
      data.push(row);
    })
    res.send(data)
  });
});

app.use(express.static('portfolio'))

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

const path = require('path');

// ... Existing code ...
console.log(__dirname)

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '/index.html'));
// });

// ... Existing code ...
