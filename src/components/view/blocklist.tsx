import  React from 'react';
import { Switch,Link } from 'react-router-dom';
import {fitImageUrl} from '../../lib/utils'
import lazyloader from '../../lib/lazyloader'
import "./blocklist.scss"
import dom from '../../lib/dom';

console.log("lazy....", new lazyloader())

let BlockListItem = ( arr:Array<any> ) => {
    return arr.map( (res,key) =>{
        var toLink = ( res:any )=>{
            let url = '';
            if( res.template!='vplay' ){
                url = '/vplay/?mid=' + res.mid
            }else{
                url = '/vplay/?vid=' + res.mid
            }
            return url;
        }
        return (
            <div className="video-item" key={key}>
                <Link to={toLink(res)} className="m-cd-i">
                    <div className="pic">
                        {
                            res.src?<img src={ fitImageUrl(res.still) } />:<img data-lazysrc={ fitImageUrl(res.still) } onLoad={()=>{
                                //修改src数据
                                arr[key].src = fitImageUrl(res.still)
                            }} />
                        }
                        
                    </div>
                    <div className="info">
                        <span className="tit">{res.name}</span>
                        <span>{res.awords}</span>
                    </div>
                </Link>
            </div>
        )
    })
}
// 创建类型接口
export interface IProps {
    blocks?:Array<any>
}
// 使用接口代替 PropTypes 进行类型校验
export class BlockListView extends React.PureComponent<IProps> {
    lazy:lazyloader

    constructor( props:any ){        
        super( props );
        this.lazy = new lazyloader();
    }
    componentDidUpdate(){
        this.lazy.append();
    }

    componentDidMount(){
        this.lazy.append();
    }

    public render() {
        let { blocks } = this.props;
        if( !blocks ) blocks = [];
        let width = dom.getViewSize().width;
        this.lazy.append();
        return (
            <div>
                {   
                    blocks.map( (res,key) =>{
                        let cls = 'video-block';
                        let tpl;
                        switch( res.template ){
                            case 'focus':
                                cls += ' video-block-focus';
                                tpl = <div className={ cls } key={key}>
                                        <div className="video-block-title">{ res.name }</div>     
                                        <div className="scrollview scrollx">                                      
                                        { BlockListItem( res.contents ) }
                                        </div>
                                    </div> 
                                break;
                            default:
                                tpl = <div className={ cls } key={key}>
                                        <div className="video-block-title">{ res.name }</div>
                                        { BlockListItem( res.contents ) }
                                    </div>
                                break;
                        }
                        return tpl;                        
                    })
                }
            </div>
        )
    }
}
