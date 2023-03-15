import * as Yup from 'yup'

const courseSchema = () =>
  Yup.object().shape({
    name: Yup.object().shape({
      en: Yup.string().required('Name is required'),
    }),
    title: Yup.object().shape({
      en: Yup.string().required('Title is required'),
    }),
    authorName: Yup.string().required('Author name is required'),
    categories: Yup.array().min(1, 'Categories must have at least one item'),
    thumbnail: Yup.array().min(1, 'Thumbnail is required'),
    lessons: Yup.array().of(
      Yup.object().shape({
        title: Yup.object().shape({
          en: Yup.string().required('Lesson title is required'),
        }),
        description: Yup.object().shape({
          en: Yup.string().required('Lesson description is required'),
        }),
        videoUrl: Yup.string().required('Video is required'),
        thumbnail: Yup.array().min(1, 'Thumbnail is required'),
      })
    ),
    overview: Yup.object().shape({
      slogan: Yup.object().shape({
        en: Yup.string().required('Slogan is required'),
      }),
      description: Yup.object().shape({
        en: Yup.string().required('Description is required'),
      }),
      skills: Yup.array().of(
        Yup.object().shape({
          imageUrl: Yup.array().min(1, 'Image is required'),
          title: Yup.object().shape({
            en: Yup.string().required('Title is required'),
          }),
        })
      ),
    }),
    videoPreview: Yup.object().shape({
      thumbnail: Yup.array().min(1, 'Thumbnail preview is required'),
      url: Yup.string().required('Video preview is required'),
    }),
  })
export default courseSchema
