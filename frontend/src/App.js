import React from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";


const App = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
      <ToastContainer/>
    </>
  );
};

export default App;
