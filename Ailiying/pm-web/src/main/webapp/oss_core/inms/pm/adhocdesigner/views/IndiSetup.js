/**
 *
 */
define([
		'text!oss_core/inms/pm/adhocdesigner/templates/IndiSetUp.html',
		'i18n!oss_core/inms/pm/adhocdesigner/i18n/adhoc'
	],
	function(RuleMgrView, i18nData) {
	return fish.View.extend({

		className : "ui-dialog dialog",

		resource: fish.extend({}, i18nData),
		//加载模板
		template: fish.compile(RuleMgrView),

		events : {
			"click #ad-indisetup-number" : "showAsNumber",
			"click #ad-indisetup-percent" : "showAsPercent",
			"click #btn-slm-slimgr-ok" : "fnOK",
			"click #btn-slm-slimgr-cancel" : "fnCancel"
		},

		initialize: function(inParam) {
			this.tagAlias = inParam.tagAlias;
			this.tagDesc = inParam.tagDesc;
			this.isThousandDisplay = inParam.isThousandDisplay;
			this.precision = inParam.precision;
			this.displayType = inParam.displayType;// 0显示为数值 1显示为百分比
			this.showUnit = inParam.showUnit;// 显示指标+单位
			this.calculateFormat = inParam.calculateFormat;// 计算公式
			this.agType = inParam.agType;
			this.sortType = inParam.sortType;
			this.render();
		},

		render: function() {
			this.$el.html(this.template(this.resource));
			this.$el.appendTo('body');
			return this;
		},

		afterRender: function () {
			this.$("#ad-indisetup-alias").val(this.tagAlias);
			this.$("#ad-indisetup-format").text(this.calculateFormat);
			this.$("#ad-indisetup-desc").text(this.tagDesc);
			if(this.displayType==0) {// 显示为数值
				this.$('#ad-indisetup-number').attr("checked", "checked");
				this.$("#ad-indisetup-number-preci").val(this.precision);
				if(this.isThousandDisplay=="true" || (this.isThousandDisplay!="false" && this.isThousandDisplay)) {
					this.$('#ad-indisetup-thousands-chk').attr("checked", "checked");
				}
				this.showAsNumber();
			}else if(this.displayType==1) {
				this.$('#ad-indisetup-percent').attr("checked", "checked");
				this.$("#ad-indisetup-number-preci").val(this.precision);
				this.showAsPercent();
			}
			if(this.showUnit=="true" || (this.showUnit!="false" && this.showUnit)) {
				this.$('#ad-indisetup-unit').attr("checked", "checked");
			}
		},

		showAsNumber: function() {
			this.$('#ad-indisetup-number').attr("checked","checked");
			this.$('#ad-indisetup-percent').removeAttr("checked");
			this.$('#ad-indisetup-chk').show();
		},

		showAsPercent: function() {
			this.$('#ad-indisetup-percent').attr("checked","checked");
			this.$('#ad-indisetup-number').removeAttr("checked");
			this.$('#ad-indisetup-chk').hide();
		},

		fnCancel: function() {
			this.trigger('cancelEvent');
		},

		fnOK: function() {
			var formatObj = {};
			formatObj.tagAlias = this.$("#ad-indisetup-alias").val();
			formatObj.tagDesc = this.$("#ad-indisetup-desc").val();
			if(this.$('#ad-indisetup-number').attr("checked")){
				// 显示为数值
				formatObj.displayType = 0;
				formatObj.precision = this.$('#ad-indisetup-number-preci').val();
				formatObj.isThousandDisplay = this.$('#ad-indisetup-thousands-chk').is(':checked');
			}else if(this.$('#ad-indisetup-percent').attr("checked")){
				// 显示为百分比
				formatObj.displayType = 1;
				formatObj.precision = this.$('#ad-indisetup-number-preci').val();
				formatObj.isThousandDisplay = false;
			}
			formatObj.showUnit = this.$('#ad-indisetup-unit').is(':checked');
			formatObj.calculateFormat = this.$('#ad-indisetup-format').val();
			formatObj.agType = this.agType;
			formatObj.sortType = this.sortType;
			this.trigger("okEvent", formatObj);
		},

		resize: function() {
			return this;
		}
	});
});
