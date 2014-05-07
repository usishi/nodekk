var 	OAuth         = require('oauth').OAuth;


exports.kolaykimlik = function(options){
	if (!options || !options.consumer_key || !options.consumer_secret || !options.baseurl){
		console.error('\nKolay Kimlik Ayarları Doğru Yapılmamış\n');
		process.exit(1);
	}
	var oauth = new OAuth(
    //'http://oauth.eba.gov.tr/server/auth/oauth/request_token',
    //'http://oauth.eba.gov.tr/server/auth/oauth/access_token',
    "https://www.kolaykimlik.com/oauthv1/initiate",
    "https://www.kolaykimlik.com/oauthv1/authorize",
    options.consumer_key,
    options.consumer_secret,
    '1.0A',
    options.baseurl+'/kolaykimlik/callback',
    'HMAC-SHA1'
  );
  return function(req, res, next) {
  	if (req.method !== 'GET') return next();
  	if (req.url.indexOf('/kolaykimlik/')<0){
  		next();
  	} else {
 			console.log("EVEET bizlik bu url"); 		
  	}
  }
}

exports.ozelbolge = function(req,res,next){
	console.log("BU bölge şifre ister");
}