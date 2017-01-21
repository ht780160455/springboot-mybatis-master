(function($){
    function MenuCircle(menu,item,btn,r) {

        var self = this;
        this.menu = $(menu);
        this.btn = $(btn);

        MenuCircle.prototype.elemInfo = function($elem){
            var p = $elem.offset();
            p.w = $elem.outerWidth();
            p.h = $elem.outerHeight();
            return p;
        };

        MenuCircle.prototype.findItem = function() {
            return this.menu.find(item);
        };

        MenuCircle.prototype.setMenuStart = function(){
            this.menu.css({
                '-webkit-transform':'translateX(-9999px)',
                'transform':'translateX(-9999px)',
                'position':'absolute',
                'visibility':'hidden',
                'width':0,
                'height':0
            });
        };

        MenuCircle.prototype.setMenuEnd = function(){
            var p = this.elemInfo(this.btn);
            var left =  p.left-(r-p.w/2);
            var top = p.top-(r-p.h/2);
            this.menu.css({
                position:'absolute',
                left:left,
                top:top,
                '-webkit-transform':'translateX(0)',
                'transform':'translateX(0)',
                'visibility':'visible'
            });
        };

        MenuCircle.prototype.setCircleEnd = function(){
            var $item = this.findItem();
            $.each($item,function(i){
                var $this = $(this);
                var w = $this.width();
                var h = $this.height();
                var angle = $this.attr('data-angle');
                $this.css({
                    position:'absolute',
                    left:r+r*Math.cos(angle/180*Math.PI)-w/2,
                    top:r+r*Math.sin(angle/180*Math.PI)-h/2,
                    opacity:1
                });
            });
        };

        MenuCircle.prototype.setCircleStart = function(){
            var $item = this.findItem();
            var p = this.elemInfo(this.btn);
            $item.css({
                position:'absolute',
                left:r-p.w/2,
                top:r-p.h/2,
                opacity:0,
                '-webkit-transition-duration':'.5s',
                'transition-duration':'.5s',
                '-webkit-transition-property':'left,top,opacity',
                'transition-property':'left,top,opacity'
            });
        };

        this.setCircleStart();
        this.setMenuStart();

        this.btn.on('click',function(){
            self.setMenuEnd();
            if (self.menu.hasClass('open')) {
                self.setCircleStart();
                self.menu.removeClass('open');
                setTimeout(function(){
                    self.setMenuStart();
                },255);
            }
            else {
                self.setCircleEnd();
                self.menu.addClass('open');
            }
        });
    }

    $.extend({
        MenuCircle:function(menu,item,btn,r){
            return new MenuCircle(menu,item,btn,r);
        }
    });
})(jQuery);