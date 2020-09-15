import  React from 'react';
import { NaviMenu, HeaderBack } from '../../components/header/header';
import { UserInfoComponent } from '../../components/user/userinfo'
import { Link } from 'react-router-dom';

import './home.scss'
// 创建类型接口
export interface IProps {
    mid?:number,
    vid:number
}

export default class Home extends React.PureComponent<IProps> {
    public render() {
        const { mid, vid } = this.props;
        return (
            <div>
                <HeaderBack></HeaderBack>
                <UserInfoComponent></UserInfoComponent>
                <div className="settings">
                    <Link to="/home/history" className="setting-item">观看历史</Link>
                    <Link to="/account/password" className="setting-item">找到密码</Link>
                </div>
            </div>
        )
    }

    componentDidMount(){
        console.log('home mouted')
    }
}
