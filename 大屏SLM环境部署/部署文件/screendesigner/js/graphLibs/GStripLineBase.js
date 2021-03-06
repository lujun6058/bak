define([
    "oss_core/pm/screendesigner/js/graphLibs/GRoot",
    "oss_core/pm/screendesigner/js/graphLibs/views/GStripLineBaseView"
], function(GRoot, View) {

    var GCharacter = GRoot.extend({
        initElement: function() {
            var self = this;
            var title = this.attrs.title || '文字名称';
            this.attrs.titleColor = this.attrs.titleColor || '#f9ffd0';
            this.attrs.axisColor=this.attrs.axisColor||'#11bde8';
            this.attrs.lineColor=this.attrs.lineColor||'#11bde8';
            this.attrs.dotColor=this.attrs.dotColor||'#11bde8';
            this.attrs.areaColor=this.attrs.areaColor||'#164e62';
            var paper =this.paper;
            this.attrs.xAxisNames=this.attrs.xAxisNames||this.createSeqNums(2008,10);
            this.attrs.xAxisDatas = this.attrs.xAxisDatas || this.createRandom(this.attrs.xAxisNames,10,90);
            this.attrs.dbServer = this.attrs.dbServer||{
                                                            'serverName':'码号销售年度指标',
                                                            'islocal':true,
                                                            'xAxis':['field_1'],
                                                            'yAxis':['field_2'],
                                                            'xNums':1,
                                                            'yNums':1,
                                                            'xMinNums':1,
                                                            'yMinNums':1
                                                        }

            var max = 1.1*fish.max(this.attrs.xAxisDatas);
            var n=this.attrs.xAxisNames.length;
            var items=[];
            var x=0;
            var y=0;
            var w=15;
            var h=140;
            var space_w=20;
            var r=5;

            this.doms['y_axis']=paper.rect(x,y,1,h).rotate(180,x,y).attr({'stroke':this.attrs.axisColor,'stroke-width':2});
           //var max=6000;
            var box_w=this.getBox(Math.floor(max)).width;
            var step=5;
            var step_num=Math.floor(max/(step-1));
            var step_h=h/(step-1);

            for(var i=0;i<step;i++){
               var step_y=-(step_h*i);
               var num=step_num*i
               this.doms['y_axis_num'+i]=paper.text(x,step_y,num).attr({
                   'fill':  this.attrs.titleColor,
                   'font-size': 12,
                   'font-family': '微软雅黑',
               });;
               var box=this.doms['y_axis_num'+i].getBBox();
               this.doms['y_axis_num'+i].attr({'x':x-box_w});
            }

            this.doms['x_axis']=paper.rect(x,y,(w+space_w)*n,1).attr({'stroke':this.attrs.axisColor,'stroke-width':2});


            for(var i=0;i<n;i++){
              var per=this.attrs.xAxisDatas[i]/max;

              var item  = this.createPointItem(i,x,y,w,h,space_w,r,per,this.attrs.xAxisNames[i]);
              items.push(item);
              this.doms['item'+i]=item.set;
            }
            var firstItem = items[0];
            var lastItem=items[items.length-1];
            var curve_path=['M',firstItem.x,firstItem.y];
            var bg_path=['M',x,y];

            curve_path.push('L');
            bg_path.push('L');
            bg_path.push(firstItem.x);
            bg_path.push(firstItem.y);
            for (var i=1;i<items.length;i++){
                var item=items[i];
                curve_path.push(item.x);
                curve_path.push(item.y);
                bg_path.push(item.x);
                bg_path.push(item.y);

            }
            bg_path.push(lastItem.x);
            bg_path.push(y);
            bg_path.push('z');

            var curve=paper.path(curve_path).attr({'stroke':this.attrs.lineColor,'stroke-width':1});
            var bgPath=paper.path(bg_path).attr({'fill':this.attrs.areaColor,'stroke-width':0,'opacity':0.4});
            this.doms['curve']=curve;
            this.doms['bgPath']=bgPath;







            this.doms['config'] = this.paper.text(100, -30, '配置').attr({
                'fill': 'red',
                'font-size': 18,
                'font-family': '微软雅黑',
                'font-weight': 'bold'
            });;
            this.doms['remove'] = this.paper.text(160, -30, 'X').attr({
                'fill': 'red',
                'font-size': 20,
                'font-family': '微软雅黑',
                'font-weight': 'bold'
            });;

        },
        getXAxisNames:function() {
           return this.attrs.xAxisNames;
        },
        setXAxisNames:function(datas) {
            this.attrs.xAxisNames=datas;
        },
        getXAxisDatas:function () {
            return this.attrs.xAxisDatas;
        },
        setXAxisDatas:function (datas) {
            this.attrs.xAxisDatas=datas;
        },
        getBox:function(val){

          var text=this.paper.text(0,0,val).attr({
              'fill': '#fff',
              'font-size': 12,
              'font-family': '微软雅黑',
          })
          var box=text.getBBox();
          text.remove();
          return box;
        },
        createPointItem:function(i,x,y,w,h,space_w,r,per,name){
          var self=this;
          var paper=this.paper;
          var item={};
          item.set=paper.set();
          item.x=x+(i*(w+space_w));
          item.y=y-(h*per);
          item.circle= paper.circle(item.x,item.y,r).attr({"stroke-width":0,'fill':this.attrs.dotColor});

          item.name=paper.text(item.x,y+15,name).attr({
              'fill': this.attrs.titleColor,
              'font-size': 12,
              'font-family': '微软雅黑',
          });
          item.set.push(item.name);
          item.set.push(item.circle);
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

        toGraph:function(choiceTreeJson) {
            var json={};
            json.xAxis={};
            json.xAxis.data=choiceTreeJson.xAxis[0].data;
            json.series={};
            json.series.data=fish.pluck(choiceTreeJson.yAxis,'data')[0];
            this.setXAxisNames(json.xAxis.data)
            this.setXAxisDatas(json.series.data)

        },

        addEvent: function() {
          if(!this.doms['config'])return;
            var self = this;
              var view = new View(self);
            // TODO:配置属性(node)
            this.doms['config'].click(function(e) {
                view.render();
                var $panel = $('.configPanel');
                $panel.html(view.$el.html());
                view.afterRender();
                self.ConfigEffect();
                e.stopImmediatePropagation();
            });
            // TODO:配置删除(node)
            this.doms['remove'].click(function(e) {
                fish.confirm(view.resource.ISDEL).result.then(function() {
                    self.remove();
                });
                e.stopImmediatePropagation();
            })

        }

    })

    return GCharacter;


})
