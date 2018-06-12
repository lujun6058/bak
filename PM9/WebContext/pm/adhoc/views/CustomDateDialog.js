/**
 *
 */
define([
		'text!oss_core/pm/adhoc/templates/CustomDateDialog.html',
		'i18n!oss_core/pm/adhocdesigner/i18n/adhoc'
	],
	function(RuleMgrView, i18nData) {
	return portal.CommonView.extend({
            	 
		className : "ui-dialog dialog",

		resource: fish.extend({}, i18nData),
		//加载模板
		template: fish.compile(RuleMgrView),

		events : {
			"click #btn-slm-slimgr-ok" : "fnOK",
			"click #btn-slm-slimgr-cancel" : "fnCancel"
		},

		initialize: function(inParam) {
			this.btime = inParam.btime;
			this.etime = inParam.etime;
 			this.render();
		},

		render: function() {
			this.$el.html(this.template(this.resource));
			this.$el.appendTo('body');
			return this;
		},

		contentReady: function () {
			this.$form = this.$('#ad-custome-date-form');
			this.$("#ad-btime").datetimepicker("value", this.btime);
			this.$("#ad-etime").datetimepicker("value", this.etime);
		},

		fnCancel: function() {
			this.trigger('cancelEvent');
		},

		fnOK: function() {
			if (!this.$form.isValid()) {
				return;
			}
			var btime = this.$("#ad-btime").val();
			var etime = this.$("#ad-etime").val();
			if(btime>etime){
				fish.toast('info', this.resource.ETIME_CANOT_EARLIERTHAN_BTIME);
				return;
			}
			var formatObj = {};
			formatObj.btime = btime;
			formatObj.etime = etime;
			this.trigger("okEvent", formatObj);
		},

		resize: function() {
			return this;
		}
	});
});