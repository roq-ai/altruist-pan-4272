import * as yup from 'yup';

export const bikeValidationSchema = yup.object().shape({
  name: yup.string().required(),
  speed: yup.number().integer().required(),
  handling: yup.number().integer().required(),
  acceleration: yup.number().integer().required(),
  organization_id: yup.string().nullable(),
});
