var URL = require('url');
var HTTP = require('http');
var HTTPS = require('https');
var JsDOM = require('jsdom');
var Utility = require('util');
var IconvLite = require('iconv-lite');
var QueryString = require('querystring');

(function() {

    this.get = function(options) {
        options.method = 'GET';
        return this.doRequest.apply(this, arguments);
    };

    this.post = function() {
        options.method = 'POST';
        return this.doRequest.apply(this, arguments);
    };

    this.doRequest = function(options, cb) {
        var self = this;
        var url = URL.parse(options.url);
        var ssl = /^https:$/.test(url.protocol);
        var req = (ssl ? HTTPS : HTTP).request({
            auth     : url.auth,
            method   : options.method || 'GET',
            hostname : url.hostname,
            port     : url.port || (ssl ? 443 : 80),
            path     : url.path,
            headers  : options.headers,
        }, function(res) {
            if ('function' !== typeof cb) {
                return;
            }

            var chunks = [];
            var length = 0;

            // processing cookies
            self.$processCookies(res.headers['set-cookie']);

            res.on('data', function(chunk) {
                length += chunk.length;
                chunks.push(chunk);
            });

            return res.on('end', function() {
                var body = new Buffer(length);

                for (var i = 0, n = chunks.length, pos = 0; i < n; i++) {
                    var chunk = chunks[i];
                    chunk.copy(body, pos);
                    pos += chunk.length;
                }

                var contentType = res.headers['content-type'];
                var charset = contentType.match(/charset=(\w+[\w\-]+\w+)/i);
                var encoding = charset ? charset[1].trim().replace(/'|"/gm, '') : 'UTF-8';
                var httpResponse = {
                    url        : res.url,
                    status     : res.statusCode,
                    statusText : res.statusMessage,
                    headers    : res.headers,
                    body       : JsDOM.jsdom(IconvLite.decode(body, encoding), {
                        parseMode : 'html',
                    }),
                };

                if (/application\/json/i.test(contentType)) {
                    httpResponse.body = JSON.parse(body.toString());
                }

                return cb.call(self, null, httpResponse);
            });
        });

        req.on('error', function(e) {
            if ('function' === typeof cb) {
                return cb.call(self, e);
            }
        });

        switch (typeof options.body) {
        case 'object':
            if (options.body) {
                var contentType = req.getHeader('Content-Type');

                if (/application\/x-www-form-urlencoded/i.test(contentType)) {
                    req.write(QueryString.stringify(options.body));
                } else {
                    req.write(JSON.stringify(options.body));
                }
            }
            break;
        case 'undefined':
            break;
        default:
            req.write(options.body.toString());
            break;
        }

        req.end();
    };

    this.$processCookies = function(cookies) {
        if (!cookies)
            return;

        // TODO
    };

}).call(module.exports);
