define([
  "oss_core/kdo/itnms/host/actions/HostAction",
  "text!oss_core/kdo/itnms/host/templates/HostView.html",
  "oss_core/kdo/itnms/host/components/kdoTree/kdoTree",
  "oss_core/kdo/itnms/host/components/views/HostListView.js",
  "css!oss_core/kdo/itnms/host/css/kdo.css",
  "css!oss_core/kdo/itnms/host/css/host.css"
], function(action, tpl, kdoTree, HostListView) {
  return portal.BaseView.extend({
    template: fish.compile(tpl),
    render: function() {
      this.$el.html(this.template());
    },
    initialize: function(options) {},
    initCss: function() {
      this.$el.parent().css({'padding': '0px'})
    },
    afterRender: function() {
      var self = this;
      this.initCss();
      this.loadData();

    },
    loadData: function() {
      var self = this;
      action.getCategoryTree().then(function(data) {
        self.LeftTree(data)
      })

      self.hostListViewInit();
      self.$el.find('.allHostShow').off('click').on('click',function(){
        self.hostListViewInit();
      })


    },
    hostListViewInit: function() {
      var self = this;
      var docH = $(document).height();
      var tableH=(docH-48-35-30-40-40)*0.92;
      action.getAllGroup().then(function(data){
        var groups = fish.map(data.result,function(d){
          return {
             'groupid': d.groupid,
             'name':d.name
          }
         })
        if(self.hostListView)self.hostListView.remove();
        self.hostListView = new HostListView({
           el: self.$el.find('.kdo_cotent'),
          'tableH':tableH,
          'groups':groups
        })
        self.hostListView.render();
      });
    },
    LeftTree: function(data) {

      var self = this;
      var kTree = new kdoTree({
        'el': self.$el.find('.tree-content'),
        'data': data,
        'rootId': 'R',
        'callback': function(id) {
          self.loadHostByCateoryId(id);
        }
      });
      kTree.render();
    },
    loadHostByCateoryId: function(id) {
      var self = this;
      var docH = $(document).height();
      var tableH=(docH-48-35-30-40-40)*0.92;
      action.getGroupidsBySubNo(id).then(function(datas){
         var groups =fish.map(datas,function(d){
           return {
              'groupid': d.groupid,
              'name':d.name
           }
          })//end of maps
          if(self.hostListView){self.hostListView.remove();}
          self.hostListView = new HostListView({
               el: self.$el.find('.kdo_cotent'),
              'tableH':tableH,
              'groups':groups
            })
         self.hostListView.render();
      })
    }
  }); //end of BaseView
});
