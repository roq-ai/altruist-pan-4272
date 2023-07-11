import * as yup from 'yup';

export const aiOpponentValidationSchema = yup.object().shape({
  name: yup.string().required(),
  skill_level: yup.number().integer().required(),
  organization_id: yup.string().nullable(),
});
