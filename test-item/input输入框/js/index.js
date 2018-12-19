(function(){

    function Init(options){
        // 需要把dom结构插入到的位子
         this.parent = options.parent;
         //jsonp传递时key值 让后端返回带上的属性名
         this.key = options.key || 'callback';
         //jsonp传递时value值 让后端返回的数据放在jsonpCallback()里
         this.jsonpCallback = options.jsonpCallback || '';
         // 请求数据地址
         this.url = options.url;
         //请求 数据的方法
         this.type = options.type;
         this.inputWidth = options.inputWidth || $(this.parent).width()-100;
         this.height = options.height || $(this.parent).height();
         this.fontSize = options.fontSize || 18;
         this.success = options.dealData;
         this.dataName = options.dataName;
         //创建DOM
         this.createDom();
         //穿件CSS
         this.addCss();
         this.bindEvent();

    }
    Init.prototype.createDom = function(){
        var oDiv = $('<div class="cj-input-content"></div>')
        var oInput = $('<input type="text" class="cj-input-search"/>');
        var oBtn = $('<input type="button" class="search-btn" value="搜索"/>');
        oDiv.append(oInput).append(oBtn).appendTo($(this.parent));
        

    }
    Init.prototype.addCss = function(){
        $('.cj-input-content',this.parent).css({
            width:'100%',
            height:'100%',
            //弹性盒模型
            display:'flex',
            // 沿主轴X轴 ，居中
            justifyContent:'center',
            //沿侧轴Y轴 居中
            alignItems:'center',
        })
        $('.cj-input-content > .cj-input-search',this.parent).css({
            height:this.height,
            width:this.inputWidth,
            marginRight: 10,
            fontSize:this.fontSize
        })
        $('.cj-input-content > .search-btn',this.parent).css({
            width: 100,
            height:this.height,
            fontSize:this.fontSize
        })
    }
    Init.prototype.bindEvent = function(){
        var self = this;
        $('.cj-input-content > .cj-input-search',this.parent).on('input',(function(e){
            // console.log($(this).val());
            $.ajax({
                type: self.type,
                url: self.url,
                // success:self.success,
                data:self.dataName + '=' + $(this).val(),
                dataType:'jsonp',               
                jsonp: self.key,
                jsonpCallback: self.jsonpCallback,
            })
        }))
    }

    $.fn.extend({
        search:function(options){
            options.parent = this;
            new Init(options);
        }
    });
}())