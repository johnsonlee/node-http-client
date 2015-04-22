var HttpClient = require('../');

var client = new HttpClient();

client.get({
    url : 'https://passport.jd.com/uc/login'
}, function(err, res) {
    if (err) {
        console.log(err.message || err.stack);
        return;
    }

    var $ = require('jquery')(res.body.defaultView);
    console.log($('input#uuid').attr('value'));
});
