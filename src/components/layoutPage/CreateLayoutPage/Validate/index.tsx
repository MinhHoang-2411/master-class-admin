import * as Yup from 'yup'

const layoutSchema = () =>
  Yup.object().shape({
    trailer: Yup.object().shape({
      thumbnail: Yup.array().min(1, 'Thumbnail preview is required'),
      url: Yup.string().required('Video preview is required'),
      description: Yup.string().required('Description preview is required'),
    }),
    welcome: Yup.object().shape({
      thumbnail: Yup.array().min(1, 'Thumbnail preview is required'),
      url: Yup.string().required('Video preview is required'),
      description: Yup.string().required('Description preview is required'),
    }),
    messagesTeam: Yup.array().of(
      Yup.object().shape({
        url: Yup.string().required('Video is required'),
        thumbnail: Yup.array().min(1, 'Thumbnail is required'),
      })
    ),
  })
export default layoutSchema
