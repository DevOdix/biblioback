// "Create React App" tooling expects to find the WWW root here,
// so we simply use this file to import the ./www directory.
//
// For the backend, we set the container's entrypoint to src/api/index.js



//Load express module with `require` directive
var express = require('express')
var app = express()

//Define request response in root URL (/)
app.get('/', function (req, res) {
  res.send('Hello World 22!!!!')
})

//Launch listening server on port 8081
app.listen(8081, function () {
  console.log('app listening on port 8081!')
})


//module.exports = require('./www')