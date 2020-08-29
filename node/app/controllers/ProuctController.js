const Controller = require("./Controller");
const Products = require('../models/ProductSchema').Product;
const _ = require("lodash");

class ProductController extends Controller{
    constructor(){
        super();
    }

    /*************************************************************************************
     get all product
     **************************************************************************************/
    async getAllProduct(req, res){

        let _this = this;

        if(!_this.req.params.pageNumber || !_this.req.params.pageSize) {
            return __this.res.send({status : 0 , message:'Page number and page size is missing.'});
        }
        let skip = Number(_this.req.params.pageNumber - 1) * Number(_this.req.params.pageSize);

        try {
            const productData = await Products.find().skip(skip).limit(Number(_this.req.params.pageSize)).sort({ '_id': -1});
            const totalProduct = await Products.find().count();

            if (!productData) { return _this.res.send({status : 0 , message:'No product exist.'}); }
            return _this.res.send({status : 1 , message:'List of all products.', data: productData, totalProduct: totalProduct})
        } catch (error) {
            console.log("error- ", error);
            _this.res.send({status : 0 , message:'An internal error has occurred, please try again.'});
        }
    }
}

module.exports = ProductController;