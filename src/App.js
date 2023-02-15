import './App.css';
import Home from './pages/Home/Home';
import About from './pages/About/About';
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Cadastro from './pages/Cadastro/Cadastro';
import Login from './pages/Login/Login';
import CreatePost from './pages/CreatePost/CreatePost';
import Dashboard from './pages/Dashboard/Dashboard';
import Search from './pages/Search/Search';

import { AuthProvider } from './Context/AuthContext';

import {useState, useEffect} from "react";
import {onAuthStateChanged } from 'firebase/auth';
import {useAuthentication } from './Hook/useAuthentication';
import Post from './pages/Post/Post';
import EditPost from './pages/EditPost/EditPost';

function App() {

  const [user, setUser] = useState(undefined)
  const {auth} = useAuthentication()

  const loadingUser = user === undefined ;

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user)
    })
  },[auth])

  if(loadingUser){
    return <p>Carregando...</p>
  }


  return (
    <div className="App">
      <AuthProvider value={{user}} >
       <BrowserRouter>
        <Navbar/>
          <div className="container"> 
            <Routes>
              <Route path='/' element={<Home/>} />
              <Route path='/search' element={<Search/>} />
              <Route path= '/posts/:id' element={<Post/>} />

              <Route 
               path='/posts/create'
               element={ user ? <CreatePost/>: <Navigate to='/login'/>} 
               />

              <Route 
               path='/posts/edit/:id'
               element={ user ? <EditPost/>: <Navigate to='/login'
               />} 
               />

              <Route path='/dashboard'
               element={!user ? <Navigate to= "/login"/> : <Dashboard/>}
              />

              <Route path='/cadastro'
               element={user ? <Navigate to= "/" /> : <Cadastro/> }
               />

              <Route path='/login'
               element={user ? <Navigate to="/" /> : <Login/> } 
               />

              <Route path='/about' element={<About/>} />

            </Routes>  
          </div>
        <Footer/>
      </BrowserRouter> 
      </AuthProvider>   
    </div>
  );
}

export default App;
