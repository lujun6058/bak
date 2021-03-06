define([
  'i18n!oss_core/itnms/maintenance/i18n/maintenance',
  "oss_core/itnms/maintenance/actions/MainAction", "text!oss_core/itnms/maintenance/components/views/mainLisView.html", "text!oss_core/itnms/maintenance/components/views/mainOp.html",
  "oss_core/itnms/maintenance/components/views/AddMainDialog",
], function(i18nData,action, tpl, hostOp,AddMainDialog) {
  var MainListView = function(option) {
    this.option = option;
    this.$el = $(this.option.el);
    this.option._groudids = [];
    this.option._filterParam = {
      name: '',
      state: 'Any'
    };
    this.tpl = fish.compile(tpl);
    this.hostOp = fish.compile(hostOp);

  }
  MainListView.prototype.render = function() {
    this.remove();
    if (this.option.groups.length > 1) {
      this.option.groups.splice(0, 0, {
        name: i18nData.ALL,
        groupid: "myALL"
      });
    }
    var $el = $(this.option.el);
    $el.html(this.tpl(i18nData));
    this.afterRender()
  }
  MainListView.prototype.remove = function() {
    if (this.$gird) {
      this.$gird.remove();
    }
    $(this.option.el).html("");
  }
  MainListView.prototype.afterRender = function() {
    var self = this;
    var $el = $(this.option.el);
    self.mainStateLiAction(this.option._filterParam.state);
    self.createListTable();
    self.createFilterEvent();
    self.addMaintencae();
  }
  MainListView.prototype.addMaintencae=function() {
    var self = this;
    this.$el.find('.addMainPerio').off('click').on('click',function() {
      var tom = new Date();
      tom.setTime(tom.getTime()+24*60*60*1000);
      self.showAddMainDialog({
        description:'',
        maintenance_type:"0",
        groups:[],
        hosts:[],
        active_since:(new Date().getTime()/1000),
        active_till:(tom.getTime()/1000),
        name:"",
        timeperiods:[],
        maintenanceid:'none',
      });
    });
  },
  MainListView.prototype.showAddMainDialog=function(mainObj) {
    var self =this;
    var $el =this.$el;
      action.getCategoryTree().then(function(data) {
        data.splice(0, 0, {
          name: 'ALL',
          id: "R",
        });
        action.getParamValue('SCHEDULT_PATTEN').then(function(scheduleP){
           var options = {
             height: $el.height(),
             width: ($el.width()/1.8),
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
           var addMainDialog = new AddMainDialog();
           mainObj.groups= fish.map(mainObj.groups,function(d) {
             return {
                  'value':d.groupid,
                  'name':d.name
             }
           });
           mainObj.hosts = fish.map(mainObj.hosts,function(d){
              return {
                'value': d.hostid,
                'name':d.name
              }
           });
           var props={
             'mainObj':mainObj,
             "catatlog":data,
             'sp':fish.indexBy(scheduleP['SCHEDULT_PATTEN'],"paraName")
           };
           addMainDialog.popup(options,props, function(param) {
             self.option._filterParam = {
               name: '',
               state: 'Any'
             };
             self.render();
           });

        })


      });


  },
  MainListView.prototype.createFilterEvent = function() {
    var self = this;
    this.$el.find('.mainSearch').off('click').on('click', function() {
      self.option._filterParam.name = self.$el.find('.mainSearchText').val();
      self.loadData();
    })
    this.$el.find('.mainStateLi').off('click').on('click', function() {
      var state = $(this).data('state');
      self.mainStateLiAction(state);
      self.loadData();
    })

  }
  MainListView.prototype.mainStateLiAction = function(state) {
    this.$el.find('.mainStateLi').find('i').hide();
    this.$el.find('.mainStateLi[data-state="' + state + '"]').find('i').show();
    this.option._filterParam.state = state;

  }
  MainListView.prototype.createListTable = function() {
    var self = this;
    var $el = $(this.option.el);
    var tableH = this.option.tableH;
    var $area = $el.find('.filterArea');
    var $comboboxGrupids = $el.find('.comboboxGrupids').combobox({editable: false, dataTextField: 'name', dataValueField: 'groupid', dataSource: self.option.groups});
    var groupid = "gid_none";
    $area.hide();
    if (self.option.groups.length > 0) {
      groupid = self.option.groups[0].groupid;
      $area.show();
    }

    $comboboxGrupids.combobox('value', groupid);
    $comboboxGrupids.on('combobox:change', function() {
      var d = $comboboxGrupids.combobox('getSelectedItem')
      self.loadTableData(d.groupid);
    });

    var mydata = [];
    var opt = {
      data: mydata,
      height: tableH,
      pager: true,
      multiselect: true,
      colModel: [
        {
          name: 'name',
          label: i18nData.NAME,
          align: 'center'
        }, {
          name: 'maintenance_type',
          label: i18nData.TYPE,
          align: 'center',
          formatter: function(cellval, opts, rwdat, _act) {
            var value = cellval + "";
            if (value == "0") {
              return i18nData.WITH_DATA_COLLECTION
            } else {
              return i18nData.WITHOUT_DATA_COLLECTION
            }
          }
        }, {
          name: 'active_since',
          label: i18nData.ACTIVE_SINCE,
          align: 'center',
          formatter: function(cellval, opts, rwdat, _act) {
            return self.timetrans(Number(cellval));
          }
        }, {
          name: 'active_till',
          label: i18nData.ACTIVE_TILL,
          align: 'center',
          formatter: function(cellval, opts, rwdat, _act) {
            return self.timetrans(Number(cellval));
          }
        }, {
          name: 'state',
          align: "center",
          label: i18nData.STATE,
          formatter: function(cellval, opts, rwdat, _act) {
            var name = "";
            var className = "";
            if (cellval == "EXPIRED") {
              name =i18nData.EXPIRED
              className = "EXPIRED"
            } else if (cellval == "APPROACH") {
              name =i18nData.APPROACHING
              className = "APPROACH"
            } else {
              name =i18nData.ACTIVE
              className = "ACTIVE"
            }
            return "<span class='main-" + className + "'>" + name + "</span>";
          }
        }, {
          name: 'description',
          label: i18nData.DESCRIPTION,
        }, {
          name: 'maintenanceid',
          label: '',
          align: "center",
          'title': false,
          formatter: function(cellval, opts, rwdat, _act) {
            return self.hostOp({'id': cellval});
          }
        }

      ]
    };

    this.$gird = $el.find('.mainListGrid').grid(opt);
    this.$gird.on('click', '.deleteMain', function() {
      var selrow = self.$gird.grid("getSelection");
      var id = selrow.maintenanceid;

      fish.confirm(i18nData.DELETE_SELECTED_MAINTENANCE_PERIODS)
          .result.then(function() {
          action.deleteByIds({ids: [id]}).then(function(data) {
          if (data.error) {
            fish.toast('warn', 'delete error');
          } else {
            fish.toast('success', 'success')
            self.$gird.grid("delRowData", selrow); //删除记录
          }
        })
      });
    })
    this.$gird.on('click','.updateMain',function(){
        var selrow = self.$gird.grid("getSelection");
        var id = selrow.maintenanceid;
        action.getMaintenanceById(id).then(function(data){
          self.showAddMainDialog(data.result[0])
        })
    })
    this.$gird.on('change', '[type="checkbox"]', function() {
      var selrow = self.$gird.grid("getCheckRows");
      if (selrow.length > 0) {
        self.$el.find('.mainListBtn').show();
      } else {
        self.$el.find('.mainListBtn').hide();
      }
    })
    this.$el.find('.delMain').off('click').on('click', function() {
      fish.confirm(i18nData.DELETE_SELECTED_MAINTENANCE_PERIODS)
          .result
          .then(function() {
            var selrow = self.$gird.grid("getCheckRows");
            var ids = fish.map(selrow, function(d) {
              return d.maintenanceid+"";
            })
            action.deleteByIds({
              "ids":ids
            }).then(function(data) {
              if (data.error) {
                fish.toast('warn', 'delete error');
              } else {
                fish.toast('success', 'success')
                fish.each(selrow, function(d) {
                  self.$gird.grid("delRowData", d); //删除记录
                })
              }
            })
      });
    })
    self.loadTableData(groupid);
  }
  MainListView.prototype.loadTableData = function(groupid) {
    if (groupid == 'gis_none')
      return;
    var self = this;
    var groudids = [];
    if (groupid == 'myALL') {
      groudids = null
      if(this.option.bisId){
        var fiters = fish.filter(this.option.groups, function(d) {
          if (d.groupid != 'myALL') {
            return true;
          }
        });
        groudids = fish.map(fiters, function(d) {
          return d.groupid
        });
     }
    } else {
      groudids.push(groupid);
    }
    this.option._groudids = groudids;
    self.loadData();
  }
  MainListView.prototype.loadData = function() {
    var self = this;
    var opt = {};
    opt.ids = self.option._groudids;
    opt.sName = self.option._filterParam.name;
    opt.state = self.option._filterParam.state;
    action.getAllMainByGroupids(opt).then(function(data) {
      self.reloadData(data);
    })
  }
  MainListView.prototype.reloadData = function(data) {
    var self = this;
    if (data.error)
      data.result = [];
    self.$gird.grid("reloadData", data.result);
  }
  MainListView.prototype.timetrans = function(tt) {
    var date = new Date(tt * 1000); //php time为10位需要乘1000
    var Y = date.getFullYear() + '-';
    var M = (
      date.getMonth() + 1 < 10
      ? '0' + (
      date.getMonth() + 1)
      : date.getMonth() + 1) + '-';
    var D = (
      date.getDate() < 10
      ? '0' + (
      date.getDate())
      : date.getDate()) + ' ';
    var h = (
      date.getHours() < 10
      ? '0' + date.getHours()
      : date.getHours()) + ':';
    var m = (
      date.getMinutes() < 10
      ? '0' + date.getMinutes()
      : date.getMinutes()) + ':';
    var s = (
      date.getSeconds() < 10
      ? '0' + date.getSeconds()
      : date.getSeconds());
    return Y + M + D + h + m + s;
  }
  return MainListView;

})
