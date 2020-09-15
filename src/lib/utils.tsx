
import dom from './dom';


export let trim = function( str:string ){
    return str.replace(/^\s+|\s+$/gi,'');
}

export let getQueryParams = ( key:string, url:string = '' ):string =>{
    let escapeReg = ( source:string ) =>{
        return String( source ).replace( new RegExp( '([.*+?^=!:\x24{}()|[\\]\/\\\\])', 'g' ), '\\\x241' );
    }
    var reg   = new RegExp( '(^|&|\\?|#)' + escapeReg( key ) + '=([^&#]*)', 'g' );
    var match = (url || window.location.href).match( reg );
    if ( match ) {
        return match[ match.length - 1 ].split( '=' )[ 1 ];
    }
    return '';
}


export let fitImageUrl = ( url:string ):string =>{
    url = url.replace(/w=\d+/ig,"w=200").replace(/h=\d+/ig, 'h=115');
    return url;
}


/**
 * 判断dom是否在可视区间内(只计算上下)
 * @param ele 
 * @param top 
 * @param right 
 * @param bottom 
 * @param left 
 */
export let isDomElementInView = ( ele:HTMLElement, top:number = 0, right:number = 0, bottom:number=0, left:number=0 ):boolean => {
    let bol = false;
    let offset = dom.getOffset( ele );
    let offsetHeight = ele.offsetHeight;
    let offsetWidth  = ele.offsetWidth;
    var scrollTop = dom.getScrollTop();
    //可视区域
    let viewSize = dom.getViewSize();

    let viewOffset = {
        top:dom.getScrollTop(),
        bottom: scrollTop + viewSize.height + 100,
        left:0,
        right:viewSize.width
    }
    let inVertial = false;
    let inHorizontal = false;
    //console.log('viewOffset', viewOffset, 'offset', offset)
    if(offset.top + offsetHeight >= viewOffset.top && offset.top <= viewOffset.bottom) {
        inVertial = true;
    }
    if(offset.left + offsetWidth >= viewOffset.left && offset.left <= viewOffset.right ) {
        inHorizontal = true;
    }
    return inVertial && inHorizontal;
}