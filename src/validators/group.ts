import * as yup from "yup";

export const groupSchema = yup.object().shape({
  listGroups: yup.array().of(
    yup.object().shape({
      group: yup.string().required(),
      items: yup.array(),
    })
  ),
});

export type GroupForm = yup.InferType<typeof groupSchema>;
