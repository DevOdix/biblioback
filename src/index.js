// "Create React App" tooling expects to find the WWW root here,
// so we simply use this file to import the ./www directory.
//
// For the backend, we set the container's entrypoint to src/api/index.js



//Load express module with `require` directive
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

const actorsRoutes = require('./routes/actors-route');
const livresRoutes = require('./routes/livres-route');

var app = express()

app.use(bodyParser.json());



app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');

  next();
});

app.use('/api/actors',actorsRoutes); 

app.use('/api/livres',livresRoutes); 

app.get('/',(req,res) => {
  res.send('Hello World')
})

mongoose
.connect(
  'mongodb+srv://momo:sysroller87@bibliocluster-aptek.mongodb.net/biblio_db?retryWrites=true&w=majority',{useNewUrlParser: true,useUnifiedTopology : true}
)
.then(() => {
  console.log('connexion à la base mongoDB ..')
  app.listen(5000);
})
.catch(err => {
  console.log(err);
});

 


//module.exports = require('./www')