
define([
  "oss_core/pm/screendesigner/views/ServerTimeView",
  "i18n!oss_core/pm/screendesigner/i18n/SDesinger",
    "oss_core/pm/screendesigner/js/graphLibs/views/dbConfigTree/DBConfigTreeView",
  "text!oss_core/pm/screendesigner/js/graphLibs/views/GPieBaseConfig.html",
    "oss_core/pm/screendesigner/jsoneditor/jsoneditor.min",
    "oss_core/pm/screendesigner/js/colorpicker/fish.colorpicker"
], function(STView,i18nData,DBConfigTreeView,tpl, JSONEditor) {
    return portal.CommonView.extend({
        className: "ui-dialog dialog",
        template: fish.compile(tpl),
          resource : fish.extend({}, i18nData),
        initialize: function(gText) {
            this.gText = gText;
        },
        render: function() {
            this.$el.html(this.template(this.resource));
            return this;
        },

        gtext_title: function(target) {
            this.gText.setTitle(target.val());
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
                    data: self.gText.getXAxisData()
                },
                series: {
                    data: self.gText.getSeriesData()
                }
            }
            self.editor.set(json);
            $editor_content.find(".jsoneditor-menu").remove();
            $parent.find(".btn-sure")
                   .off('click')
                   .on('click', function() {
                     var json = self.editor.get();
                     if(json.xAxis.data && json.series.data){
                            self.gText.setXAxisData(json.xAxis.data);
                            self.gText.setSeriesData(json.series.data);
                            self.gText.redraw();
                     }
                   });

        },
        afterRender: function() {
            var self = this;
            $("#tabs").tabs(); //Tab页
            var $parent = $("#tabs");
            var dbCofnfigTreeView = new DBConfigTreeView({'el': '.dbCofnfigTree','g': self.gText}).render().afterRender()
            //self.jsonEditor($parent);
            $parent.find('.labelSelect').off('change')
                   .val(self.gText.attrs.labelStyle)
                   .on('change',function() {
                       var val=$(this).val()
                       self.gText.attrs.labelStyle=val;
                       self.gText.redraw()
                   });
            $parent.find('.gtext_title').on('change', function() {
                self.gtext_title($(this));
            })
            $parent.find('.gtext_title').val(this.gText.getTitle());
            var title_colorpicker = $parent.find(".gtext_colorpicker").colorpicker();
            title_colorpicker.colorpicker("set", self.gText.attrs.labelColor);
            title_colorpicker.on("move.colorpicker", function(e, color) {
                 self.gText.attrs.labelColor=""+color;
                 self.gText.redraw()
            })

            $parent.find('.pieColors').val(self.gText.attrs.colors.join(",")).on('change', function() {
                var value =$(this).val()
                var colors=['#1c7099','#1790cf','#1bb2d8','#99d2dd','#88b0bb'];
                if(value.length>0){
                 colors=value.split(",")
               }else{
                  $(this).val(colors.join(','));
               }
                self.gText.attrs.colors=colors
                self.gText.redraw()
            })
            var stView=new STView({"el":$("#bg_stView"),'g':this.gText,'isNeedSwitch':true}).render();


            return this;
        }


    })
});