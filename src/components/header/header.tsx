import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { UserInfo } from '../../types/index'
import { Switch,Link } from 'react-router-dom';

import { loadmenu, initMenu } from '../../actions';
import { USERINFO_UPDATE, USERINFO_UPDATE_SYNC, NAVLIST_INIT, NAVMENU_CHANGE, NAVLIST_LOAD_ITEM } from '../../constants/index'

import { IChannel, Channel } from '../../types/channel'
import { NavMenu, INavMenu } from '../../types/navmenu';
import { getQueryParams } from '../../lib/utils';
import './header.scss'

import Avator from '../user/avator';
interface IProps{
}

export class HeaderBack extends React.PureComponent{
    render(){
        return <div className="header-back">
            <i className="i-back" onClick={ this.onBackHandler.bind(this)} >返回</i>
            <h2>
                标题
            </h2>
            <div className="tools">

            </div>
        </div>
    }
    onBackHandler(){
        window.history.go(-1)
    }
}
export class HeaderBase extends React.PureComponent<IProps> {   
    render(){        
        return <div className='header'>
            <div className="logo" />
            <Avator />
        </div>
    }
}


interface INaviMenuProps{
    user_id?:number|0,
    channel_id?: number,
    user?:UserInfo,
    nav_id?:number|0,
    initMenu?:()=> void,
    loadMenu?:( id:number )=> void,
    channels?: IChannel,
    menu?:Array<NavMenu>,

    onInit?:(  nav_id:number, arr:Array<INavMenu> )=>void,
    onSelect?: (nav_id:number)=>void,
}


class nav_menu extends React.PureComponent<INaviMenuProps> {
    state = {
        nav_id:-1,
        inited:false,
    }
    render() {
        let {  user, channels } = this.props;
        channels = channels || {
            menu:new Array<NavMenu>(),
            currentNavId:0,
            blocks:{},
            currentBlock:[]
        };
        console.log('channels', channels)
        let menu:Array<NavMenu> = channels ? ( channels.menu || new Array<NavMenu>()) : new Array<NavMenu>();
        let nav_id:number = channels.currentNavId;
        user = user || {};
        console.log("render----", this.props)
        return (
            <div>
                <nav>
                    <ul className="nav-menu">
                        {
                            (menu||[]).map((res:NavMenu,key)=>{
                                let url = "?id=" + res.nav_id;
                                let id:number = parseInt(res.nav_id.toString());
                                let className = id == nav_id?'current':'';
                                return <li className={className} key={key}><Link to={url} onClick={(e) => this.onMenuNav(e, id) } >{res.name}</Link></li>
                            })
                        }
                    </ul>
                </nav>
            </div>
        )
    }    
    
    componentWillReceiveProps( nextProps:INaviMenuProps ):void{
        if( nextProps.menu && nextProps.menu.length ){
            let id:number = nextProps.menu[0].nav_id;
            if( !this.state.inited ){
                this.props.onInit && this.props.onInit( id, nextProps.menu )
                this.setState( {
                    inited:true
                })
            }
            
        }
    }


    componentDidMount(){        
        const { initMenu, loadMenu  } = this.props;
        let {menu, channels } = this.props;
        if( !menu || !menu.length ){
            if( initMenu ){
                let init  = initMenu();
            }
        }        
    }

    onMenuNav( e:any, to:number){
        this.props.onSelect && this.props.onSelect( to );
        console.log("props....",this.props);
        return;
        let func = this.props.loadMenu||function(){};
        if( func ){
            func( to );
        }
    }
}


// 将 reducer 中的状态插入到组件的 props 中
const mapStateToProps = function( state: any):any{
    console.log("mapState...", state)
    return {
        user:Object.assign( {}, state.user || {}),
        name:state.name,
        channels: state.channels,
        nav_id:state.channels.currentNavId,
        menu:state.channels.menu,
    }
}
// 将 对应action 插入到组件的 props 中
const mapDispatchToProps = (dispatch: Dispatch) =>({
    onUpdate: () => dispatch({
        type: USERINFO_UPDATE_SYNC,
        payload:{a:1}
    }),
    onUpdate2:() => dispatch({
        type:USERINFO_UPDATE
    }),
    initMenu:()=> dispatch({
        type:NAVLIST_INIT
    }),
    loadMenu:( id:number )=> dispatch({
        type:NAVLIST_LOAD_ITEM, payload:id
    })
})
// 使用 connect 高阶组件对 Counter 进行包裹
export let NaviMenu = connect(mapStateToProps, mapDispatchToProps)(nav_menu)