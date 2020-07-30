import React, { useState } from 'react';
import './App.css';
import Navbar from './components/navbar/Navbar';
import Planets from './components/planet/Planets'
import People from './components/people/People'
import {ReactQueryDevtools} from 'react-query-devtools'

const App = () => {

  const [page, setpage] = useState('planets');

  return (
    <>
    <div className="App">
        <h1>Star Wars Infos</h1>
        <Navbar setPage={setpage} />
        <div className="content">
             {page === 'planets' ? <Planets /> : <People />}
        </div>
    </div>
    
    <ReactQueryDevtools initialIsOpen={false} />
    </>
  );
}

export default App;
