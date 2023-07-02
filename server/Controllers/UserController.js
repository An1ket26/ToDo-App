const User=require("../Models/User");
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken')

const login=async(req,res)=>{
    try{
        const {mail,password}=req.body;
        const user=await User.findOne({mail});
        if(user && (await bcrypt.compare(password,user.password)))
        {
            const token=jwt.sign(
                {
                    userId:user._id,
                    mail,
                },
                process.env.TOKEN_KEY,
                {
                    expiresIn:"24h",
                }
            );
            return res.status(200).json({
                userDetails: {
                  mail: user.mail,
                  token: token,
                  username: user.username,
                  _id:user._id,
                },
            });
        }
    }catch(err)
    {
        console.log(err);
        return res.status(500).send("An Error occured.Please try again.");
    }
}

const register=async(req,res)=>{
    try{
        const {username,mail,password}=req.body;
        const userExist=await User.findOne({mail});
        // console.log(userExist);
        if (userExist) {
            return res.status(409).send("E-mail already in use.");
          }
        const encrpytPassword=await bcrypt.hash(password,10);

        const user =await User.create({
            username,
            mail,
            password:encrpytPassword,
        });
        const token = jwt.sign(
            {
              userId: user._id,
              mail,
            },
            process.env.TOKEN_KEY,
            {
              expiresIn: "24h",
            }
          );
      
          res.status(201).json({
            userDetails: {
              mail: user.mail,
              token: token,
              username: user.username,
              _id:user._id,
            },
          });
    }catch(err)
    {
        console.log(err);
        return res.status(500).send("An Error occured.Please try again.");
    }

}

module.exports={
    login,
    register
}