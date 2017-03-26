function Observer(data) {
    this.data = data;
    this.walk(data);
    this.watch = {};
}

Observer.prototype.walk = function (obj) {
    let val;
    for (let key in obj) {
        
        if (obj.hasOwnProperty(key)) {
            val = obj[key];

            if (typeof val === 'object') {
                new Observer(val);
            }

            this.convert(key, val);
        }
    }
};

Observer.prototype.convert = function (key, val) {

    let ctx = this;

    Object.defineProperty(this.data, key, {
        enumerable: true,
        configurable: true,
        get: function () {
            console.log('你访问了', key);
            return val;
        },
        set: function (newVal) {
            if (newVal === val) return;

            console.log('你设置了', key, '，新的值为', newVal);
            
            ctx.watch[key] && ctx.watch[key](newVal);
            val = newVal;

            // 如果判断为对象，再次观察
            if (typeof val === 'object') {
                new Observer(val, ctx);
            }
        }
    })
};

Observer.prototype.$watch = function(key,cb){
    this.watch[key] = cb;
}