    
var express     = require('express'),
    http        = require('http'),
    bodyParser  = require('body-parser'),
    mo          = require('method-override'),
    cParser     = require('cookie-parser'),
    nodekk      = require('../'),
    session     = require('express-session');

var app = express();

app.set('port',process.env.PORT || 8080);
app.use('/static',express.static(__dirname + '/static'));
app.set('views', __dirname + '/views');
app.set('view engine', 'jade'); 
app.use(bodyParser());
app.use(mo());
app.use(cParser('sample'));
app.use(session({ secret: 'sample@Usishi', key: 'sid', cookie: { secure: true , maxAge:60000*60*24*7}}));
app.use(nodekk.kolaykimlik({
  consumer_key:'kjbfjsdb',
  consumer_secret:'djbjks',
  baseurl:'http://localhost'
}));
    

app.all('/admin',nodekk.ozelbolge,function(req,res){
  res.end('özel bölge erişildi')
});

app.all('/genel',function(req,res){
  res.end('genel bölge');
});

app.all('/',function(req,res){
  res.end('genel bölge');
});


http.createServer(app).listen(8080, function(){
  
});



