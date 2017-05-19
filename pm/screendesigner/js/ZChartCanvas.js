define([
    "oss_core/pm/screendesigner/js/raphael-min",
    "oss_core/pm/screendesigner/js/raphael.free_transform",
    "oss_core/pm/screendesigner/js/raphael-chartsNumber",
    "oss_core/pm/screendesigner/js/class",

], function() {
    var TypeMapping = {
        'rect': "oss_core/pm/screendesigner/js/graphLibs/GRect",
        'text': "oss_core/pm/screendesigner/js/graphLibs/GText",
        'bar': "oss_core/pm/screendesigner/js/graphLibs/GBar",
    };
    var uuid = function() {
        var s = [];
        var hexDigits = "0123456789abcdef";
        for (var i = 0; i < 36; i++) {
            s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
        }
        s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
        s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
        s[8] = s[13] = s[18] = s[23] = "";
        var uuid = s.join("");
        return uuid;
    }
    var ZChartCanvas = Class.extend({
        init: function(option) {
            var self = this;
            self.w =option.attrs.w;
            self.h =option.attrs.h;
            self.dom = option.dom;
            self.perview = option.perview || false;
            self.paper = Raphael(self.dom);
            self.setViewBox(self.w, self.h)

            if (option.attrs.bk_attrs) {
                self.setBK(option.attrs.bk_attrs)
            }
            self.nodes = [];
            fish.each(option.nodes, function(node_config) {
                self.addNode(node_config, function() {})
            })
        },
        setBK: function(attrs) {
            var self = this;
            self.bk_attrs = attrs;
            $(self.dom).css(attrs)
        },
        setViewBox: function(w, h) {
            var self = this;
            self.w = w;
            self.h = h;

            self.paper.setViewBox(0, 0, self.w, self.h, true);
            self.paper.setSize('100%', '100%');
            if (self.perview == false) {
                self.createGrid();
                // TODO: IE浏览下需要自己控制窗口比列的高度(done)
                if (fish.isIE) {
                    var d_w = $(self.dom).width();
                    var sf = d_w / w;
                    var h = sf * self.h;
                    var old = $(self.dom).height();
                    $(self.dom).height(h)
                }
            }

        },
        // TODO: 创建网络(done)
        createGrid: function() {
            var self = this;
            var w = self.w;
            var h = self.h;
            self.removeGrid();
            self.girdSet = self.paper.set();
            //console.log(self.getGridOpacity());
            for (var x = 0.5; x < w; x += self.getGridXNums()) {
                var x_rect = self.paper.rect(x, 0, 0.2, h).attr({
                    'fill': '#dfdfdf',
                    'stroke': '#dfdfdf',
                    'opacity': self.getGridOpacity()
                }).toBack();
                self.girdSet.push(x_rect)
            }

            for (var y = 0.5; y < h; y += self.getGridYNums()) {
                var y_rect = self.paper.rect(0, y, w, 0.2).attr({
                    'fill': '#dfdfdf',
                    'stroke': '#dfdfdf',
                    'opacity': self.getGridOpacity()
                }).toBack();
                self.girdSet.push(y_rect)
            }

        },
        // TODO: 删除网格(done)
        removeGrid: function() {
            var self = this;
            if (self.girdSet) {
                self.girdSet.remove();
            }
        },
        //TODO 设置网络的X数(done)
        setGridXNums: function(value) {
            var self = this;
            self.gridxnums = value;
            self.createGrid();
        },
        getGridXNums: function() {
            var self = this;
            return self.gridxnums || 16;
        },
        //TODO 设置网络的y数(done)
        setGridYNums: function(value) {
            var self = this;
            self.gridynums = value;
            self.createGrid();
        },
        getGridYNums: function() {
            var self = this;
            return self.gridynums || 16;
        },
        //TODO:设置网格透明度(done)
        setGridOpacity: function(value) {
            var self = this;
            self.gridOpacity = value;
            if (self.girdSet) {
                self.girdSet.attr({
                    opacity: value
                })
            }
        },
        //TODO:风格设计
        setStyle: function(i, attrs) {
            var self = this;
            this.style = i;
            self.setBK(attrs);
        },
        getGridOpacity: function() {
            var self = this;
            return self.gridOpacity || 0;
        },
        addNode: function(node_config, fun) {
            var self = this;
            var type = TypeMapping[node_config.attrs.type];

            require([type], function(Node) {

                var node = new Node({
                    'paper': self.paper,
                    'attrs': node_config.attrs,
                    'canvas': self
                });
                node.id = node_config.id || "";
                node.show();
                self.nodes.push(node);
                if (fun) fun();
            })

        },
        json: function() {
            var self = this;
            var json = {};
            // TODO:
            json.name='test';
            json.id="";
            json.imagePath="";
            json.isShare=0;
            json.state=0;
            json.userid=1;
            json.attrs={};
            json.attrs.w = self.w;
            json.attrs.h = self.h;
            json.attrs.bk_attrs = self.bk_attrs;
            json.nodes = [];
            fish.each(self.nodes, function(node) {
                json.nodes.push(node.json());
            })

            return json;

        }

    })
    return ZChartCanvas;
})
