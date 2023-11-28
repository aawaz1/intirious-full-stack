import asyncHandler from "../middlewares/asyncHandler.js";
import User from "../models/userModel.js";
import jwt from 'jsonwebtoken';
import generateToken from "../utils/generateToken.js";


// @desc Auth user and get token;
// @routes GET api/users/login
// @acceess - public

const authUser = asyncHandler( async(req ,res) => {
   const  {email , password} = req.body;
  const user = await  User.findOne({email});
  if(user && (await user.matchPassword(password))){
  generateToken(res, user._id);

   res.status(200).json({
      _id : user._id,
      name : user.name,
      email : user.email,
      isAdmin : user.isAdmin,
     
   });
  }else {
   res.status(401);
   throw new Error('Invalid email or password');
  }
  

});

// @desc Auth user and get token;
// @routes POST api/users
// @acceess - public

const registeredUser = asyncHandler( async(req ,res) => {
   const {name,email,password} = req.body;

   const userExists = await User.findOne({email});

   if(userExists){
      res.status(400);
      throw new Error("User already Exists");
   }

   const user = await User.create({
      name,
      email,
      password,

   });

   if(user){
      generateToken(res , user._id);
      res.status(201).json({
         _id : user._id,
      name : user.name,
      email : user.email,
      isAdmin : user.isAdmin,
     

      })
   }else{
      res.status(401)
      throw new Error('Invalid user data');
   }
 
 });

 // @desc Log out user/ clear cookie 
// @routes POST api/users/logout
// @acceess - private

const logoutUser = asyncHandler( async(req ,res) => {
    res.cookie("jwt", '' , {
      httpOnly : true,
      expires : new Date(0),

    });

    res.status(200).json({message :'Logged out Successfully'});
 
 });

  // @desc get user profile
// @routes GET api/users/profile
// @acceess - private

const getUserProfile = asyncHandler( async(req ,res) => {
    const user = await User.findById(req.user._id);

    if(user){
      res.status(200).json({
         _id : user._id,
         name : user.name,
         email : user.email,
         isAdmin : user.isAdmin,

      })
    }else {
      res.status(404);
      throw new Error('User not found');

    }
 
 })

  // @desc get user profile
// @routes GET api/users/profile
// @acceess - private

const updateUserProfile = asyncHandler( async(req ,res) => {
    const user = await User.findById(req.user._id);

    if(user){
      user.name = req.body.name  || user.name;
      user.email = req.body.email  || user.email;

      if(req.body.password){
         user.password = req.body.password;
      }

      const updatedUser = await user.save();

      res.status(200).json({
         _id : updatedUser._id,
         name : updatedUser.name,
         email : updatedUser.email,
         isAdmin : updatedUser.isAdmin,

      });


    } else {
      res.status(404)
      throw new Error("User not found");
    }
 
 });

  // @desc get users
// @routes GET api/users
// @acceess - private/Admin

const getUsers = asyncHandler( async(req ,res) => {
   const users = await User.find({});
   res.status(200).send(users);
 
 });

  // @desc delete users
// @routes delete api/users/:id
// @acceess - private/Admin

const deleteUsers = asyncHandler( async(req ,res) => {
   const user = await User.findById(req.params.id);

   if(user){
      if(user.isAdmin){
         res.status(400)
         throw new Error("Cannot delete Admin");

      }

      await User.deleteOne({_id : user._id});
      res.status(200).json({message : "User Deleted Successfully"});
   }else{
      res.status(404)
   throw new Error("User Not Found");}
 
 });

  // @desc delete users
// @routes delete api/users/:id
// @acceess - private/Admin

const getUserById = asyncHandler( async(req ,res) => {
   const user = await User.findById(req.params.id).select("-password");

   if(user){
      res.status(200).send(user);

   }else{
      res.status(404)
      throw new Error("User Not Found");


   }
 
 });

   // @desc update users
// @routes PUT api/users/:id
// @acceess - private/Admin

const updateUser = asyncHandler( async(req ,res) => {
    const user = await User.findById(req.params.id);

    if(user){
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.isAdmin = Boolean(req.body.isAdmin);

      const updatedUser = await user.save();
      res.status(200).json({
         __id : updatedUser._id,
         name : updatedUser.name,
         email : updatedUser.email,
         isAdmin : updatedUser.isAdmin
      })

    }
 
 });
//  const createUser = asyncHandler(async (req, res) => {
//    const user = new User({
//      name: 'name',
//      email: 'Sample@gmail.com',
//      password: 'samplepassword',
    
//    });
 
//    try {
//      const createdUser = await user.save();
//      res.status(201).json(createdUser);
//    } catch (error) {
//      console.error('Error saving user:', error);
//      res.status(500).json({ error: 'Internal Server Error' });
//    }
//  });


//  const createUser = asyncHandler(async (req, res) => {
//    const user = new User({
//      name: 'name',
//      email : "Sample@gmail.com",
//      password : "samplepassword",
     
     
//    });
 
//    const createdUser = await user.save();
//    res.status(201).json(createdUser);
//  });
// Server-side
const createUser = asyncHandler(async (req, res) => {
   console.log('Request body:', req.body);

   const user = new User({
           name: 'name',
           email : "Sample@gmail.com",
           password : "samplepassword",
           
           
         });
 
   
 
   try {
      console.log("user" ,user);
     const createdUser = await user.save();
     res.status(201).json(createdUser);
     
   } catch (error) {
     console.error('Error saving user:', error);
     res.status(500).json({ error: 'Internal Server Error' });
   }
 });
 




export {getUserById,createUser,deleteUsers,registeredUser,getUserProfile,getUsers,updateUser,updateUserProfile,authUser,logoutUser,}



