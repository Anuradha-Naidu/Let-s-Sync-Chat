import User from '../models/user.models.js';
import bcrypt from "bcryptjs";

export const signup = async(req, res) => {
 try { 
  const {fullName, userName, password, confirmPassword, gender} = req.body; //inputs from the user

  if(password !== confirmPassword){
   return res.status(400).json({error:"Password and Confirm Password do not match!"}) //check this condition 
  }

  const user = await User.findOne({userName}); 
  //check if user exists in database
  if(user){
   return res.status(400).json({error:"Username alreadys exists"}) 
  }

  //hash password here  
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  //https://avatar-placeholder.iran.liara.run/
  //https://avatar.iran.liara.run/public/68

  //determined the user profile 
  const girlProficPic = `https://avatar.iran.liara.run/public/girl?username=${userName}`
  const boyProficPic = `https://avatar.iran.liara.run/public/boy?username=${userName}`

  const newUser = new User({  //created User with all above inputs passed
   fullName,
   userName,
   password: hashedPassword,
   gender,
   profilePic: gender === "male" ? boyProficPic: girlProficPic
  })

  await newUser.save();
  res.status(201).json({
   _id: newUser._id,
   fullName: newUser.fullName,
   userName: newUser.userName,
   profilePic: newUser.profilePic

  })

  }catch (error){
   console.log("Error in signup controller", error.message);
   res.status(500).json({error:"Internal Server Error"});
  }

}

export const login = (req, res) => {
 res.send("Login User");
 console.log("loginUser");
}

export const logout = (req, res) => {
 res.send("Logout User");
 console.log("logoutUser");
}