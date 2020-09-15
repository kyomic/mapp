import {Observer, EventHandler} from '../types/event';
import {isDomElementInView} from '../lib/utils'
import Emitter from './emitter';


export class WindowObserver extends Emitter{
    evtOnEventHandler:EventHandler = ()=>{
        return null;
    };
    constructor( context:any = null ){
        super( context )
        this.context = context || window;
        this.evtOnEventHandler = this.onEvent.bind( this );
        this.context.addEventListener('resize', this.evtOnEventHandler )
        this.context.addEventListener('scroll', this.evtOnEventHandler );
    }

    onEvent( e:any ):void{
        this.dispatch(e.type)
    }

    destroy(){
        super.destroy();
        if( this.context ){
            this.context.addEventListener('resize', this.evtOnEventHandler )
            this.context.addEventListener('scroll', this.evtOnEventHandler)
        }
    }
    
}

interface ILazyLoaderOption{
    preloadHeight:number|100
}
/**
 * 惰性加载模块
 */
class lazyloader{
    /**
     * 选项
     */
    option:ILazyLoaderOption;
    observer:Observer | null;
    evtOnRenderHander:EventHandler;
    imgs:Element[];

    scrollviews:any;

    constructor( observer:Observer|null = null, opt:any = {} ){
        this.option = Object.assign({}, lazyloader.option, opt ||{})
        this.observer = observer || new WindowObserver();
        this.evtOnRenderHander = this.onRender.bind( this );
        this.observer.addListener('scroll', this.evtOnRenderHander );
        this.observer.addListener('resize', this.evtOnRenderHander );

        let eles = document.querySelectorAll('img[data-lazysrc]');

        this.imgs =  Array.from( eles );

        this.scrollviews = new Map();
    }

    
    append( dom:Element|null = null ){
        if( !dom ){
            dom = document.querySelector('body');
        }
        if( dom ){
            let eles = dom.querySelectorAll('img[data-lazysrc]');
            let newimg:Element[] = Array.from( eles );
            newimg.forEach(( ele:Element, index:number )=>{
                if( !this.imgs.includes( ele )){
                    this.imgs.push( ele );
                }
            })
        }
        this.onRender();
    }

    onRender(...arg:any){
        //console.log('lazy loader render........', this.imgs)
        this.imgs.forEach( (ele:any)=>{
            let inview = isDomElementInView( ele );
            if( inview ){
                setTimeout(()=>{
                    let url = ele.getAttribute('data-lazysrc');
                    if( url ){
                        ele.setAttribute('src', ele.getAttribute('data-lazysrc'))
                        ele.removeAttribute('data-lazysrc');
                        let index = this.imgs.indexOf( ele );
                        if( index >-1){
                            this.imgs.splice( index, 1 );
                        }
                    }
                },100);
            }
            //console.log("是否在视图中", inview)
        })

        let scrollview = Array.from( document.querySelectorAll('.scrollview') );
        scrollview.forEach( (ele:any) =>{
            let cache = this.scrollviews.get( ele );
            if( !cache ){
                ele.addEventListener('scroll', this.evtOnRenderHander );
                this.scrollviews.set( ele, true )
            }
        })
    }


    destroy():void{
        if( this.observer ){
            this.observer.removeListener( 'scroll', this.evtOnRenderHander );
            this.observer.removeListener( 'resize', this.evtOnRenderHander );
            try{
                this.observer.destroy();
            }catch(e){}
            this.observer = null;
        }
        this.scrollviews.forEach( (item:any) =>{
            item.removeEventListener('scroll', this.evtOnRenderHander );
        })
        this.scrollviews = new Map();
    }
    
    static option:ILazyLoaderOption = {
        preloadHeight:0
    }
}
export default lazyloader;