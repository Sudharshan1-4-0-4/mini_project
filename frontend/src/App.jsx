import React, {useState} from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import Applied from './components/Applied'
import LoginForm from './components/LoginForm'
import CartContext from './context/CartContext';
import Home from './components/Home'
import Jobs from './components/Jobs'
import JobItemDetails from './components/JobItemDetails'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import SignUp from './components/SignUp';
import './App.css'
import Header from './components/Header';

function App(){

  const [cartList, setCartList] = useState([]);
  const [user_name, setName] = useState("");
  
  const addCartItem = (job) => {
    console.log(job);
   
    console.log(job.job_name);
    setCartList((prevCartList) => [...prevCartList, job]);
  };

  const nameAdd = (user_name) => {
    console.log(user_name);
    console.log("hello world");
    setName(user_name);
  }

  const deleteCartItem = (itemId) => {
    setCartList((prevCartList) => prevCartList.filter(item => item.id !== itemId));
  };

  return (
    <div className="app-container">
    <Header/>
    <CartContext.Provider
          value={{
            cartList,
            user_name,
            nameAdd,
            addCartItem,
            deleteCartItem,
            
            
          }}
        >
           <Routes>
            <Route path="/login" element={<LoginForm />} />
            <Route path="/signIn" element={<SignUp />} />
            <Route path="/" element={<ProtectedRoute element={Home} />} />
            <Route path="/jobs" element={<ProtectedRoute element={Jobs} />} />
            {/* <Route path="/jobs" element={<Jobs />} /> */}
            <Route path="/jobs/:id" element={<ProtectedRoute element={JobItemDetails} />} />
            <Route path="/applied" element={<ProtectedRoute element={Applied} />} />
            <Route path="/not-found" element={<NotFound />} />
            <Route path="*" element={<Navigate to="/not-found" />} />
          </Routes>
        </CartContext.Provider>
   
  </div>
  )
  
}

export default App

