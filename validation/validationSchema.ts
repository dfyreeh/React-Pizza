import * as Yup from "yup";

export interface UserFormValues {
  firstName: string;
  lastName: string;
  phone: string;
  address: string;
}

export const userValidationSchema = Yup.object({
  firstName: Yup.string()
    .min(2, "Занадто коротке ім'я")
    .required("Обов'язкове поле"),
  lastName: Yup.string()
    .min(2, "Занадто коротке прізвище")
    .required("Обов'язкове поле"),
  phone: Yup.string()
    .matches(/^\+?\d+$/, "Тільки цифри та + спочатку")
    .test(
      "exact-10-digits",
      "Номер повинен містити 10 цифр",
      (value) => {
        if (!value) return false; 
        const mainNumber = value.startsWith("+38") ? value.slice(3) : value;
        const digitsOnly = mainNumber.replace(/\D/g, "");
        return digitsOnly.length === 10;
      }
    ),
  address: Yup.string()
    .min(5, "Занадто коротка адреса")
    .required("Обов'язкове поле"),
});
