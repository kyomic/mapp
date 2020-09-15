import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import {UserInfo} from '../../types/index'
import { LoginComponent } from '../../components/view/login'
import { USER_LOGIN } from '../../constants';
import { HeaderBack } from '../../components/header/header';
interface IProps{
    info?:UserInfo,
    /** 登录操作 */
    login?:()=>void
}
class Login extends  React.PureComponent<IProps> {
   
    render(){
        let {info} = this.props;
        if( info ){

        }else{
            info = {}
        }
        return <div className='page page-login'>
            <HeaderBack></HeaderBack>
            <LoginComponent />
        </div>
    }
}

// 将 reducer 中的状态插入到组件的 props 中
const mapStateToProps = function( state: any):any{
    return {
        info:state.user
    }
}
// 将 对应action 插入到组件的 props 中
const mapDispatchToProps = (dispatch: Dispatch) =>({
    
})
export default connect(mapStateToProps, mapDispatchToProps)(Login);