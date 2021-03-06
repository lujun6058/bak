# 代码中的数学

记录工作中和学习中数学在程序中来完成各种任务。

-------------------
[TOC]

## 介绍
我们将使用 Canvas,  来使 数学公式可视化。
更好理解数学在程序中完成任务的原理。


``` javascript
//得到Canvas Dom元素
var canvas  =document.getElementById("canvas");
// 得到 2D 画布
var ctx = canvas.getContext('2d');
// 设置 画布的大小
var width = canvas.width = 500;
var height =canvas.height = 500;
// 开始画

for (var i = 0 ; i <100; i++){
  //开始画新的图形
	ctx.beginPath();
  //移动到哪个点
	ctx.moveTo(Math.random()*width,Math.random()*height);
  //画一条线
  ctx.lineTo(Math.random()*width,Math.random()*height);
  //描线
  ctx.stroke();
}

```
## 三角函数
![1F431ED3-6830-4E13-B280-690E4331BDA5](/assets/1F431ED3-6830-4E13-B280-690E4331BDA5.png)
``` javascript
ctx.translate(0,height/2);
ctx.scale(1,-1);
var d = 78;
for (var i = 0 ; i<Math.PI*2 ; i+=0.01){
	var x = i*d;
	var y = Math.sin(i)*d
	ctx.fillRect(x,y,5,5);
}
````
## 三角函数周期
![1E6D96F5-5E08-4542-BB64-4412853E01E3](/assets/1E6D96F5-5E08-4542-BB64-4412853E01E3.png)

```` javascript
//定义中心
var centerX = w/2;
var centerY =h/2;
//基本R大小
var baseR = 100;
// SinA, A初始值
var angle =0;
// 每一帧，增加A的速度
var speend =0.01;
draw();
function draw(){
  //重点 (Math.sin(angle)*50) 
	//【-50，50】 Sin波周期
	var dr = baseR+(Math.sin(angle)*50);
	ctx.clearRect(0,0,w,h);
	ctx.beginPath();
	ctx.arc(centerX,centerY,dr,0,Math.PI*2);
	ctx.fill();
	angle+=speend;

	requestAnimationFrame(draw);
}
````
## 极坐标


```` javascript
// 计算把2PI，平均给每个对象的Rad
var sliceRad = Math.PI*2/numsObj;
var offsetRad =0;
var  R= 100;
var time =0;
draw();
function draw(){
	ctx.clearRect(0,0,w,h);
	for (var i = 0 ; i<numsObj;i++){
		//计算每个对象所有的RAD
		var rad = i*sliceRad+(offsetRad);
		//极坐标公式
		var  x = centerX+(Math.cos(rad)*R)
		var  y = centerY+(Math.sin(rad)*R)


	  ctx.beginPath();
	  ctx.arc(x,y,5,0,Math.PI*2);
   	ctx.fill();
	  //每秒偏移的RAD
		offsetRad+=0.0005

	}
````

##波形与轨迹
  Sin波 与Cos波差90度(Math.PI/2);

![BCA3A0E2-0FDF-4C66-A387-5879DC8B9F52](/assets/BCA3A0E2-0FDF-4C66-A387-5879DC8B9F52.png)

一个周期称为频率(Y=A*Sin(X))，
最大与最小值称为振幅(Y=Sin(K*X))。
==> Y = A* Sin(K*X);
### 波形叠加
Demo：y=Sin(x)+Sin(2x)+Sin(3x)

![1BE05BCC-291F-4027-AA6D-CDCF61BA17D4](/assets/1BE05BCC-291F-4027-AA6D-CDCF61BA17D4.png)
杂讯波
 Y = A*Math.random();
![9925DAF9-5F36-422B-8FC2-37965E29E886](/assets/9925DAF9-5F36-422B-8FC2-37965E29E886.png)
```` javascript
ctx.clearRect(0,0,w,h);
	ctx.save();
	ctx.translate(0,centerY)
	ctx.beginPath();
	ctx.strokeStyle="#fff";
	for(var x = 0 ;x<w;x++){
		//杂波
		y=parseInt(10*Math.random()+1);
		//Sin波
		y2=20* Math.sin(x*(1/5)+t*0.25);
	//波叠加
	ctx.lineTo(x,y+y2);
	}
	ctx.stroke();
	ctx.restore();
````
##
##  使用Arctangent 来算 角度
### 需要得到Mouse 在Canvas位置
```` javascript
util.mousePos=function(el){
	//初始Mouse对象
	 var mouse = {x: 0, y: 0};
	//得到mouse的位置
	el.addEventListener('mousemove',function(event){
		var x ,y;
		//整个页面的位置
		if(event.pageX || event.pageY){
			x = event.pageX;
			y= event.pageY;
		}else{
			x = event.clientX + document.body.scrollLeft +
             document.documentElement.scrollLeft;
			y = event.clientY + document.body.scrollTop +
             document.documentElement.scrollTop;
		}
		//整个页面的位置 减去 元素的偏移位置，得到了Mouse在
		// 元素中的位置
		x -= el.offsetLeft;
    y -= el.offsetTop;
		mouse.x = x;
    mouse.y = y;
	},false)
	 return mouse;

}
````

### 画对象
```` javascript
ctx.save()  // 保存当前状态
 //画对象所需要的新状态，
	ctx.translate(arrorX,arrorY)
	ctx.rotate(rad);
	//对象的形
	ctx.beginPath();
	ctx.moveTo(0,0);
	ctx.lineTo(30,0);
	ctx.moveTo(30,0);
	ctx.lineTo(20,10)
	ctx.moveTo(30,0);
	ctx.lineTo(20,-10)
	ctx.stroke();
ctx.restore(); //返回原有的状态
````

### Math.atan2(y,x) 公式算角度
```` javascript
if(mouse){
		var dx = mouse.x-arrorX;
		var dy =mouse.y -arrorY;
		rad = Math.atan2(dy,dx)
		console.log(rad)
	}
````

## 2D向量 （Vector)



![20420BED-1114-4B8B-8C8F-E7350CEAA0C2](/assets/20420BED-1114-4B8B-8C8F-E7350CEAA0C2.png)
2D向量 是由X分量与Y 分量构成，用来描述 大小与方向的工具

```` javascript
function Vector (x,y){
	  this.x = x;
	  this.y = y;
}

Vector.prototype.setAngle =function(rad){
	 var length = this.getLength();
	 this.x = Math.cos(rad)*length;
	 this.y = Math.sin(rad)*length;

}
Vector.prototype.getAngle = function(){
	return Math.atan2(this.y,this.x);
}
Vector.prototype.getLength=function(){
	return Math.sqrt(this.x*this.x+this.y*this.y);
}
Vector.prototype.setLength=function(length){
  var angel = this.getAngle();
	 this.x = Math.cos(angel)*length;
	 this.y = Math.sin(angel)*length;
}

Vector.prototype.add =function(v2){
	return new Vector(this.x+v2.x ,this.y+v2.y);
}

Vector.prototype.sub =function(v2){
	return new Vector(this.x-v2.x ,this.y-v2.y);
}
Vector.prototype.mul =function(n){
	return new Vector(this.x*n ,this.y*n);
}

Vector.prototype.div =function(n){
	return new Vector(this.x/n ,this.y/n);
}
Vector.prototype.unit =function(v){
	return this.mul(1/this.getLength());
}
````

##Velocity 速度
 Velocity 速度来改变 对象的位置 ,称为 位置的变化量
 ```` javascript
 Arrow.prototype.update=function(){
 	this.p = this.p.add(this.v);
}
ctx.translate(this.p.x,this.p.y)
ctx.rotate(this.v.getAngle());
 ````

## Acceleration  加速度
 Acceleration  加速度来改变 对象的Velocity 称为 速度的变化量
 Gravity 也是一种 引力 的加速度
```` javascript
Arrow.prototype.update=function(){
 this.v=this.v.add(this.g);
 this.p = this.p.add(this.v);
}
 this.g = new Vector(0,0.1);
````

##Edge Handling 边界处理
![6643ADA3-6FA4-40FA-82D1-99C986B9626E](/assets/6643ADA3-6FA4-40FA-82D1-99C986B9626E.png)

```` javascript
Arrow.prototype.checkBound=function(){
	if(this.p.x-this.r<=0 ||this.p.x+this.r>=w){
		this.v.x=this.v.x*-1;
	}

	if(this.p.y-this.r<=0 || this.p.y+this.r>=w){
			this.v.y=this.v.y*-1;
	}
}
````

## Friction 摩擦力
Friction 摩擦力来改变 对象的Velocity 
![858EF0B7-DFB0-4068-A581-14DDD42E79C4](/assets/858EF0B7-DFB0-4068-A581-14DDD42E79C4.png)
通用
```` javascript
this.f=0.99;
Arrow.prototype.update=function(){
 this.v=this.v.add(this.g);
 this.v =this.v.mul(this.f);
 this.p = this.p.add(this.v);
}
````
专业
```` javascript
this.f = new Vector(0.15,0);

Arrow.prototype.update=function(){
 this.v=this.v.add(this.g);
 this.f.setAngle(this.v.getAngle());
 if(this.v.getLength()-this.f.getLength()>0){
	 this.v=this.v.sub(this.f);
 }else{
	 this.v.setLength(0);
 }
 this.p = this.p.add(this.v);
````
## Darg Move 	拖动移速




## Collision Detection 碰撞检测
常见的四种类型
![4A6EC056-ED01-48FC-A501-0FFEF9AA02E3](/assets/4A6EC056-ED01-48FC-A501-0FFEF9AA02E3.png)

###Circle/Circle
![3CBA5E9C-E381-46C5-B68A-37AB865D064F](/assets/3CBA5E9C-E381-46C5-B68A-37AB865D064F.png)

```` javascript
util.circleCollision=function(c1,c2){
	return util.distance(c1.p,c2.p)<(c1.r+c2.r);
}
util.distance=function(v1,v2){
	var v3 =v1.sub(v2);
	return v3.getLength();
}
````
###Circle/Point
![0A2DC35B-A32F-47C7-B072-9EE4E9F41E80](/assets/0A2DC35B-A32F-47C7-B072-9EE4E9F41E80.png)

```` javascript
util.circlePointCollision=function(p,c){
	return util.distance(p,c.p)<c.r;
}
````
### Rect/Point
![6C269CAB-943D-4B39-8BB8-CDDA75DF996A](/assets/6C269CAB-943D-4B39-8BB8-CDDA75DF996A.png)

```` javascript
util.rectPointCollision=function(p,rect){
	return  util.inRange(p.x,rect.x,rect.x+rect.w) &&
		      util.inRange(p.y,rect.y,rect.y+rect.h)
}
util.inRange = function(value,min,max){
	return  value>=Math.min(min,max)
	        && value<=Math.max(min,max);
}
````

### Rect/Rect
![FFD3AE3D-A3D2-4580-9963-EFF01547936C](/assets/FFD3AE3D-A3D2-4580-9963-EFF01547936C.png)

```` javascript
util.rectRectCollision=function(r1,r2){
return util.rectInRange(r1.x,r1.x+r1.w,r2.x,r2.x+r2.w) &&
   util.rectInRange(r1.y,r1.y+r1.h,r2.y,r2.y+r2.h)
}
util.rectInRange=function(minA,maxA,minB,maxB){
	return Math.max(minA,maxA)>=Math.min(minB,maxB) &&
	       Math.min(minA,maxA)<=Math.max(minB,maxB)

}
````

## Spring and Hookes Law

F=K*X
K=0.2
X=springFroce.sub(obj); //distance

![70FC52AD-E2F7-44F8-AA98-762356704952](/assets/70FC52AD-E2F7-44F8-AA98-762356704952.png)

```` javascript
ctx.clearRect(0,0,w,h);
	var X=springFroce.sub(obj);
	var F=X.mul(K);
 	v = v.add(F);
 	v =v.mul(0.9)
  obj = obj.add(v);
````


## Spring2
### SpringLength 两点的保持距离 
   F=K*X；
![852DBE8E-0486-4D42-B526-FD55B8F5BD21](/assets/852DBE8E-0486-4D42-B526-FD55B8F5BD21.png)
```` javascript
	 X.setLength(X.getLength()-springLength);
````

```` javascript
function spring(p0,p1,length){
	// F = K*X
		var K=0.2;
  	var X =p0.p.sub(p1.p);
   	X.setLength(X.getLength()-length);
 		var F= X.mul(K);
 // 两个点相互靠近，只到<=length
	  p1.v = p1.v.add(F);
	  p0.v = p0.v.sub(F);
}
````
## Line/Point  Collision Detection


## Bitmap Collision Detection
### 什么是Bitmap
Its rectangular grid of values that are used to set the colors of pixels in a rectangular portion  of the screen.
![90BF18859A8F7CCD62AC9B276E206C8B](/assets/90BF18859A8F7CCD62AC9B276E206C8B.jpg)
### 根据Alpha判断是否Collision
![8B9AFFBFD367E3131B4A42D6102082A6](/assets/8B9AFFBFD367E3131B4A42D6102082A6.jpg)
