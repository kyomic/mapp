import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { BrowserRouter, Route, Switch,Link,Redirect,useHistory  } from 'react-router-dom';

import { UserInfo } from '../../types/index'

import './login.scss'
import { USER_LOGIN } from '../../constants';
import { getQueryParams } from '../../lib/utils';

interface IProps{
    info?:UserInfo,

    /**
     * 登录
     */
    login?:( params:object | null )=>void,

    /**
     * 登录后回调
     */
    onLogin?:()=>void
}
class login extends  React.PureComponent<IProps> {
    state={
        ref:''
    }
    componentDidMount(){
        let {info} = this.props;
        console.log("info", info)
    }

    isLogined(){
        let { info } = this.props;
        if( info && info.user_id ){
            return true;
        }
        return false;
    }

    componentWillReceiveProps( nextProps:IProps ){
        if( nextProps.info && nextProps.info.user_id ){
            this.props.onLogin && this.props.onLogin();
            if( !this.props.onLogin ){
                let ref = getQueryParams('ref');
                this.setState({
                    ref:ref
                })
            }
            
        }
    }


    render(){
        let { info } = this.props;
        if( !info ) info = {};
        let is_login = this.isLogined();
        let ref = this.state.ref ||'/'
        let logined = (
            <div className="logined">
                <div> 用户名：{info.name}, token:{info.token}  </div>
                <Redirect to={ ref } />
            </div>
            
        )
        return is_login ? ( logined ): (<div className='com-login'>
            <div className="form">
                <div className="form-element">
                    <input type='text' placeholder="用户名" />
                </div>
                <div className="form-element">
                    <input type='password' placeholder="密码" />
                </div>
                <div className="form-submit">
                    <input type='button' value="提交" onClick={this.onSubmitHandler.bind(this)}></input>
                </div>
            </div>
        </div>)
    }

    onSubmitHandler(){
        let { login } = this.props;
        login && login({
            user:'wangxk',
            pass:'aaa'
        })
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
    login:( params:object )=> dispatch({
        type:USER_LOGIN, payload:params
    })
})
export let LoginComponent =  connect(mapStateToProps, mapDispatchToProps)(login);