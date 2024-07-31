const express = require("express")
const Usermodel = require('../models/user.model')

const userRoute = express.Router()

// create user
userRoute.post('/create-user', async(req, res) => {
    const { name, age, city } = req.body
    try {
        let user = await Usermodel.find({name: req.body.name})
        console.log(user)
        if(user.length!=0){
            res.json({"massage": "user already present" , user})
            return
        }
        const newUser = new Usermodel({
            name,
            age,
            city
        })
        await newUser.save()
        res.status(201).send("user created successfully")

    } catch (error) {
        res.status(404).send(`error creating user ${error}`)
    }
   
})

// read user

userRoute.get('/read-user', async(req,res) => {
  try {
    const users = await Usermodel.find()
    res.status(200).json({"massage":"user data fetched successfully" , users})
  } catch (error) {
    res.status(401).send(`error fetching users ${error}`)
  }
})

// update user

userRoute.patch('/update-user/:id', async(req,res) => {
    const {id} = req.params;
    try {
        const UpdateUser = await Usermodel.findByIdAndUpdate({_id: id},req.body)
        res.status(200).json({"massage": "user data updated successfully" , UpdateUser})
    } catch (error) {
        res.status(401).send(`error updating users ${error}`)
    }
})

// delete user

userRoute.delete('/delete-user/:id', async(req,res) => {
    const {id} = req.params;
    try {
        const DeleteUser = await Usermodel.findByIdAndDelete({_id: id})
        res.status(200).json({"massage": "user data deleted successfully" , DeleteUser})
    } catch (error) {
        res.status(401).send(`error deleting users ${error}`)
    }
})

module.exports = userRoute