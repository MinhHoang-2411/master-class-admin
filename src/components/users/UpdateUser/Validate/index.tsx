import * as Yup from 'yup'

const courseSchema = () =>
  Yup.object().shape({
    firstName: Yup.string().required('First name is required'),
    lastName: Yup.string().required('Last name is required'),
  })
export default courseSchema
