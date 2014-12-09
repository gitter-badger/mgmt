
var images = require('mgmt-images-server')
var links = require('mgmt-links-server')
var Image = require('mgmt-images')
var Link = require('mgmt-links')

// Create server
var compress = require('compression')
var express = require('express')

var app = module.exports = express()

app.use(compress())
app.use('/i', images.callback())
app.use('/l', links.callback())

// Load database
var MongoClient = require('mongodb').MongoClient

var uri = process.env.MONGODB_URI
  || 'mongodb://127.0.0.1:27017/mgmt'

app.connect = new Promise(function (resolve) {
  MongoClient.connect(uri, function (err, db) {
    /* istanbul ignore if */
    if (err) {
      console.error(err.stack)
      process.exit(1)
    }

    app.db = db
    Image.collection = db.collection('images')
    Link.collection = db.collection('links')

    console.log('Connected to the database!')
    resolve()
  })
})

// Run the server
/* istanbul ignore if */
if (!module.parent) {
  app.connect.then(function () {
    var port = process.env.PORT || 8081
    require('http')
    .createServer(app.callback())
    .listen(port, function (err) {
      if (err) throw err

        console.log('MGMT listening on port %s', port)
      })
  })
}
