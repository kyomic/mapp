import React from 'react'
import avator, { AvatorStateless } from '../user/avator'
import './comment.scss';

interface IProps{
    id?:number
}
class Comment extends React.PureComponent<IProps>{
    componentDidMount(){
        console.log('comment props', this.props)
    }
    render(){
        return (
            <div className="wi-comment">
                {
                    Array.from(new Array(100).keys()).map((val,k)=>{
                        return (
                            <div className="comment-item" key={k}>
                                <AvatorStateless info={{user_id:0}} />
                                <div className='comment'>很好的片+{k}</div>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}

export default Comment;