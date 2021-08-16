import * as Yup from "yup";

export const signUpFormValidation = Yup.object().shape({
  fullName: Yup.string()
    .min(2, "Must be more than 2 letters!")
    .max(70, "Cannot exceed more than 70 characters")
    .required("Must provide your full name!"),
  email: Yup.string()
    .min(2, "Must be more than 2 letters!")
    .required("Must provide your email!"),
  username: Yup.string()
    .test("username", "Cannot contain spaces!", (value: string | undefined) => {
      if (!value) {
        return false;
      }
      if (value.includes(" ")) {
        return false;
      }
      return true;
    })
    .min(4, "Must be longer than 4 letters!")
    .max(22, "Cannot be longer than 22 letters")
    .required("Username must be provided!"),
  password: Yup.string()
    .min(6, "Password must be longer than 6 letters")
    .max(22, "Cannot be longer than 22 letters")
    .required("Must add password"),
  repassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match!")
    .required("Passwords must match!")
});

export const loginFormValidation = Yup.object().shape({
  username: Yup.string().required("Username must be provided!"),
  password: Yup.string().required("Password must be provided!")
});
