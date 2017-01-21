$(function(){
    var $date = $('#clock').find('.date');
    var $navLeft = $('#sys-left-nav');
    var $navLeftList = $navLeft.find('.list');
    var $table = $('#table');
    var $tableTitle = $table.find('.table-title');
    var $tableData = $table.find('.table-data');
    var $tableBody = $tableData.find('tbody');
    var currentLine = $('[name="firstLine"]:hidden').val();
    var startSysTime = $('#sys-time').attr('data-start');
    var $sysTimeText = $('#sys-time').find('span'); 
    
    setInterval(function(){
    	freshTableData(currentLine);
    },500);
    
    setInterval(function(){
    	var html = '';
    	$.ajax({
    		url:'/data/queryLineList',
    		dataType:'json'
    	}).done(function(res){
    		var i=0;
    		if (res&&res.length) {
    			for (;i<res.length;i++) {
    				html += '<li data-id="'+res[i]+'" class="'+(res[i]==currentLine?'active':'')+'">'+res[i]+'</li>';
    			}
    			$navLeftList.html(html);
    			if(!currentLine && res.length>0){
    				currentLine= res[0];
    			}
    		}
    	});
    },10*1000);
    
    // 左边栏
    $navLeft.sidenav();
    // 时钟
    $.clock('#clock',function(data){
        $date.html(data[0]+'年'+data[1]+'月'+data[2]+'日' + ' ' + data[3]);
        // 运行时间
        var d = diffTime(parseInt(startSysTime/1000),parseInt(new Date().getTime()/1000));
        $sysTimeText.html('已运行 '+d.h+'小时'+d.m+'分'+d.s+'秒');
    });
    // 底部圆形导航
    $.MenuCircle('#wheel','li','#sys-btn',100);
	
	
	$(document).on('keydown',function(e){
		var len = $navLeft.find('li').length;
		var index = $navLeft.find('li.active').index();
		if(e.keyCode == 38){
			index -= 1;
		}
		else if (e.keyCode == 40){
			index += 1;
		}
		if (index<0) {
			index = len-1;
		}
		else if (index>=len) {
			index = 0;
		}
		selectorLine(index,function(){
			var id = $(this).attr('data-id');
			currentLine = id;
			freshTableData(id);
		});
	});
	
	$navLeft.on('click','.list li',function(){
		selectorLine($(this).index(),function(){
			var id = $(this).attr('data-id');
			currentLine = id;
			freshTableData(id);
		});
	});
	
    function diffTime(start,end) {
        var diff = end-start;
        var time = {
            h:0,
            m:0,
            s:0
        };
        time.h = parseInt(diff/60/60);
        time.s = diff%60;
        time.m = (diff-time.h*3600-time.s)/60;
        return time;
    }
	
	// 刷新数据
	function freshTableData(lineNo){
		if(lineNo){
			return $.ajax({
		    	url:'/data/queryPageData?lineNo='+lineNo,
		    	dataType:'json'
		    }).done(function(res){
		    	// title
		    	$tableTitle.find('h3').html(res.lineNo+'线');
		    	$tableTitle.find('span').html('总计：'+res.status.size+'台 在线：'+res.status[0]+'台 离线：'+res.status[1]+'台 异常：'+res.status[2]+'台');
		    	// data
		    	var tr = '';
		    	var data = res.dataList;
		    	var map = {
	    			FAILURE:'fail',
	    			NORMAL:'',
	    			ERROR:'alarm',
	    			OFFLINE:'offline'
		    	};
		    	if (data&&data.length) {
			    	for (var i=0;i<data.length;i++) {
			    		tr += '<td class="row">\
			    				<span>'+data[i].deviceName+'</span>\
			    				<a class="type typeicon '+map[data[i].status]+' i'+data[i].deviceType+'" title="'+data[i].briefValue+'"></a>\
		    				</td>';
			    		if ((i+1)%17==0) {
			    			tr += '</tr><tr>';
			    		}
			    	}
			    	
			    	tr = '<tr>'+tr+'</tr>';
			    	
			    	var $tr = $(tr);
			    	var $trs = $tableBody.find('tr');
			    	
			    	$.each ($tr,function(i){
			    		if (!$trs.eq(i+1).length) {
			    			$tableBody.append($(this));
			    		}
			    		else {
			    			$trs.eq(i+1).replaceWith($(this));
			    		}
			    	});
		    	}

		    	setTableStyle($('#grid'));
		    });
		}
	    
	}
	
	// 线体选择
	function selectorLine(index,code) {
		$navLeft.find('li').removeClass('active');
		var $li = $navLeft.find('li').eq(index);
		$li.addClass('active');
		typeof code==='function'&&code.call($li[0],index);
	}
	
    // 线体循环
    function loopLine(time) {
        var e = $.Event("keydown");
        e.keyCode=40;
		if (time) {
			setInterval(function(){
				$(document).trigger(e);
			},time);
		}
		else {
			$(document).trigger(e);
		}
    }
	
	// 设置表格样式
	function setTableStyle($grid) {
		$grid.hide();
		var $span = $grid.find('[colspan]');
		var indexs = [];
		$.each ($span,function(){
			var $this = $(this);
			var num = $this.attr('colspan');
			if (!num) return true;
			var index = $this.index();
			for (var i=num-1;i>0;i--) {
				$this.after($(this).clone().removeAttr('colspan').attr('data-r','').hide());
				indexs.push(index);
				index += 1;	
			}
		});
		
		for (var i=0;i<indexs.length;i++) {
			$grid.find('tr td:nth-child('+(indexs[i]+1)+')').filter(':not([colspan])').addClass('no-bord-right');
		}
		$grid.find('[data-r]').remove();
		$grid.show();
	}
});