import * as Yup from 'yup'

const courseSchema = () =>
  Yup.object().shape({
    name: Yup.string().max(50, 'Maximum 50 symbols').required('Name is required'),
    title: Yup.string().max(50, 'Maximum 50 symbols').required('Title is required'),
    authorName: Yup.string().max(50, 'Maximum 50 symbols').required('Author name is required'),
    categories: Yup.array().min(1, 'Categories must have at least one item'),
    // thumbnail: Yup.array().min(1, 'Thumbnail must have at least one item'),
  })
export default courseSchema
