const express = require("express")
const Productmodel = require('../models/product.model')

const productRoute = express.Router()

// create product
productRoute.post('/create-product', async(req, res) => {
    const { name, price, description } = req.body
    try {
        let product = await Productmodel.find({name: req.body.name})
        console.log(product)
        if(product.length!=0){
            res.json({"massage": "product already present" , product})
            return
        }
        const newProduct = new Productmodel({
            name,
            price,
            description
        })
        await newProduct.save()
        res.status(201).send("product created successfully")

    } catch (error) {
        res.status(404).send(`error creating product ${error}`)
    }
   
})

// read product

productRoute.get('/read-product', async(req,res) => {
  try {
    const products = await Productmodel.find()
    res.status(200).json({"massage":"products fetched successfully" , products})
  } catch (error) {
    res.status(401).send(`error fetching products ${error}`)
  }
})

// update product

productRoute.patch('/update-product/:id', async(req,res) => {
    const {id} = req.params;
    try {
        const UpdateProduct = await Productmodel.findByIdAndUpdate({_id: id},req.body)
        res.status(200).json({"massage": "product updated successfully" , UpdateProduct})
    } catch (error) {
        res.status(401).send(`error updating products ${error}`)
    }
})

// delete product

productRoute.delete('/delete-product/:id', async(req,res) => {
    const {id} = req.params;
    try {
        const DeleteProduct = await Productmodel.findByIdAndDelete({_id: id})
        res.status(200).json({"massage": "Product deleted successfully" , DeleteProduct})
    } catch (error) {
        res.status(401).send(`error deleting products ${error}`)
    }
})

module.exports = productRoute