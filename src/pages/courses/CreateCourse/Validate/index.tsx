import * as Yup from 'yup'

const courseSchema = () =>
  Yup.object().shape({
    name: Yup.string().max(50, 'Maximum 50 symbols').required('Name is required'),
    title: Yup.string().max(50, 'Maximum 50 symbols').required('Title is required'),
    authorName: Yup.string().max(50, 'Maximum 50 symbols').required('Author name is required'),
    categories: Yup.array().min(1, 'Categories must have at least one item'),
    thumbnail: Yup.array().min(1, 'Thumbnail is required'),
    lessons: Yup.array().of(
      Yup.object().shape({
        title: Yup.string().required('Lesson title is required'),
        description: Yup.string().required('Lesson description is required'),
        videoUrl: Yup.string().required('Video is required'),
        thumbnail: Yup.array().min(1, 'Thumbnail is required'),
      })
    ),
    overview: Yup.object().shape({
      slogan: Yup.string().required('Slogan is required'),
      description: Yup.string().required('Description is required'),
      skills: Yup.array().of(
        Yup.object().shape({
          imageUrl: Yup.array().min(1, 'Image is required'),
          title: Yup.string().required('Title is required'),
        })
      ),
    }),
    videoPreview: Yup.object().shape({
      thumbnail: Yup.array().min(1, 'Thumbnail preview is required'),
      url: Yup.string().required('Video preview is required'),
    }),
  })
export default courseSchema
