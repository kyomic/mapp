import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { Switch,Link } from 'react-router-dom';


import { NaviMenu, HeaderBase } from '../../components/header/header';
import { INavMenu } from '../../types/navmenu';
import { getQueryParams } from '../../lib/utils';
import { NAVLIST_LOAD_ITEM, NAVLIST_UPDATE_CHANNEL} from '../../constants/index'

import { BlockListView } from '../../components/view/blocklist';

//css
import './channels.scss'
import lazyloader from '../../lib/lazyloader';
console.log("headerBase......!!!!!!!!!!!", HeaderBase)
// 创建类型接口
export interface IProps {
    mid?:number,
    vid?:number,
    channels?:any,
    location?:any,
    loadMenu?:( nav_id:number )=>void,
    updateMenu?:(obj:any)=>void,
    currentNavId?:number
}
class Channels extends React.PureComponent<IProps> {
    state = {
        nav_id:0
    }
    componentDidMount(){
        console.log("------channel mounted----------", this.props)
    }
    componentWillReceiveProps( props:IProps ){
        if( props.location.search ){
            let nav_id:number = parseInt(getQueryParams('id', props.location.search ));
            if( nav_id && (nav_id != this.state.nav_id) ){
                this.state.nav_id = nav_id;
                this.setState({
                    nav_id: nav_id
                })
                this.renderContentById( nav_id );
                
            }
        }else{
            if( this.props.currentNavId != this.state.nav_id && this.props.currentNavId ){
                this.renderContentById( this.props.currentNavId )
            }
            
        }
    }

    public renderContentById( nav_id:number ){
        let blocks = this.props.channels.blocks || [];
        let cacheBlocks = blocks[ nav_id ];
        this.setState({
            nav_id:nav_id
        })
        console.log("###render content", nav_id )
        if( !cacheBlocks ){
            this.props.loadMenu && this.props.loadMenu( nav_id );
        }else{
            console.log("update menu====", { nav_id:nav_id, blocks: cacheBlocks })
            this.props.updateMenu && this.props.updateMenu({ nav_id:nav_id, blocks: cacheBlocks })
        }
    }

    public render() {
        const { mid, vid,channels } = this.props;
        let blocks = channels.blocks;
        let current = channels.currentBlock;
        console.log(this.state)
        return (
            <div>
                <HeaderBase></HeaderBase>
                <NaviMenu onInit={ this.onMenuInit.bind(this) } onSelect={this.onMenuSelect.bind(this)}></NaviMenu>
                
                <BlockListView blocks={current}></BlockListView>
            </div>
        )
    }

    onMenuInit(nav_id:number=0,  data:Array<INavMenu> ){
       if( nav_id ){           
           this.renderContentById( nav_id );
       }
    }

    onMenuSelect( nav_id:number = 0 ){
        console.log('select', nav_id, this.props)
        
    }
}

// 将 reducer 中的状态插入到组件的 props 中
const mapStateToProps = function( state: any):any{
    return {
        channels: state.channels,
        currentNavId:state.channels.currentNavId
    }
}
// 将 对应action 插入到组件的 props 中
const mapDispatchToProps = (dispatch: Dispatch) =>({
    loadMenu:( id:number )=> dispatch({
        type:NAVLIST_LOAD_ITEM, payload:id
    }),
    updateMenu:( data:any ) => dispatch({
        type:NAVLIST_UPDATE_CHANNEL, payload:data 
    })
})
// 使用 connect 高阶组件对 Counter 进行包裹
export default connect(mapStateToProps, mapDispatchToProps)(Channels);


