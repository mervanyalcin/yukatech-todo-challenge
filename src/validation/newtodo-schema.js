import Yup from "./validate";

export const NewTodoSchema = Yup.object().shape({
  title: Yup.string().required(),
});
