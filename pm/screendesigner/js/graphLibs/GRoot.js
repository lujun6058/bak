define([], function() {
    var GRoot = Class.extend({
        init: function(option) {
            this.id = option.id;
            this.canvas = option.canvas;
            this.paper = option.paper;
            this.attrs = option.attrs;
            this.domsSet = this.paper.set();
            this.doms = {};
            this.ft = null;
            this.initAll();
        },
        initAll: function() {

            this.initElement();
            this.merge();
            this.createFt();
            this.hide();
            this.addEvent();


            // TODO: 优化SVN
            if (this.canvas.perview) {

                this.getData(); //在预览情况下，才有动画和通过间隔来获取数据
                this.perview();
            }else{
                this.addBoxEvent();
            }


        },
        addBoxEvent: function() {
            var self = this;
            if (this.doms['config']){
                this.doms['config'].attr({"opacity":0});
            }
            if (this.doms['remove']){
                this.doms['remove'].attr({"opacity":0});
            }

            this.gbox.hover(function() {
                this.attr({
                    'fill-opacity': 0.3 ,
                    'cursor':'pointer',
                })

            }, function() {
                this.attr({
                    'fill-opacity': 0,
                    'stroke-width':0
                })
            })
            this.gbox.click(function(e) {
                if (self.doms['config']) {
                    self.doms['config'].trigger('click', e);
                }
                if(self.canvas.ft){
                    self.canvas.ft.setOpts( {draw: [''] });
                    self.canvas.ft.apply();
                   if(self.canvas.CompontentRemove){
                      self.canvas.CompontentRemove.attr({'opacity':0});
                   }
                }
                self.canvas.ft=self.ft;
                if(self.doms['remove']){
                self.canvas.CompontentRemove=self.doms['remove'];
                self.canvas.CompontentRemove.attr({'opacity':1,'cursor':'pointer'});
                self.canvas.CompontentRemove.toFront();
                }
                self.canvas.ft.setOpts( {draw: ['bbox'] });
                self.canvas.ft.apply();
                e.stopImmediatePropagation();
            })
        },
        getData: function() {
            console.log('GROOT getData ');
        },
        perview: function() {
            if (this.canvas.perview) {
                this.ft.unplug();
                if (this.doms['config']) this.doms['config'].remove();
                if (this.doms['remove']) this.doms['remove'].remove();

            }
        },
        move: function() {

        },
        ftcallBack:function(subject,events){
            var self =this;
         var eve= events.join(', ').trim();
          if ('drag start'==eve){

          }
          if('drag end'==eve){

          }
        },
        createFt: function() {
            var self = this;

        if (!this.canvas.perview) {
            var gbbox = this.domsSet.getBBox(true);
            this.gbox = this.paper.rect(gbbox.x, gbbox.y, gbbox.width, gbbox.height).attr({
                'fill': '#36b0c8',
                'fill-opacity': 0,
                'stroke-width':0
            })
        }
            this.domsSet.push(this.gbox);

                this.ft = this.paper.freeTransform(this.domsSet, {
                    keepRatio: true,
                    'rotate': false,
                    attrs: {
                        'fill': '#1dd7fc',
                        'stroke': '#1dd7fc'
                    },
                    scale: ['bboxCorners', 'bboxSides'],
                    draw: []
                }, function(subject, events) {
                   self.ftcallBack(subject,events)
               });

            if (this.attrs.ft_attrs) {
                this.attrs.ft_attrs.center.x = this.ft.attrs.center.x
                this.attrs.ft_attrs.center.y = this.ft.attrs.center.y
                this.attrs.ft_attrs.size.x = this.ft.attrs.size.x
                this.attrs.ft_attrs.size.y = this.ft.attrs.size.y
                this.ft.attrs = this.attrs.ft_attrs;
            } else {
                this.initLocation();
            }
            this.ft.apply();


        },
        initLocation: function() {},
        merge: function() {
            var self = this;
            fish.each(this.doms, function(dom,index) {
                self.domsSet.push(dom)
            })
        },
        show: function() {

            this.domsSet.show();

        },
        hide: function() {

            this.domsSet.hide();

        },
        redraw:function(){
          this.domsSet.remove();
          this.doms = {};
          this.domsSet=this.paper.set();
          this.ft.unplug();
          this.ft=null;
          this.initAll();
          this.show();
        },
        remove: function() {
            this.domsSet.remove();
            this.ft.unplug();
            delete this.canvas.nodes[this.id];
        },
        setTitle: function(value) {
            if (!this.doms['title']) return;
            this.attrs.title = value;
            this.doms['title'].attr("text", value)
        },
        ConfigEffect:function(){
            if (TweenMax.isTweening(".configPanel")){
                console.log("configPanel is TWEENING")
                return
            };
            TweenMax.from(".configPanel", 1, {x:"200px"});

        },
        json: function() {
            var json = {}
            json.id = this.id;
            json.attrs = this.attrs;
            json.attrs.ft_attrs = this.ft.attrs;
            return json;
        }
    })
    return GRoot;
})
