import './App.css';

import { Routes, Route } from 'react-router-dom';
import Home from './pages/main/Home';
import Cart from './pages/main/Cart';
import Product from './pages/main/Product';
import Search from './pages/main/Search';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';



function App() {
  return (
    <Routes>
      <Route path='' element={<Home />} />
      <Route path='/cart' element={<Cart />} />
      <Route path='/product' element={<Product />} />
      <Route path='/search' element={<Search />} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
    </Routes>
  );
}

export default App;
