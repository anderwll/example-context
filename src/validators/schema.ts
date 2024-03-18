import * as yup from "yup";

export const schema = yup.object().shape({
  id: yup.string().required(),
  name: yup.string().required(),
  total: yup.number().required(),
  subItems: yup.array().of(
    yup.object().shape({
      id: yup.string().required(),
      value: yup.number().required(),
    })
  ),
});

export type SchemaForm = yup.InferType<typeof schema>;
