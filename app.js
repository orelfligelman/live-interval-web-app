//Require neccessary libraries
var mongoose = require('mongoose');
var express = require('express');
var app = express();
// require('./models/Speed');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var http = require('http').Server(app);
var io = require('socket.io')(http);
// var Speed = mongoose.model('Speed');
var count = 0;
var g_velocity;
var time;

var routes = require('./routes/index');
var users = require('./routes/users');

var x;
var y;

setInterval(function(){
x = Math.random(1,5);
y = Math.random(1,5);
},1000);




  

// var db = mongoose.connect('mongodb://localhost/hackerati',function(err, db){
//     if(!err){console.log('Connection established !!')}
// });

// setInterval(function(){
//     Speed.findOne(function (err, speeds) {
//   if (err) return console.error(err);
//   g_velocity=speeds.velocity
//   time = speeds.time
// });
// }, 2500)

//On user connection, emit the number of users online, 
io.on('connection',function(socket){  
    console.log('orel connected');
  //   count++;
  //   if(count === 1){
  //       io.emit('online_users', (count));
  //   }else{
  //       io.emit('online_users' ,(count));
  //   };

  //   socket.on('disconnect', function(){
  //   count--;    
  //   io.emit('online_users' ,(count));

  //   //every 2.5 seconds, send new data to be graphed
    setInterval(function(){
    io.emit('xaxis', (x));
    io.emit('yaxis', (y));
    },2500);    
  // });
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'production') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;

http.listen(3000, function(){
    console.log('listening on *:3000')
});