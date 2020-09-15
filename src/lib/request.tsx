import axios from 'axios';
export default function request( url:string , options:any = {} ){
    let defaultOption = {
        method:'get'
    }
    options = options || {};
    let option = Object.assign( {}, defaultOption , options )
    let context = window;
    if( url ){
        //option.url = 'http://po.funshion.com' + url;
        if( url.indexOf("http")===-1){
            url = context.location.protocol + "//" + context.location.host + url;
            url = url.replace(/3000/ig,'3001')
        }
        option.url = url;
    }
    option.proxy = {
        host: 'localhost',
        port: 3001,
    }
    return new Promise((resolve,reject)=>{
        axios(option).then( res=>{
            let data = res.data;
            let error = data ? data.retmsg :'unknow';
            if( data && data.retcode == 200 ){
                resolve( data );
            }else{
                reject( error )
            }
        }).catch(e=>{
            console.error("net io error")
            reject( e )
        });
    })
}