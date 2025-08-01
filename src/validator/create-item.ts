import { checkSchema } from "express-validator";

export default checkSchema({
  price: {
    errorMessage: 'Invalid price',
     notEmpty: true,
     isNumeric: true,
      toFloat: true, 

  },
  productId: {
    errorMessage: 'Invalid productId',
    notEmpty: true,
    isInt: true,
     toInt: true, 
  },
});