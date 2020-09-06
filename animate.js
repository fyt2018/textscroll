if (!this.myPlugin) {
    this.myPlugin = {}
}

myPlugin.Animate = function (option) {

    let defaultOpt = {
        duration: 10,
        total: 500,
    }

    this.option = Object.assign({}, defaultOpt, option);

    //计时器
    this.timer = null;
    //运动的次数
    this.number = Math.ceil(option.total / option.duration);
    //当前的次数
    this.curNumber = 0;
    //当前状态
    this.curData = Object.assign({},this.option.begin);
    //移动的总距离
    this.distance = {};
    for (var prop in this.option.end) {
        this.distance[prop] = this.option.end[prop] - this.option.begin[prop]
    }
    //每次移动的距离
    this.everyDis = {}
    for (var prop in this.distance) {
        this.everyDis[prop] = this.distance[prop] / this.number;
    }

}
myPlugin.Animate.prototype.start = function () {
    let _this = this;
    if (this.timer || _this.curNumber === _this.number) {
        return
    }
    if(_this.option.onStart){
        _this.option.onStart.call(_this)
    }
    this.timer = setInterval(() => {
        _this.curNumber++;
        for (var prop in _this.curData) {
            if(_this.curNumber === _this.number){
                _this.curData[prop] = _this.option.end[prop]
            }else{
                _this.curData[prop] += _this.everyDis[prop]
            }
        }
        if(_this.option.onMove){
            _this.option.onMove.call(_this,_this.curData)
        }
        if (_this.curNumber === _this.number) {
            if(_this.option.onOver){
                _this.option.onOver.call(_this,_this.curData)
            }
            _this.stop()
        }
    }, this.option.duration)


}
myPlugin.Animate.prototype.stop = function () {
    if (this.timer) {
        clearTimeout(this.timer);
        this.timer = null
    }
}