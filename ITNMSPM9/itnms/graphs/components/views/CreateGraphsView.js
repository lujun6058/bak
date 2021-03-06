define([
  "oss_core/itnms/graphs/components/views/PerviewGrpahView.js",
  "oss_core/itnms/graphs/components/graphstabs/GraphsTabsView.js",
  "oss_core/itnms/host/components/views/RootView.js",
  "oss_core/itnms/graphs/utils/util.js",
  "text!oss_core/itnms/graphs/components/views/CreateGraphsView.html"
], function(PerviewGrpahView,GraphsTabsView,RootView, util, tpl) {
  var evetMap = [
    {
      'el': '.graphsCancel',
      'type': 'click',
      'handel': 'cancel'
    }, {
      'el': '.graphsOK',
      'type': 'click',
      'handel': 'ok'
    }, {
      'el': '.kdo-dash-container',
      'type': 'click',
      'handel': 'selGraphType'
    },{
      'el':'.perview-iconBtn',
      'type':'click',
      'handel':'perview'
    }
  ]
  var CreateGraphsView = function(option) {
    RootView.call(this, option)
  }
  CreateGraphsView.prototype = Object.create(RootView.prototype);
  CreateGraphsView.prototype.constructor = CreateGraphsView;
  CreateGraphsView.prototype.initProp = function() {
    this.tpl = fish.compile(tpl);
    this.evetMap = evetMap;
  },
  CreateGraphsView.prototype.loadPage = function() {
    this.$el.html(this.tpl());
  },
  CreateGraphsView.prototype.afterRender = function() {
    this.initPage();

  },
  CreateGraphsView.prototype.initPage = function() {
    this.titlePosition = this.$el.find('.titlePosition').combobox({
      editable: false,
      dataTextField: 'name',
      dataValueField: 'value',
      dataSource: [
        {
          name: 'Center',
          value: '1'
        }, {
          name: 'Left',
          value: '2'
        }, {
          name: 'Right',
          value: '3'
        }
      ]
    });
    this.titlePosition.combobox('value', "1");
    util.kdoinputStyle(this.$el.find('.kdo-input-style'));
    this.selGraphType(this.$el.find('.kdo-dash-container')[0]);
    util.resizeH(this.$el.find('.createGraphsViewContext'))
  },
  CreateGraphsView.prototype.cancel = function() {
    util.doNotNull(this.option.cancel);
  },
  CreateGraphsView.prototype.ok = function() {
    util.doNotNull(this.option.ok);
  },
  CreateGraphsView.prototype.selGraphType = function(target) {
    var self = this;
    var $target = $(target);
    self.$el.find('.kdo-chart-sel').removeClass('kdo-chart-sel');
    $target.addClass('kdo-chart-sel');
    var type = $target.data('type');
    this.changeGTabs(type);
  },
  CreateGraphsView.prototype.changeGTabs = function(type) {

    this.graphsTabsView =new GraphsTabsView({
      el:this.$el.find('.graphs-tabs'),
      type:type,
    })
    this.graphsTabsView.render();
  }
  CreateGraphsView.prototype.perview=function() {
    var self =this;
    this.perviewGrpahView = new PerviewGrpahView({
      el:self.$el,
      callback:function(){
        self.render();
      }
    });
    this.perviewGrpahView.render();
  }
  return CreateGraphsView;
});
