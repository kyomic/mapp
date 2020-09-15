import React from 'react';
import { Link } from 'react-router-dom';

import logo from './logo.svg';
import './App.scss';

interface IProps {
}
class App extends React.PureComponent<IProps> {
  componentDidMount(){
    console.log("------------app mouned", this.props)
  }
  render(){
    return (
      <div className="app">
       <header className="app-header">
          app home          
        </header>
      </div>
    );
  }
}
export default App;
