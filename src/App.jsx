import React from 'react'
import Move from './components'
import Home from './components/home'
import {Route,Link,Routes} from 'react-router-dom'
import './index.css'


export default  class App extends React.Component{

    render(){
        return(
            <div>
              <Routes>
                <Route path='/' element={<Home />}></Route>
                <Route path='/study' element={<Move />}></Route>
              </Routes>
            </div>
        )
    }
}

