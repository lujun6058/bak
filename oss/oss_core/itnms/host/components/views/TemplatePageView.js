define([
  'i18n!oss_core/itnms/host/i18n/host',
  "oss_core/itnms/host/actions/HostAction",
  "text!oss_core/itnms/host/components/views/TemplatePageView.html",
  "text!oss_core/itnms/host/components/views/TemplateBtns.html",
  "oss_core/itnms/host/components/views/TemplateViewDialog.js"
], function(i18nData,action, tpl,tplbtns, Dialog) {
  var TemplatePageView = function(option) {
    this.option = option;
    this.$el = $(this.option.el);
    this.tpl = fish.compile(tpl);
    this.tplBtns=fish.compile(tplbtns);
    this.templatesClear=[];
  };
  TemplatePageView.prototype.render = function() {
    this.remove();
    this.$el.html(this.tpl(i18nData));
    this.afterRender();

  };
  TemplatePageView.prototype.remove = function() {
    this.$el.html("")
  }
  TemplatePageView.prototype.afterRender = function() {
    var self  =this;
    this.renderGird()
    this.renderAddTemplate();
    this.$el.find('.hostTemplateCancel').off('click').on('click',function(){
       self.option.cancel();
    })
    this.$el.find('.hostTemplateOK').off('click').on('click',function(){
      self.option.ok();
    })

  }
  TemplatePageView.prototype.getInfo = function(){
    var self =this;
      var result = {}
      result.templates=fish.map(self.getGridRows(),function(d){
         return {
           'templateid':d.value
         }
      });
      result.templates_clear=fish.map(this.templatesClear,function(d){
         return {
           'templateid':d.id
         }
      })
      if(result.templates_clear.length<=0){
        result.templates_clear=null;
      }
      return result;
  }
  TemplatePageView.prototype.renderGird = function() {
    var self  =this;
    var  templ_data=fish.map(this.option.templates,function(d){
       return {
          "name": d.name,
          "id":d.templateid,
          "isClear":true
       }
    })

    var opt = {
      data: templ_data,
      height: 230,
      colModel: [
        {
          name: 'name',
          label: '名称',
          align: 'center',
        }, {
          name: 'isClear',
          label: '',
          width: 50,
          'title': false,
          align: 'center',
          formatter: function(cellval, opts, rwdat, _act) {
            return self.tplBtns({'isClear':cellval})
          }
        }
      ]
    };
     this.$templateGrid=this.$el.find('.HostTemplateGrid').grid(opt);
     this.$el.find('.HostTemplateGrid').on('click', '.unlink', function() {
       var selrow = self.$templateGrid.grid("getSelection");
       self.$templateGrid.grid("delRowData", selrow);//删除记录
      }).on('click', '.unlinkClear', function() {
        var selrow = self.$templateGrid.grid("getSelection");
        self.addClearTemplate(selrow);
        self.$templateGrid.grid("delRowData", selrow);//删除记录
      })
  }
  TemplatePageView.prototype.addClearTemplate=function(selrow){
      var clearTemplate ={
         'id': selrow.id,
         'name':selrow.name,
         'isClear':true
      }
      this.templatesClear.push(clearTemplate)
  }
  TemplatePageView.prototype.getGridRows=function() {
     var rows=this.$el.find('.HostTemplateGrid').grid("getRowData")
     return fish.map(rows,function(d){
       return {
         "name":d.name,
         "value":d.id
       }
     });
  }

  TemplatePageView.prototype.dataToGrid=function(result) {
    var self =this ;
    fish.each(result,function(d){
      var isClear  = fish.findWhere(self.templatesClear,{name:d.name,'id':d.value,isClear:true})
      if(isClear){
        self.templatesClear = fish.filter(self.templatesClear,function(c){
        return !(d.value==c.id)
        })
      }
      var newData ={
        "name":d.name,
        "id":d.value,
        "isClear":isClear,
      }
      self.$el.find('.HostTemplateGrid').grid("addRowData",newData)
    })
  }
  TemplatePageView.prototype.renderAddTemplate = function() {
    var self = this;
    var $el = self.option.positionEL;
    this.$el.find('.addTemplate').off('click').on('click', function() {
      var filterTemplate=self.getGridRows();

      action.getCategoryTree().then(function(data) {
        data.splice(0, 0, {
          name: 'ALL',
          id: "R",
        });
        var options = {
          height: $el.height(),
          width: ($el.width() / 2),
          modal: true,
          draggable: false,
          autoResizable: false,
          position: {
            'of': $el,
            'my': "top",
            'at': "right" + " " + "top",
            collision: "fit"
          }
        };
        var dialog = new Dialog();

        dialog.popup(options, {"catatlog":data,
                               'filterData':filterTemplate,
                               'bisId':self.option.bisId
                              },
                                function(result) {
           self.dataToGrid(result);
        });
      }) // end of CategoryTree

    }); // end of click
  }

  return TemplatePageView;
});
