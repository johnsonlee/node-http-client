var nhc = require('../');

nhc.get({
    url : 'https://passport.jd.com/uc/login'
}, function(err, res) {
    var $ = require('jquery')(res.body.defaultView);
    console.log($('input#uuid').attr('value'));
});
