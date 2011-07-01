express = require 'express'
app     = module.exports      = express.createServer()
port    = process.env.PORT  or= 3000

app.configure ->
  app.set 'views', __dirname + '/views' 
  app.set 'view engine', 'jade' 
  app.use require( 'stylus' ).middleware src: __dirname + '/public/stylesheets'
  app.use app.router
  app.use express.static __dirname + '/public'
  app.enable 'jsonp callback'
  return

app.configure 'development', ->
  app.use express.errorHandler dumpExceptions: true, showStack: true 

app.configure 'production', -> app.use express.errorHandler

generate_response = -> Math.round Math.random

generate_text = ( p ) -> ( parseInt p.ping?, 10 ) is 1

# Routes

app.get '/', (req, res) ->
  res.render 'index', title: "lost"

app.get '/pong', (req, res) ->
  res.send result: generate_response

app.get '/generate', (req, res) ->
  if generate_text req.query
    res.send result: "<p>Of all the things I've lost, I miss my mind the most</p>"
  else
    res.send result: "<p>ぜんぜんできる</p>"

app.listen port, -> 
  console.log "listening on port %d", app.address().port
  return
