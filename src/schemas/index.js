import * as Yup from "yup";

export const signUpSchema = Yup.object({
  name: Yup.string().min(2).max(20).required("Please enter your name"),
  email: Yup.string().email().required("Please enter your email"),
  password: Yup.string().min(6).required("Please enter your password"),
  confirm_password: Yup.string()
    .required()
    .oneOf([Yup.ref("password"), null], "Password must match"),
  terms: Yup.boolean()
    .oneOf([true], "Please accept the terms and conditions")
    .required("Please accept the terms and conditions"),
});
export const contactForm = Yup.object({
  email: Yup.string().email().required("Please enter your email"),
  subject: Yup.string().required("Please write the subject"),
  message: Yup.string().required("Please write the description"),
});
