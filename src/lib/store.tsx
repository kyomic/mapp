import {trim} from './utils'

let context = window ;
interface IStore{
    /**
     * 设置值
     */
    write:( name:string, value:any, day:number | 365, domain:string | '', usehost:boolean | false ) => void,
    read:( name:string ) => any,
    remove:( name:string ) => void,
}


export default class CookieStore implements IStore{

    read( name:string ):any{
        // eg: 'name1=value1; name2=value2; name3=value3; name4=value4'
        let c = document.cookie;
        if ( !c.length ) {
            return '';
        }
        let tp = c.split( '; ' );
        for ( var i = tp.length - 1; i >= 0; i-- ) {
            let tm = tp[ i ].split( '=' );
            if ( tm.length > 1 && tm[ 0 ] == name && tm[ 1 ] ) {
                return unescape( trim( tm[ 1 ] ) );
            }
        }
        return '';
    }

    /**
     * 
     * @param name 
     * @param value 
     * @param day 
     * @param domain 
     * @param usehost 
     */
    write( name:string, value:any, day:number = 365, domain:string='', usehost:boolean = false ):void{
        day = day || 365;
        domain = domain || '.fun.tv';
        usehost = usehost || false;
        if( /localhost/.exec( context.location.host )){
            domain = context.location.host;
            usehost = true;
        }
        var expires = new Date();
        expires.setTime( (new Date()).getTime() + 3600 * 24 * 1000 * day );
        document.cookie = name + '=' + escape( value ) + '; path=/; ' + (usehost ? 'host' : 'domain') + '=' + domain + (day == -1 ? '' : ';expires=' + expires.toUTCString());
    }

    remove(name:string):void{
        this.write( name, '', -365, '', false );
        this.write( name, '', -365, document.location.host, false );
    }
}

export class LocalStore implements IStore{
    read( name:string ):any{
        var r = null;
        try{
            r = window.localStorage['_'+ name ];
        }catch(e){}
        if(r){
            let tmp = JSON.parse(String(r));
            if(tmp && tmp.data && tmp.exp && tmp.time && (new Date()).getTime() - tmp.time < tmp.exp * 1000){
                r = tmp.data;
            }else{
                r = null;
                this.remove(name);
            }
        }
        return r;
    }
    write( name:string, value:any, day:number = 365, domain:string='', usehost:boolean = false ):void{
        day = day || 365;
        let exp = day * 24 * 60 * 60;//second
        try{
            window.localStorage['_'+ name ] = JSON.stringify({data : value, exp : exp, time : (new Date()).getTime()});
        }catch(e){}
    }

    remove(name:string){
        try{
            delete window.localStorage['_'+name];
        }catch(e){}
    }
}


let cookie = new CookieStore();
let localStore  = new LocalStore();
let store = cookie;
if( window.localStorage && window.localStorage.getItem ){
    store = localStore;
}
export{
    cookie,localStore,store
}