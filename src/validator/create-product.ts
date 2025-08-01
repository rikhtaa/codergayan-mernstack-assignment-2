import { checkSchema } from "express-validator";

export default checkSchema({
  name: {
    errorMessage: 'Invalid name',
     notEmpty: true,
  },
  description: {
    errorMessage: 'Invalid description',
    notEmpty: true,
  },
});