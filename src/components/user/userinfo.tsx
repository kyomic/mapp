import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import Avator from '../user/avator'
import {USER_LOGOUT, USER_LOGIN} from '../../constants/index'
import {UserInfo} from '../../types/index'
import './userinfo.scss'
interface IProps{
    userinfo?:UserInfo,
    logout?:()=>void
}

class user_info extends React.PureComponent<IProps> {
    render(){
        let info = this.props.userinfo;
        let logined = false;
        if( info && info.user_id ){
            logined = true;
        }
        return <div className="user-info">
            <Avator loginable={true} loginref="/home"></Avator>
            <div className="info">
            {
                logined? <button onClick={this.onLogout.bind(this)}>退出登录1</button>:''
            }
            </div>
            
        </div>
    }

    componentDidMount(){
        console.log("00000", this.props)
    }

    onLogout(){
        console.log("logout", this.props.logout)
        this.props.logout && this.props.logout()
    }
}

// 将 reducer 中的状态插入到组件的 props 中
const mapStateToProps = function( state: any,ownProps:any):any{
    return {
        userinfo:state.user
    }
}
const mapDispatchToProps = (dispatch: Dispatch) =>({
    logout:()=> dispatch({
        type: USER_LOGOUT
    }),
})
export let UserInfoComponent = connect(mapStateToProps, mapDispatchToProps)(user_info);