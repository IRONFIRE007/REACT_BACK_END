const {Router} = require('express');
const router = Router();
const  {check} = require('express-validator');
const  {validator} = require('../middlewares/validator')

//Controllers 

const {createUser,loginUser,renewToken} = require('../controllers/auth');
const {validateJWT} = require('../middlewares/validate-jwt')


//Routes 

router.post('/new',[
    //Middlewares
check('name','The name is Required').not().isEmpty(),
check('email','The Email is Required').isEmail(),
check('password','The Password is Required and should have most the six characters').isLength({min:6}),validator
],createUser);


router.post('/',[check('email','The Email is Required').isEmail(),
check('password','The Password is Required ').isLength({min:6}),validator],loginUser);

router.get('/renew',validateJWT,renewToken);


module.exports = router;