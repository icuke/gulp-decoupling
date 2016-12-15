; + function(root, doc, base) {

    /**
     *  
     */
    class Linkage extends base{
        constructor(){
            super();            
        }

        // 遍历
        each(callback){
            this.eles.forEach((ele) => {
                callback&&callback.call(this, ele);
            });
        }        

        // 多级联动
        isComponent(ele){
            return ele.dataType? true:false;
        }

        // refre
        refresh(){
            this.eles = [].from(this.getDoms(doc, this.options.ele));
            this.init();

            return this;
        }
    }

    /**
     * 
     */
    class LinkageCity extends Linkage{
        constructor(options){
            super();

            this.options = {
                ele: '.linkage-city',
                show: true,
                title: false
            }

            this.extend(this.options, options);
            this.eles = [].from(this.getDoms(doc, this.options.ele));

            this.init();
        }

        // 创建视图
        creatrView(ele){
            if(this.isComponent(ele)){

            }else{

            }
        }

        // 设置类型创建属性, 私有属性绑定到 dom 节点上, 可公用属性绑定到实例属性上
        setType(ele){
            var _type = ele.dataType;
            if(_type){
                if(/^\w+$/g.test(_type[0])){
                    console.info(1);
                }
            }
        }

        // 初始化
        init(){
            this.each((ele) => {
                if(ele.flag){
                    return;
                }

                this.getType(ele);
                this.setType(ele);
                this.creatrView(ele);

                ele.flag = true;
            });
        }
    }

    /**
     * 年月日, 时分秒
     */
    class LinkageDate extends Linkage{
        constructor(){
            super();

            this.options = {
                ele: '.linkage-date',
                show: true,
                title: false
            }

            this.extend(this.options, options);
            this.eles = [].from(this.getDoms(doc, this.options.ele));

            this.init();
        }

        // 闰年
        isLape(year){
            var _y = parseInt(year);
            return _y%400==0 || (_y%4==0 && _y%100!=0)? true:false;
        }

        // 获取月份状态
        getMonthState(){

        }

        // 创建视图
        creatrView(ele){

        }

        // 设置类型创建属性, 私有属性绑定到 dom 节点上, 可公用属性绑定到实例属性上
        setType(ele){
        }

        init(){
            this.each((ele) => {
                if(ele.flag){
                    return;
                }

                this.getType(ele);
                this.setType(ele);
                this.creatrView(ele);

                ele.flag = true;
            });
        }
    }

    /**
     * 单个下拉框
     */
     class LinkageInit extends Linkage{
        constructor(options){
            super();

            this.options = {
                ele: '.linkage',
                show: true,
                title: false
            }

            this.extend(this.options, options);
            this.eles = [].from(this.getDoms(doc, this.options.ele));

            this.init();

        }

        init(){
            this.each((ele) => {
                if(ele.flag){
                    return;
                }/*

                this.getType(ele);
                this.setType(ele);
                this.creatrView(ele);*/

                ele.flag = true;
            });
        }
     }

    if (typeof define == 'function' && define.amd) {
        define(['linkage'], Linkage);
    } else if (typeof module == 'object' && module.exports) {
        module.exports = Linkage;
    } else if (typeof root != 'undefined') {
        // Browser globals (root is window)
        root.linkage = {
            linkageInit: function(options){
                return new LinkageInit(options);
            },
            linkageDate: function(options){
                return new LinkageDate(options);
            },
            linkageCity: function(options){
                return new LinkageCity(options);
            }
        }
    }
}(window, document, Base||class Base{});

var kk = linkage.linkageInit({
    ele: '.linkage'
}),
    i = 0;

var o = kk.eles[0];
o.classList.add1('red');
var fn1 = kk.addEvent(o, '.linkage-name', 'click', function(){
    i++;
    alert('我是通过事件委托的点击事件处理函数, 第:'+i+'次');
});
var fn2 = kk.addEvent(o, 'click', function(){
    i++;
    alert('我是直接添加的点击事件事件处理函数, 第:'+i+'次');
});
var fn3 = kk.one(o, 'click', function(){
    i++;
    alert('我是通过事件委托的事件处理函数, 第:'+i+'次, 我只会执行一次');
});


kk.addEvent(remove, 'click', function(){
    // 移除事件委托
    kk.removeEvent(o, 'click', fn1);
    kk.removeEvent(o, 'click', fn2);
    alert('我移除了上面的事件委托和直接绑定的点击事件, 看看有没有成功');
});







