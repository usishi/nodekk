nodekk
======

[![NPM](https://nodei.co/npm/nodekk.png?downloads=true)](https://nodei.co/npm/nodekk/)

KolayKimlik oauth middleware for Express 4



## Usage : 

``` js

//Bunu Uygulama dosyanınızın en başına ekleyin
var nodekk      = require('nodekk');


//Bunu Express app.use satırlarınız en sonuna ekleyin (session tanımından sonra olması şart !!!)
app.use(nodekk.kolaykimlik({
  consumer_key:'kolaykimlik_consumerkey',
  consumer_secret:'kolaykimlik_consumersecret=',
  baseurl:'http://localhost:8080' //your url
}));

//Kullanıcı girişi ile erişilecek route'larda sadece yönlendirmeden önce middleware olarak nodekk kullanın buranın ÖZEL BÖLGE olduğu bilinsin
app.all('/admin',nodekk.ozelbolge,function(req,res){
  ///
});
```

## Installation

    npm install nodekk