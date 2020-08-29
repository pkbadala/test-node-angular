
module.exports = (app, express)=>{

    const router = express.Router(); 
    const ProuctController = require('../controllers/ProuctController');
    
    // get list of products
    router.get('/getAllProduct/:pageNumber/:pageSize/', (req, res, next) => {
        const productObj = (new ProuctController()).boot(req, res);
        return productObj.getAllProduct();
    });

    app.use(config.baseApiUrl, router);
}