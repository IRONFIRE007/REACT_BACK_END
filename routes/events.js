//Events  Routes
//api/events

const {validateJWT} = require('../middlewares/validate-jwt')
const {Router} = require('express');
const {check} = require('express-validator');
const {validator} = require('../middlewares/validator');
const router = Router();

const {getEvents,postEvent,UpdatetEvent,DeleteEvent} = require('../controllers/events');
const { isDate } = require('../helpers/isDate');


router.use(validateJWT);

router.get('/',getEvents);

router.post('/',[
    check('title','The title is Required').not().isEmpty(),
    check('start','The firts Date  is Required').custom(isDate), check('end','The last Date  is Required').custom(isDate),
    validator
],postEvent);

router.put('/:id',UpdatetEvent);

router.delete('/:id',DeleteEvent);

module.exports = router;