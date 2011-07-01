(function() {
  var app, express, generate_response, generate_text, port, _base;
  express = require('express');
  app = module.exports = express.createServer();
  port = (_base = process.env).PORT || (_base.PORT = 3000);
  app.configure(function() {
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');
    app.use(require('stylus').middleware({
      src: __dirname + '/public/stylesheets'
    }));
    app.use(app.router);
    app.use(express.static(__dirname + '/public'));
    app.enable('jsonp callback');
  });
  app.configure('development', function() {
    return app.use(express.errorHandler({
      dumpExceptions: true,
      showStack: true
    }));
  });
  app.configure('production', function() {
    return app.use(express.errorHandler);
  });
  generate_response = function() {
    return Math.round(Math.random);
  };
  generate_text = function(p) {
    return (parseInt(p.ping != null, 10)) === 1;
  };
  app.get('/', function(req, res) {
    return res.render('index', {
      title: "lost"
    });
  });
  app.get('/pong', function(req, res) {
    return res.send({
      result: generate_response
    });
  });
  app.get('/generate', function(req, res) {
    if (generate_text(req.query)) {
      return res.send({
        result: "<p>Of all the things I've lost, I miss my mind the most</p>"
      });
    } else {
      return res.send({
        result: "<p>ぜんぜんできる</p>"
      });
    }
  });
  app.listen(port, function() {
    console.log("listening on port %d", app.address().port);
  });
}).call(this);
