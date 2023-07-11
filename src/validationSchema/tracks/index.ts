import * as yup from 'yup';

export const trackValidationSchema = yup.object().shape({
  name: yup.string().required(),
  difficulty_level: yup.number().integer().required(),
  terrain: yup.string().required(),
  obstacles: yup.string().required(),
  organization_id: yup.string().nullable(),
});
