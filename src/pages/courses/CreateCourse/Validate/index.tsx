import * as Yup from 'yup'

const courseSchema = () =>
  Yup.object().shape({
    name: Yup.string().max(50, 'Maximum 50 symbols').required('Name is required'),
  })
export default courseSchema
