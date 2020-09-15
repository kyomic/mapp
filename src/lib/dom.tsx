


class dom{
    static doc = document;
    static win = window;
    static getScrollTop(){
        let win = dom.win;
        let doc = dom.doc;
        return win.pageYOffset || doc.documentElement.scrollTop || doc.body.scrollTop;
    }


    static getViewSize( withScrollBar:boolean = false ){
        var doc = document,
        client = doc.compatMode == 'BackCompat' ? doc.body : doc.documentElement;
        // 是否包含滚动条宽度
        if (withScrollBar) {
            let scrollbarSize = this.getScrollBarSize();
            return {
                width:client.clientWidth + scrollbarSize.width,
                height:client.clientHeight + scrollbarSize.height
            }
        } else {
            return {
                width:client.clientWidth,
                height:client.clientHeight
            }
        }
    }


    /** see baidu.page.getViewWidth  */
    static getScrollBarSize(){
        var $div = document.createElement( 'div' );
        $div.id = '__detect__';
        $div.style.overflow = 'scroll';
        $div.style.visibility = 'hidden';
        $div.style.position = 'absolute';
        $div.style.width = '100px';
        $div.style.height = '100px';
        document.body.appendChild( $div );
        var hw = {
            width  : $div.offsetWidth - $div.clientWidth,
            height : $div.offsetHeight - $div.clientHeight
        };
        if( $div.parentNode ){
            $div.parentNode.removeChild( $div );
        }        
        return hw;
    }

    static getPosition( dom:any ){
        return {
            top: dom.offsetTop,
            left: dom.offsetLeft,
        }
    }

    static getOffset( dom:any ){
        var top = 0,
            left = 0
        
        var scrollLeft=0;
        var parent = dom.parentNode;
        while(dom.offsetParent) {
            //父容器存在scroll的容器
            while( parent ){
                if( parent && parent.scrollLeft ){
                    scrollLeft += parent.scrollLeft;
                }
                parent = parent.parentNode;
            }
            top += dom.offsetTop;
            left += dom.offsetLeft;
            
            left -= scrollLeft;
            dom = dom.offsetParent
        }
        return {
            top: top,
            left: left,
        }
    }
    
}
export default dom;