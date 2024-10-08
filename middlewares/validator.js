const validator = require('joi')

const schemas = {
      fullName: validator.string()
      .min(6)
      .custom((value) => {
        // Trim leading/trailing spaces and collapse multiple spaces into a single space
        return value.trim().replace(/\s+/g, ' ');
      })
      .pattern(new RegExp("^[A-Za-z]+ [A-Za-z]+$")) // Ensures first and last names
      .required()
      .messages({
        "any.required": "Full name is required.",
        "string.empty": "Full name cannot be empty.",
        "string.min": "Full name must be at least 6 characters long.",
        "string.pattern.base": "Please provide both first and last names separated by a single space.",
        "string.base": "Full name cannot be empty.",
      }),
      customerFirstName: validator.string()
      .min(3)
      .trim()
      .pattern(/^[A-Za-z]+$/)
      .required()
      .messages({
        "any.required": "First name is required.",
        "string.empty": "First name cannot be empty.",
        "string.min": "First name must be at least 3 characters long.",
        "string.pattern.base": "First name must contain only alphabetic characters.",
        "string.base": "First name cannot be empty."
    }),
    customerLastName: validator.string()
      .min(3)
      .trim()
      .pattern(/^[A-Za-z]+$/)
      .required()
      .messages({
        "any.required": "Last name is required.",
        "string.empty": "Last name cannot be empty.",
        "string.min": "Last name must be at least 3 characters long.",
        "string.pattern.base": "Last name must contain only alphabetic characters.",
        "string.base": "Last name cannot be empty."
    }),
    email: validator.string().trim().email().required().messages({
      "any.required": "Email is required.",
      "string.email": "Invalid email format.",
      "string.base": "Email cannot be empty.",
      "string.pattern.base": "Email cannot be empty."
  }),
  username: validator.string()
  .min(3)
  .max(30)
  .pattern(new RegExp("^[a-zA-Z0-9]+$")) // Allows only alphabets and numbers
  .required()
  .messages({
    "any.required": "Username is required.",
    "string.empty": "Username cannot be empty.",
    "string.min": "Username must be at least 3 characters long.",
    "string.max": "Username must be less than or equal to 30 characters long.",
    "string.pattern.base": "Username can only contain letters and numbers.",
    "string.base": "Username must be a valid string.",
  }),
    phoneNumber:validator.string()
    .length(11)
    .pattern(/^\d+$/)
    .required()
    .messages({
      "any.required": "Phone number is required.",
      "string.length": "Phone number must be exactly 11 digits.",
      "string.pattern.base": "Phone number must contain only numeric digits.",
      "string.base": "Phone number cannot be empty."
      }),
    customerPhoneNumber:validator.string()
    .length(11)
    .pattern(/^\d+$/)
    .required()
    .messages({
      "any.required": "Phone number is required.",
      "string.length": "Phone number must be exactly 11 digits.",
      "string.pattern.base": "Phone number must contain only numeric digits.",
      "string.base": "Phone number cannot be empty."
      }),
    password:validator.string()
    .pattern(new RegExp("^(?=.*[!@#$%^&*.])(?=.*[A-Z]).{8,}$"))
    .required()
    .messages({
      "any.required": "Password is required.",
      "string.base": "Password must contain at least 8 characters, one capital letter, and one special character (!@#$%^&*.).",
      "string.pattern.base":
      "Password must contain at least 8 characters, one capital letter, and one special character (!@#$%^&*.).",}),
    address:validator.string().required().regex(/^[a-zA-Z0-9-,\. ]+$/).messages({
        'string.pattern.base': 'Address can contain only alphabetic characters, numbers, spaces, or punctuations.',
        'any.required': 'Address is required.',
        'string.empty': 'Address cannot be empty.',
        "string.base": "Address cannot be empty."
      }),
    customerAddress:validator.string().required().regex(/^[a-zA-Z0-9-,\. ]+$/).messages({
        'string.pattern.base': 'Address can contain only alphabetic characters, numbers, spaces, or punctuations.',
        'any.required': 'Address is required.',
        'string.empty': 'Address cannot be empty.',
        "string.base": "Address cannot be empty."
      }),
    newPassword:validator.string()
    .pattern(new RegExp("^(?=.*[!@#$%^&*.])(?=.*[A-Z]).{8,}$"))
    .required()
    .messages({
      "any.required": "New password is required.",
      "string.base": "New password must contain at least 8 characters, one capital letter, and one special character (!@#$%^&*.).",
      "string.pattern.base":
      "Password must contain at least 8 characters, one capital letter, and one special character (!@#$%^&*.).",}),
    description:validator.string()
    .pattern(/^[a-zA-Z0-9\s.,!?'"()&%$#@*-]{1,400}$/, 'store description')
    .max(400)
    .required()
    .messages({
      'string.base': 'Store description must be a string.',
      'string.pattern.name': 'Store description can only contain letters, numbers, spaces, and common punctuation marks.',
      'string.max': 'Store description cannot exceed 400 characters.',
      'any.required': 'Store description is required.',
    }),
    city: validator.string()
    .custom(value => value.trim())  // Trim leading and trailing whitespace
    .pattern(new RegExp("^[A-Za-z]+(\\s[A-Za-z]+)?$"))  // Allow one or two words separated by a single space
    .required()
    .messages({
      "any.required": "City is required.",
      "string.empty": "City cannot be empty.",
      "string.pattern.base": "City can only contain one or two words with alphabetic characters.",
      "string.base": "City cannot be empty."
    })

}

const midasValidator = (validateAllFields = false) => {
  return async (req, res, next) => {
      const keysToValidate = {};

      if (validateAllFields) {
          Object.keys(schemas).forEach((key) => {
              keysToValidate[key] = schemas[key].required();
          });
      } else {
          Object.keys(req.body).forEach((key) => {
              if (schemas[key]) {
                  keysToValidate[key] = schemas[key];
              }
          });
      }
      const schema = validator.object(keysToValidate);

      const { error } = schema.validate(req.body, { abortEarly: false });

      if (error) {
        return res.status(400).json({
            errors: error.details.map(detail => detail.message) // Return all error messages
        });
    } else {
          return next();
      }
  };
}

module.exports = midasValidator