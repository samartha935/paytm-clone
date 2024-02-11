import express from "express";
import z from "zod";
import jwt from "jsonwebtoken"
import { User } from "../db/db";
import { JWT_SECRET } from "../config";

export const userRouter = express.Router();

const signUpSchema = z.object({
  firstName: z.string().max(30),
  lastNAme: z.string().max(30),
  username: z.string().min(3).max(10),
  email: z.string().email(),
  password: z.string().min(8).max(50),
});


const signInSchema = z.object({
    username: z.string().min(3).max(10),
    password: z.string().min(8).max(50),
  });

userRouter.post("/signup", async (req, res) => {
  try {
    const payload = req.body;
    const parsedPayload = signUpSchema.safeParse(payload);

    if (!parsedPayload.success) {
      res.status(411).json({
        msg: "You have entered wrong inputs.",
      });
    }

    const result = await User.findOne({
      username: req.body.username,
      email: req.body.email,
    });

    if (result) {
      res.status(409).json({
        msg: "This username / email already exists.",
      });
    } else {
      const user = await User.create(payload);
      const documentID = user._id
      const token  = jwt.sign({documentID}, JWT_SECRET)
      res.json({
        msg: "User created successfully.",
        token : token,
      });
    }
  } catch (err) {
    console.log(err);
  }
});



userRouter.post("/signin", async (req,res)=>{

    try {
    const payload = req.body

    const parsedPayload = signInSchema.safeParse(payload);

    if (!parsedPayload.success) {
      res.status(411).json({
        msg: "You have entered wrong inputs.",
      });
    }

    
    const result = await User.findOne({
        username: req.body.username,
        password : req.body.password
    })

    if(result){
        const documentID = result._id
        const token = jwt.sign(documentID, JWT_SECRET)
        res.json({
            msg : "You have signed in.",
            token : token
        })
    }else{
        res.json({
            msg : "Account dosent exists."
        })
    }}catch(err){
        console.log(err);
    }
})

