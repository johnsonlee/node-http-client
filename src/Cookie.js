function Cookie() {

    this.$name = null;

    this.$value = null;

    this.$expiryDate = null;

    this.$domain = null;

    this.$path = null;

    this.$secure = false;
}

Cookie.parse = function(cookie) {
    // TODO
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

}).call((module.exports = Cookie).prototype);
