window.onload = function(){
	//下方小图标、线条运动
	var btn = document.getElementById('btn');
	var lisBtn = btn.querySelectorAll('li');
	var line = btn.querySelector('span');
	var w = parseInt(css(lisBtn[0],'width'))+20; //按钮的宽度加margin值

	//设置上方文字和图片显示
	var imgWrap = document.getElementById('imgWrap');
	var lisImg = imgWrap.querySelectorAll('li');
	var imgs = imgWrap.querySelectorAll('img');
	var spanImg = imgWrap.querySelectorAll('span');
	var n = 0;
	var timer;

	//设置lisBtn对应的样式和运动
	for(var i=0;i<lisBtn.length;i++){
		lisBtn[i].index = i;
		//把小图标的索引值单独存起来
		imgs[n].t = parseFloat(css(imgs[i],'top'));
		//线条鼠标移入事件
		lisBtn[i].onmouseover = function(){
			clearInterval(timer);  //清除自动播放定时器
			//如果有class就return，让下面代码不执行
			if(this.className){
				return;
			}
			//存当前索引值，在回调函数中使用
			n = this.index;
			show(n);
		};
		//线条鼠标移出事件
		lisBtn[i].onmouseout = function(){
			btnFn();
		};
	}

	show(0); //初始化

	function btnFn(){
		timer = setInterval(function(){
			n++;
			if(n == lisBtn.length){
				n = 0;
			}
			show(n);
		},2000);
	}
	btnFn();

	function show(n){
		//线条运动
		mTween(line,{"left":w*n},300,'linear');

		/*
			根据线条的运动，使得背景图运动，即选项卡的原理
				1、先清空所有按钮的class
				2、让背景图透明度为0
		*/
		for(var i=0;i<lisBtn.length;i++){
			lisBtn[i].className = '';
			//清除鼠标移入出现的问题
			clearInterval(imgs[i].timer);
			clearInterval(spanImg[i].timer);

			//设置图片轮滑效果，让图片的背景透明度全部为0
			mTween(lisImg[i],{'opacity':0},500,'linear');

			css(imgs[i],'opacity',0);
			css(imgs[i],'top',imgs[i].t+'px');
			css(spanImg[i],'opacity',0);
		}

		//设置背景图运动
		mTween(lisImg[n],{"opacity":1},500,'linear',function(){
			//然后运动小图，top值+30,让运动从上而下
			mTween(imgs[n],{"opacity":1,"top":imgs[n].t+30},500,'linear',function(){
				//接着运动按钮
				mTween(spanImg[n],{"opacity":1},300,'linear');
			});
		});
		lisBtn[n].className='active';
	}

	//右侧导航条效果
	var more=document.getElementById('more');
	var nav=document.getElementById('nav');
	var lisNav=nav.getElementsByTagName('li');
	var spanNav = nav.querySelector('span');
	var h=parseInt(getComputedStyle(lisNav[0]).height); //一个li的高度
	var t=parseInt(getComputedStyle(spanNav).top);  //圆点的初始位置

	more.onmouseover = nav.onmouseover = function(){
		mTween(nav,{"right":0},300,'linear');
	};
	more.onmouseout = function(){
		mTween(nav,{"right":-162},300,'linear');
		css(spanNav,'display','block');
		css(spanNav,'top',t+'px');
	};
	nav.onmouseout = function(){
		mTween(nav,{"right":-162},300,'linear');
		css(spanNav,'display','none');
	};
	//设置导航条鼠标滑过li时，小圆点的效果
	for(var i=0;i<lisNav.length;i++){
		lisNav[i].index = i;
		lisNav[i].onmouseover = function(){
			css(spanNav,'display','block');
			mTween(spanNav,{'top':t+h*this.index},300,'linear');
		};
	}

	function css(){
	    /*获取一个样式的类数组，方便直接在其他地方调用传参
	        css(元素，属性名，属性值);
	    */  
	    if(arguments.length == 2){
	        if(arguments[0].currentStyle){
	            return arguments[0].currentStyle[arguments[1]];
	        }else{
	            return getComputedStyle(arguments[0])[arguments[1]];
	        }
	    }else{
	        arguments[0].style[arguments[1]] = arguments[2];
	    }
	}
};