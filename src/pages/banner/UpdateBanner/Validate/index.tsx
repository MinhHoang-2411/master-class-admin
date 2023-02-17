import * as Yup from 'yup'

const bannerSchema = () =>
  Yup.object().shape({
    name: Yup.string().max(50, 'Maximum 50 symbols').required('Name is required'),
    title: Yup.string().max(50, 'Maximum 50 symbols').required('Tilte is required'),
    description: Yup.string().max(300, 'Maximum 50 symbols').required('Description is required'),
  })

export default bannerSchema
