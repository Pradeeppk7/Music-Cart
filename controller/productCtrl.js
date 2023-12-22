const expressAsyncHandler = require("express-async-handler");
const Product = require("../models/productModel");

const createProduct = expressAsyncHandler(async (req, res) => {
    try {
        const newProduct = await Product.create(req.body);
        res.json(newProduct);  
    }
    catch(error) {
        throw new Error(error);
    }
    
});

const getaProduct = expressAsyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        const findProduct = await Product.findById(id);
        res.json(findProduct);
        
    }
    catch (error) {
        throw new Error(error);
    }
})

const getallProduct = expressAsyncHandler(async (req, res) => {
    try {

        //filter ?price[gte]=100&price[lte]=300
        const queryObj = { ...req.query };
        const excludeFields = ['page', 'sort', 'limit', 'fields'];
        excludeFields.forEach((el) => delete queryObj[el]);
        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
        let query = Product.find(JSON.parse(queryStr));

        //sorting ?sort=-price
        if (req.query.sort) {
            let sortBy = req.query.sort.split(",").join(" ");
            query = query.sort(sortBy);
        } else {
            query = query.sort("-createdAt");
        }

        //limiting the fields ?fields=title,description
        if (req.query.fields) {
            const fields = req.query.fields.split(",").join(" ");
            query = query.select(fields);
        }
        else {
            query = query.select("-__v");
        }

        //pagination ?page=2&limit=3
        const page = req.query.page;
        const limit = req.query.limit;
        const skip = (page - 1) * limit;
        query = query.skip(skip).limit(limit);
        if (req.query.page) {
            const productCount = await Product.countDocuments();
            if (skip >= productCount) throw new Error('This Page does not exists');
        }


        const product = await query;
        res.json(product);
    }
    catch (error) {
        throw new Error(error);
    }
})
module.exports = { createProduct, getaProduct, getallProduct };