import * as Yup from "yup"

export const signUpSchema = Yup.object({
  username: Yup.string().min(3).max(20).required("Please enter your name"),
  email: Yup.string().email().required("Please enter your email"),
  password: Yup.string().min(6).required("Please enter your password"),
  cpassword: Yup.string()
    .required()
    .oneOf([Yup.ref("password"), null, "Password must match"]),
})

export const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email format")
    .required("Please enter your email"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Please enter your password"),
})
