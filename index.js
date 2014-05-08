var 	OAuth         = require('oauth').OAuth;

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";


var startoauthjob = function(req,res){
  oauth.getOAuthRequestToken(function(error, oauth_token, oauth_token_secret, results) {
    if (error) {
      console.log(error);
      res.send("KolayKimlik Sistemlerindeki geçici bir problem nedeniyle giriş yapılamadı.");
    }
    else {
      req.session.oauth = {
        token: oauth_token,
        token_secret: oauth_token_secret
      };
      res.redirect('https://www.kolaykimlik.com/oauthv1/authorize?oauth_token='+oauth_token);
    }
  });
}

exports.kolaykimlik = function(options){
	if (!options || !options.consumer_key || !options.consumer_secret || !options.baseurl){
		console.error('\nKolay Kimlik Ayarları Doğru Yapılmamış\n');
		process.exit(1);
	}
	var oauth = new OAuth(
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
      if (req.session.oauth) {
        req.session.oauth.verifier = req.query.oauth_verifier;
        var oauth_data = req.session.oauth;
     
        oauth.getOAuthAccessToken(
          oauth_data.token,
          oauth_data.token_secret,
          oauth_data.verifier,
          function(error, oauth_access_token, oauth_access_token_secret, results) {
            console.log(results);
            if (error) {
              console.log(error);
              res.send("Authentication Failure!");
            }
            else {
              req.session.oauth.access_token = oauth_access_token;
              req.session.oauth.access_token_secret = oauth_access_token_secret;
              oauth.get('https://www.kolaykimlik.com/oauthv1/userinfo',oauth_access_token,oauth_access_token_secret,function(e, data, oauthres){
                if (e) console.error(e);
                req.session.user=JSON.parse(data);
                next();
              });    
            }
          }
        );
      } else {
        startoauthjob(req,res);
      }
  	}
  }
}

exports.ozelbolge = function(req,res,next){
	if (!req.session.user){
    startoauthjob(req,res);
  } else {
    next();
  }
}