define([
  "oss_core/pm/screendesigner/views/ServerTimeView",
  "i18n!oss_core/pm/screendesigner/i18n/SDesinger",
  "oss_core/pm/screendesigner/js/graphLibs/views/dbConfigTree/DBConfigTreeView",
    "text!oss_core/pm/screendesigner/js/graphLibs/views/GIconBarConfig.html",
    "oss_core/pm/screendesigner/jsoneditor/jsoneditor.min",
    "oss_core/pm/screendesigner/js/colorpicker/fish.colorpicker"

], function(STView,i18nData,DBConfigTreeView,tpl,JSONEditor) {

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
                series: {
                    data: [self.gText.getVal()]
                }
            }
            self.editor.set(json);
            $editor_content.find(".jsoneditor-menu").remove();
            $parent.find(".btn-sure")
                   .off('click')
                   .on('click', function() {
                     var json = self.editor.get();
                     if(json.series.data){
                          self.gText.setVal(json.series.data[0]);
                          self.gText.redraw();
                     }
                   });

        },


        afterRender: function() {

            var self = this;
            $("#tabs").tabs(); //Tab页
            var dbCofnfigTreeView = new DBConfigTreeView({'el': '.dbCofnfigTree','g': self.gText}).render().afterRender()
            var $parent =$("#tabs");
          //  self.jsonEditor($parent);
            $parent.find('.gtext_title').on('change',function(){
                   self.gtext_title($(this));
            })
            $parent.find('.gtext_title').val(this.gText.getTitle());
            var title_colorpicker = $parent.find(".gtext_colorpicker").colorpicker();
            title_colorpicker.colorpicker("set", this.gText.getTitleColor());
            title_colorpicker.on("move.colorpicker", function(e, color) {
                self.gText.setTitleColor(color)
            })
            $(".GICON").off('click');
            $(".GICON").on('click',function(){
                 var icon =$(this).data('image');
                 self.gText.setIcon(icon);
            })
            var stView=new STView({"el":$("#bg_stView"),'g':this.gText,'isNeedSwitch':true}).render();


            return this;
        }


    })
});
