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


function re(str){
    var _s = '',
        _str = '',
        i = 1;
    str.replace(/(\w{1})/g, function(s, m, n){
        if(_s==s){
            i++;
        }else{
            if(_str==''){
                _str = s;
            }else{
                _str +=i;
                _str +=s;
                i = 1;
            }

            _s = s;
        }

        if(n == str.length-1){
            _str += i;
        }
    })

    return _str.length<str.length? _str:str;
}


