
/**
 * Module dependencies.
 */

var express = require('express'),
    home    = require('./routes/index'),
    user    = require('./routes/user'),
    listing = require('./routes/listing'),
    http    = require('http'),
    path    = require('path');

var app = express();

app.configure(function() {
    app.set('port', process.env.PORT || 8888);

    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');

    app.use(express.favicon(__dirname + '/favicon.ico'));
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.methodOverride());

    //app.use(express.cookieParser('your secret here'));
    //app.use(express.session());

    app.use(app.router);
    app.use(express.static(path.join(__dirname, 'public')));


});

app.configure('development', function() {
    app.use(express.errorHandler());
});

// HOME
app.get(   '/',           home.index);
app.get(   '/index.html', home.index);

// USER
app.post(  '/users/',    user.create);
app.get(   '/users',     user.list);
app.get(   '/users/:id', user.get);
app.put(   '/users/:id', user.update);
app.delete('/users/:id', user.delete);


// LISTING
app.post(  '/listings/',    listing.create);
app.get(   '/listings',     listing.list);
app.get(   '/listings/:id', listing.get);
app.put(   '/listings/:id', listing.update);
app.delete('/listings/:id', listing.delete);

http.createServer(app).listen(app.get('port'), function() {
    console.log("Express server listening on port " + app.get('port'));
});
