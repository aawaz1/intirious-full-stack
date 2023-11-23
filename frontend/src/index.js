import React from 'react';
import ReactDOM from 'react-dom/client';
import {createBrowserRouter,createRoutesFromElements,Route,RouterProvider} from "react-router-dom";
import './index.css';
import App from './App';
import HomeScreen from './screens/HomeScreen';
import { Provider } from 'react-redux';
import LoginScreen from './screens/LoginScreen.jsx';
import ProductScreen from "./screens/ProductScreen.jsx";
import CartScreen from "./screens/CartScreen.jsx";
import store from './store.js';
import 'bootstrap/dist/css/bootstrap.min.css';





const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App/>}>
    <Route index={true} path='/' element={<HomeScreen/>}/>

    <Route path='/product/:id' element={<ProductScreen/>} />
    <Route path='/cart' element={<CartScreen/>} />
    <Route path='/login' element={<LoginScreen/>} />
    </Route>
  )
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
    <RouterProvider router={router}/>
    </Provider>
  </React.StrictMode>
);


