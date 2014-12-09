
var request = require('supertest')

var app = require('..')
var server = app.listen()

before(function () {
  return app.connect
})

describe('/i', function () {
  it('GET /:url', function (done) {
    request(server)
    .get('/i/http://i.imgur.com/v8PKL6I.jpg')
    .expect('Content-Type', 'image/jpeg')
    .expect(200, done)
  })
})

describe('/l', function () {
  it('GET /:url', function (done) {
    request(server)
    .get('/l/https://github.com')
    .expect(200)
    .expect('Content-Type', /application\/json/)
    .end(done)
  })
})
