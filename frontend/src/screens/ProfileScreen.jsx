import { useState,useEffect } from "react";
import { Table,Form,Button,Row,Column } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch,useSelector } from "react-redux";
import {toast} from 'react-toastify';
import Message from "../message/Message";
import Loader from "../components/Loader/Loader";
import { useProfileMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";


const ProfileScreen = () => {
    const [name,setName] = useState("");
    const [email , setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword,setConfirmPassword] = useState("");


    const dispatch = useDispatch();
  return (
    <div>ProfileScreen</div>
  )
}

export default ProfileScreen