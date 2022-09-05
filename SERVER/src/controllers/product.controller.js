const { Router } = require("express")
const { auth } = require('../middleware/auth');
const Product = require('../models/product.model');

const router = Router();

router.post('/product', auth,  async (req, res) => {
    try{
        const product = await Product.create(req.body)
        return res.status(200).send(product)
    }
    catch (error) {
        return res.status(500).send({message: error.message})
    }
})

router.get('/product/:id', auth,  async(req, res) => {
    try{
        const product = await Product.findById(req.params.id).lean().exec()
        return res.status(200).send(product)

    } catch(error) {
        return res.status(500).send({message : error.message})
    }

})

router.delete("/product/:id", auth, async (req, res) => {
    try {
      const product = await Product.findByIdAndDelete(req.params.id).lean().exec();
  
      res.status(200).send(product);
    } catch (error) {
      return res.status(500).send(error.message);
    }

});

router.patch("/product/:id", auth, async (req, res) => {
    try {
      const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      if (!product) {
        return res.status(404).send("No Product Data Found");
      }
      res.status(200).send(product);
    } catch (error) {
        return res.status(500).send(error.message);
      }
  
});


// https://syofts.herokuapp.com/products?q=filter&base=campas     filter by campus
// https://syofts.herokuapp.com/products?q=sort&sort=1            accending order
// https://syofts.herokuapp.com/products?q=search&block=nike     search the products name





router.get('/products', auth,  async(req, res) => {

    try{
        const page = req.query.page || 1
        const limit = req.query.limit || 10
        let totalPages = 0;
        let products
        if(req.query.q) {
           if(req.query.q == 'filter')
            {
                products = await Product.find({name: req.query.base}).skip((page - 1) * limit).limit(limit).lean().exec()
                const totalDocs = await Product.find({name: req.query.base}).countDocuments()
                totalPages = (Math.ceil(totalDocs/limit))
            }
            else
                {
                    products = await Product.find({name : req.query.block}).skip((page - 1) * limit).limit(limit).lean().exec()
                    const totalDocs = await Product.find({name : req.query.block}).countDocuments()
                    totolPages = (Math.ceil(totalDocs/limit))
                }
        }
        else{
            products = await Product.find().skip((page - 1) * limit).limit(limit).lean().exec()
            const totalDocs = await Product.find().countDocuments()
            totalPages = (Math.ceil(totalDocs/limit))

        }
        let arr = []
        for(let i = 1; i<=totalPages; i++)
        {
            arr.push(i)

        }
        return res.status(200).send({products, totalPages:arr})
    } catch (error) {
        return req.status(500).send({message : error.message})
    }
})
module.exports = router;