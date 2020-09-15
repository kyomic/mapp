import  React from 'react';
import './vplay.scss'
import Comment from '../../components/widget/comment';
import Flowbox from '../../components/view/flowbox';

// 创建类型接口
export interface IProps {
    mid?:number,
    vid:number
}
export default class VPlay extends React.PureComponent<IProps> {
    public render() {
        const { mid, vid } = this.props;
        return (
            <div>
                <div className="player-wrapper"> player to do..</div>
                <Flowbox>
                    <Comment id={1}></Comment>
                </Flowbox>
                
            </div>
        )
    }


}
