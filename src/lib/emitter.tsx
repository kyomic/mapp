import { IObserver } from "../types/event";



export default class Emitter implements IObserver{
    /** 事件缓存  */
    cache:Map<any,any>;
    context:any = null;

    constructor( obj:any = null ){
        this.context =obj;
        this.cache = new Map();
    }
    public addListener( type:string, handler:()=>void, ...arg:any ):void{
        let cache:Array<any> = this.cache.get(type);
        if( !cache ){
            cache = [];
        }
        cache.push( {
            'func':handler, 'args':arg
        } );
        this.cache.set( type, cache )
    }
    public removeListener(type:string, handler:()=>void):void{
        let cache:Array<any> = this.cache.get(type);
        if( !cache ){
            cache = [];
        }
        let idx:number = cache.findIndex( handler );
        if( idx >-1){
            cache.splice( idx, 1);
        }
        this.cache.set(type, cache );
    }
    public dispatch( type:string ):void{
        let cache:Array<any> = this.cache.get(type);
        if( !cache ){
            cache = [];
        }
        cache.map( (item,index )=>{
            try{
                let func = item.func || new Function()
                func.apply( item['args'] )
            }catch(e){}
        })
    }

    destroy():void{
        if( this.cache ){
            this.cache.clear();
            this.cache = new Map();
        }
    }
}