    
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
app.use(session({ secret: 'sample@Usishi', key: 'sid', cookie: { secure: false , maxAge:60000*60*24*7}}));

app.use(nodekk.kolaykimlik({
  consumer_key:'kolaykimlik_consumerkey',
  consumer_secret:'kolaykimlik_consumersecret=',
  baseurl:'http://localhost:8080' //your url
}));
    

app.all('/admin',nodekk.ozelbolge,function(req,res){
  console.log("GELEN USER : "+JSON.stringify(req.session.user));
  res.end('özel bölge erişildi : '+req.session.user._id+' '+req.session.user.firstname+' '+req.session.user.lastname);
});

app.all('/genel',function(req,res){
  if (req.session.say==undefined){
    req.session.say=0;
  } else req.session.say++;
  res.end('genel bölge '+req.session.say);
});

app.all('/',function(req,res){
  console.log(req.session);
  if (req.session.say==undefined){
    req.session.say=0;
  } else req.session.say++;
  console.log(req.session);
  res.end('genel bölge '+req.session.say);
});


http.createServer(app).listen(8080, function(){
  
});



