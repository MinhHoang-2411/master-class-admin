import * as Yup from 'yup'

const categorySchema = () =>
  Yup.object().shape({
    name: Yup.object().shape({
      en: Yup.string().max(50, 'Maximum 50 symbols').required('English name is required'),
    }),
  })
export default categorySchema
