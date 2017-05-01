var GYLineNode = GNode
		.extend({
			// 计算属性值
			update : function() {
				this.options.gx = this.options.w / 2;
				this.options.gy = this.options.h / 2;
			},
			// 画画
			draw : function() {
				var paper = this.elements.paper;
				this.createLine(paper,this.options.gx,0,this.options.h-10,"#1aebe8",1);
			},
			resize : function() {
				 this.initElement();
			},

			// 配置页面功能
			pageConfig : function($pageHtml) {
			},
		    createLine: function(paper,x,y,length,color,opacityvalue)
			{
			  paper.rect(x+5/2,y+5/2,0.5,length).attr({'fill':"none",'stroke':color,'stroke-width':1,'opacity':opacityvalue});
			  //paper.rect(x,y,5,5).attr({'fill':color,'stroke-width':0,'opacity':opacityvalue});
			 // paper.rect(x+length,y,5,5).attr({'fill':color,'stroke-width':0,'opacity':opacityvalue});

			}

		
		});