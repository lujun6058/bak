define([
    "i18n!oss_core/pm/screendesigner/i18n/SDesinger",
    "oss_core/pm/screendesigner/js/graphLibs/views/dbConfigTree/DBConfigTreeView",
    "text!oss_core/pm/screendesigner/js/graphLibs/views/GAnnularView.html",
    "oss_core/pm/screendesigner/jsoneditor/jsoneditor.min",
    "oss_core/pm/screendesigner/js/graphLibs/views/ViewUtils"
], function(i18nData,DBConfigTreeView,tpl,JSONEditor,ViewUtils) {

    return portal.CommonView.extend({
        className: "ui-dialog dialog",
        template: fish.compile(tpl),
        resource : fish.extend({}, i18nData),
        initialize: function(g) {
            this.g = g;
        },
        render: function() {
            this.$el.html(this.template(this.resource));
            return this;
        },
        jsonEditor:function($parent){
            var self =this;
            var $editor_content = $parent.find("#json-editor");
            $editor_content.css({
                'height': "600px"
            });
            self.editor = new JSONEditor($editor_content[0], {
                'mode': 'code'
            });
            var json = {
                xAxis: {
                    data: this.g.getXAxisNames()
                },
                series: {
                    data: this.g.getSeriesData()
                }
            }
            self.editor.set(json);
            $editor_content.find(".jsoneditor-menu").remove();
            $parent.find(".btn-sure")
                   .off('click')
                   .on('click', function() {
                     var json = self.editor.get();
                     if(json.xAxis.data && json.series.data){
                        //set datas
                        self.g.setXAxisNames(json.xAxis.data)
                        self.g.setSeriesData(json.series.data)
                        self.g.redraw();
                     }
                   });

        },


        afterRender: function() {

            var self = this;
            var $parent =$("#tabs");
            $parent.tabs(); //Tab页
            var dbCofnfigTreeView = new DBConfigTreeView({'el': '.dbCofnfigTree','g': self.g}).render().afterRender()
            //self.jsonEditor($parent);


            $parent.find('.labelSelect').off('change')
                   .val(self.g.attrs.labelStyle)
                   .on('change',function(){
                       var val =$(this).val();
                       self.g.attrs.labelStyle=val;
                       self.g.redraw();
                   })

            $parent.find('.switchGrid').attr('checked',self.g.attrs.bgShow)
                   .off('change')
                   .on('change',function() {
                       var checked=$(this).is(':checked')
                       self.g.attrs.bgShow=checked;
                       self.g.redraw();
                   })

            var $title =$parent.find('.g_titile');
            $title.val(this.g.attrs.title);
            $title.off('change');
            $title.on('change',function(){
                  self.g.setTitle($(this).val());
            })

            var title_colorpicker = $parent.find(".gtext_colorpicker").colorpicker();
            title_colorpicker.colorpicker("set", self.g.attrs.titleColor);
            title_colorpicker.on("move.colorpicker", function(e, color) {
                self.g.attrs.titleColor=""+color;
                self.g.redraw();
            })

            var gtext_colorpicker_label = $parent.find(".gtext_colorpicker_label").colorpicker();
            gtext_colorpicker_label.colorpicker("set", self.g.attrs.boradColor);
            gtext_colorpicker_label.on("move.colorpicker", function(e, color) {
                self.g.attrs.boradColor=""+color;
                self.g.redraw();
            })

            ViewUtils.sliderTooltip('#slider2', self.g.attrs.ww, 532, 1080, 1, function(value) {
                $('#slider2_input').val(value);
                if(self.g.attrs.ww==value) return;
                self.g.attrs.ww=value;
                self.g.redraw();
            });
            ViewUtils.sliderTooltip('#slider3', self.g.attrs.hh, 377, 1080, 1, function(value) {
                $('#slider3_input').val(value);
                if(self.g.attrs.hh==value) return;
                self.g.attrs.hh=value;
                self.g.redraw();
            });


        }


    })
});
