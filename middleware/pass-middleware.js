const { z } = require("zod");
const passwordValidation = new RegExp(
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
  );
const passSchema = z.object({
    password: z
    .string({ required_error: "Password is required" })
    .min(6, { message: "Password must be at least of 6 characters" })
    .max(24, "Password can't be greater than 24 characters")
    .regex(passwordValidation, {
      message: 'At least one uppercase ,one lowercase letter, one number and one special character',
    })
})
module.exports = passSchema;