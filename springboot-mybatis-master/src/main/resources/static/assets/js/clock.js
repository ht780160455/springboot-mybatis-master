(function($){
    //定义数字数组0-9
    var digitToName = ['zero','one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
    //定义星期
    var weekday = ['周日','周一','周二','周三','周四','周五','周六'];

    var digits = {};

    //定义时分秒位置
    var positions = [
        'h1', 'h2', ':', 'm1', 'm2', ':', 's1', 's2'
    ];

    var timestamp = null;

    function run(code,startTime) {
        var m = null;
        timestamp = timestamp||startTime;
        if (timestamp>0) {
            m = moment(timestamp*1000);
            timestamp += 1;
        }
        else {
            m = moment();
        }
        var now = m.format('HHmmss');

        digits.h1.attr('class', digitToName[now[0]]);
        digits.h2.attr('class', digitToName[now[1]]);
        digits.m1.attr('class', digitToName[now[2]]);
        digits.m2.attr('class', digitToName[now[3]]);
        digits.s1.attr('class', digitToName[now[4]]);
        digits.s2.attr('class', digitToName[now[5]]);

        var date = m.format('YYYY MM DD').split(' ');
        date[3] = weekday[m.format('d')];
        typeof code==='function'&&code(date);
    }

    $.extend({
        clock:function(clockSelector,code,start){
            var clock = $(clockSelector);
            var digitHolder = clock.find('.digits');

            $.each(positions, function(){

                if(this == ':'){
                    digitHolder.append('<div class="dots">');
                }
                else{

                    var pos = $('<div>');

                    for(var i=1; i<8; i++){
                        pos.append('<span class="d' + i + '">');
                    }

                    digits[this] = pos;

                    digitHolder.append(pos);
                }

            });

            run(code,start);
            setInterval(function(){
                run(code,start);
            },1000);
        }
    });
})(jQuery);