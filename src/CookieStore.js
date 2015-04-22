function CookieStore() {
    this.$cookies = [];
}

(function() {

    this.addCookie = function(cookie) {
        this.$cookies.push(cookie);
    };

    this.getCookies = function() {
        return this.$cookies.slice();
    };

    this.clearExpired = function(date) {
        for (var i = this.$cookies.length - 1; i >= 0; i--) {
            if (this.$cookies[i].isExpired()) {
                this.$cookies.splice(i, 1);
            }
        }
    };

    this.clearAll = function() {
        while (this.$cookies.length > 0) {
            this.$cookies.pop();
        }
    };

    this.toJSON = function() {
        return JSON.stringify({
            cookies : this.$cookies,
        });
    };

}).call((module.exports = CookieStore).prototype);
