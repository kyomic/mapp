import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { UserInfo } from '../../types/index'

import './avator.scss'
import { Link } from 'react-router-dom';

interface IProps{
    info?:UserInfo,
    loginable?:boolean|false,
    loginref?:string|''
}

export class AvatorStateless  extends React.PureComponent<IProps>{
    render(){
        let { info } = this.props;
        if( !info ){
            info = {}
        }
        let url = "/personal/" + info.user_id
        return (
            <Link to={url}>
                <div className="avator">
                    <img />
                    <div className="center">
                        <em className='center-element name'>
                            {info.user_id ? info.name : '游客'}
                        </em>
                    </div>
                    
                </div>
            </Link>
        )
    }
}

class Avator extends  React.PureComponent<IProps> {    
    render(){
        let {info, loginable, loginref } = this.props;
        console.log('登录信息', info, loginref)
        if( !info ){
            info = {}
        }
        let url = '/home';
        if( loginable ){
            if( !info.user_id ){
                url = '/account/login?ref=' + (loginref ||'')
            }
        }
        return (
            <Link to={url}>
                <div className="avator">
                    <img />
                    <div className="center">
                        <em className='center-element name'>
                            {info.user_id ? info.name : '游客'}
                        </em>
                    </div>
                    
                </div>
            </Link>
        )
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
export default connect(mapStateToProps, mapDispatchToProps)(Avator);