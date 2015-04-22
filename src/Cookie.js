function Cookie(origin) {

    this.$name = null;

    this.$value = null;

    this.$expiryDate = null;

    this.$domain = origin.hostname;

    this.$path = '/';

    this.$secure = false;

    this.$httpOnly = true;
}

Cookie.parse = function(cookie, origin) {
    var c = new Cookie(origin);

    cookie.split(/\s*;\s*/).forEach(function(attr) {
        if (/^\s*$/.test(attr)) {
            return;
        }

        var equal = attr.indexOf('=');
        var name  = (-1 == equal) ? attr : attr.substring(0, equal);
        var value = (-1 == equal) ? null : attr.substr(equal + 1);

        if (/Expires/i.test(name)) {
            c.$expiryDate = new Date(value);
        } else if (/Max-Age/i.test(name)) {
            var now = new Date();
            now.setTime(now.getTime() + (parseInt(value) * 1000));
            c.$expiryDate = now();
        } else if (/Domain/i.test(name)) {
            c.$domain = value;
        } else if (/Path/i.test(name)) {
            c.$path = value;
        } else if (/Secure/i.test(name)) {
            c.$secure = true;
        } else if (/HttpOnly/i.test(name)) {
            c.$httpOnly = true;
        } else {
            c.$name = name;
            c.$value = value;
        }
    });

    return c;
};

(function() {

    this.isExpired = function(date) {
        return this.expiryDate >= date;
    };

    this.toJSON = function() {
        return JSON.stringify({
            name       : this.name,
            value      : this.value,
            expiryDate : this.expiryDate,
            domain     : this.domain,
            path       : this.path,
            secure     : this.secure,
            httpOnly   : this.httpOnly,
        });
    };

    Object.defineProperty(this, 'name', {
        get : function() {
            return this.$name;
        },
        configurable : true,
        enumerable : true,
    });

    Object.defineProperty(this, 'value', {
        get : function() {
            return this.$value;
        },
        configurable : true,
        enumerable : true,
    });

    Object.defineProperty(this, 'domain', {
        get : function() {
            return this.$domain;
        },
        configurable : true,
        enumerable : true,
    });

    Object.defineProperty(this, 'expiryDate', {
        get : function() {
            return this.$expiryDate;
        },
        configurable : true,
        enumerable : true,
    });

    Object.defineProperty(this, 'path', {
        get : function() {
            return this.$path;
        },
        configurable : true,
        enumerable : true,
    });

    Object.defineProperty(this, 'secure', {
        get : function() {
            return this.$secure;
        },
        configurable : true,
        enumerable : true,
    });

    Object.defineProperty(this, 'httpOnly', {
        get : function() {
            return this.$httpOnly;
        },
        configurable : true,
        enumerable : true,
    });

}).call((module.exports = Cookie).prototype);
