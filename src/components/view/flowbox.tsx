import React from 'react';
import { runSaga } from 'redux-saga';

interface IProps{
    isReachBottom?: () => void,
    onReachBottom?: () => void
}
/**
 * 下拉刷新的容器
 */
export default class Flowbox extends React.PureComponent<IProps>{
    componentDidMount(){
        let win = window;
        window.addEventListener('scroll', this.onScroll.bind(this))
    }

    onScroll(){
        let { isReachBottom, onReachBottom } = this.props;
        if( isReachBottom && isReachBottom() ){
            onReachBottom && onReachBottom();
        }
    }

    render(){
        let newProps = {};
        let cloneProps = Object.assign( {}, this.props );  
        let cloneChild = ( children:any )=>{
            return  React.Children.map( children, element =>{
                let clone =  React.cloneElement( element, cloneProps );
                return clone;
            })
        }                             
        return (
            <div className="flowbox">
                { cloneChild( this.props.children ) }                
            </div>
        )
    }
}