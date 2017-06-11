define([
    "oss_core/pm/screendesigner/js/graphLibs/GRoot",
"oss_core/pm/screendesigner/js/graphLibs/views/GNumsBarView"
], function(GRoot, View) {

    var GNumsBar = GRoot.extend({
        initElement: function() {
            var self = this;
            var title = this.attrs.title || '文字名称';
            var titleColor = this.attrs.titleColor || '#ddff00';
            var paper =this.paper;
            var x=0;
            var y =0;
            this.val=297270446;
            this.digits=[];
            this.attrs.digits =this.attrs.digits|| 9;


            for (var i =0 ;i<this.attrs.digits; i++){
              var digit_Item=self.createdigit(i,x,y)
              this.digits.push(digit_Item);
              this.doms['digit'+i]=digit_Item.set;
            }



            var lastDig = this.digits[this.digits.length-1];
            var unit_x=(lastDig.x+(lastDig.w+10))+lastDig.w/2;
            var unit_y=lastDig.y+lastDig.h/2;
            var unit=paper.text(unit_x,unit_y,'元').attr({
                'fill': '#fde148',
                'font-size': 42,
                'font-family': '微软雅黑',
                'font-weight': 'bold'
            });
            this.doms['unit']=unit;

            // this.doms['title'] = this.paper.text(0, 0, title).attr({
            //     'fill': titleColor,
            //     'font-size': 30,
            //     'font-family': '微软雅黑',
            //     'font-weight': 'bold'
            // });;
            // self.setTitle(title);
            // self.setTitleColor(titleColor);
            //
            //
            // this.doms['config'] = this.paper.text(100, -30, '配置').attr({
            //     'fill': 'red',
            //     'font-size': 18,
            //     'font-family': '微软雅黑',
            //     'font-weight': 'bold'
            // });;
            this.doms['remove'] = this.paper.text(160, -30, '删除').attr({
                'fill': 'red',
                'font-size': 18,
                'font-family': '微软雅黑',
                'font-weight': 'bold'
            });;

            this.setValue(this.val);
            this.getData();

        },
        getData:function(){

            var self = this;
            var intervalTime=1000*2 ;
            this.setValue(this.val);
            this.val=fish.random(this.val,this.val+3000);
            setTimeout(function() {
                self.getData();
            }, intervalTime);
        },
        setValue:function(val){
           var text=this.prefixInteger(val,this.attrs.digits);
           for(var i=0;i<text.length;i++){
               var num = text.charAt(i);
               this.digits[i].num.attr({"text":num});
           }
        },
        prefixInteger:function(val,length){
          return (Array(length).join('0') + val).slice(-length);
        },
        createdigit:function(index,x,y){
             var paper =this.paper;
             var item ={};
             var w=60;
             var h=w+10;
             var space=10;
             item.x = x+(index*(w+space));
             item.y = y
             item.w=w;
             item.h=h;
             item.set =paper.set();
             item.bgRect=paper.rect(item.x,item.y,w,h).attr({'fill':'#006699','stroke-width':0});
             var num_x=item.x+w/2;
             var num_y=item.y+h/2;

             item.num=paper.text(num_x,num_y,"0").attr({
                 'fill': '#fde148',
                 'font-size': 42,
                 'font-family': '微软雅黑',
                 'font-weight': 'bold'
             });
             item.set.push(item.num);
             item.set.push(item.bgRect);
             return item;

        },
        initLocation: function() {
            this.ft.attrs.translate.x = 20;
            this.ft.attrs.translate.y = 30;
        },
        setTitle: function(text) {
            this.doms['title'].attr({
                'text': text
            });
            this.attrs.title = text;
        },
        setTitleColor: function(color) {
            this.doms['title'].attr({
                'fill': "" + color
            });
            console.log("" + color)
            this.attrs.titleColor = "" + color;
        },

        getTitle: function() {
            return this.attrs.title;
        },
        getTitleColor: function() {
            return this.attrs.titleColor;
        },

        addEvent: function() {
                var self = this;
            // TODO:配置删除(node)
            this.doms['remove'].click(function(e) {
                fish.confirm('确认是否删除该组件').result.then(function() {
                    self.remove();
                });
                e.stopImmediatePropagation();
            })
            if(!this.doms['config'])return;

            // TODO:配置属性(node)
            this.doms['config'].click(function(e) {
                var view = new View(self);
                view.render();
                var $panel = $('.configPanel');
                $panel.html(view.$el.html());
                view.afterRender();
                e.stopImmediatePropagation();
            });


        }

    })

    return GNumsBar;


})