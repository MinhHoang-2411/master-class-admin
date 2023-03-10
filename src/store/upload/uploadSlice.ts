import {createSlice, PayloadAction} from '@reduxjs/toolkit'

interface IStateUpload {
  thumbnail: any
  lessonVideo: any
  lessonImage: any
  previewVideo: any
  previewImage: any
  overviewImage: any

  loadingThumbnail: any
  loadingLessonVideo: any
  loadingLessonImage: any
  loadingPreviewVideo: any
  loadingPreviewImage: any
  loadingOverviewImage: any

  loadingClearStore: any
  error: any
}
const initialState: IStateUpload = {
  thumbnail: [],
  lessonVideo: [],
  lessonImage: [],
  previewVideo: [],
  previewImage: [],
  overviewImage: [],

  loadingThumbnail: false,
  loadingLessonVideo: false,
  loadingLessonImage: false,
  loadingPreviewVideo: false,
  loadingPreviewImage: false,
  loadingOverviewImage: false,

  loadingClearStore: false,
  error: null,
}

const uploadSlice = createSlice({
  name: 'upload',
  initialState,
  reducers: {
    //
    uploadThumbail: (state) => {
      state.loadingThumbnail = true
    },
    uploadThumbailSuccess: (state, action: PayloadAction<any>) => {
      state.loadingThumbnail = false
      state.thumbnail = action.payload
    },
    uploadThumbailFailure: (state, action) => {
      state.loadingThumbnail = false
      state.error = action.payload
    },
    deleteThumbnail: (state) => {
      state.thumbnail = []
    },
    //
    uploadLessonVideo: (state) => {
      state.loadingLessonVideo = true
    },
    uploadLessonVideoSuccess: (state, action: PayloadAction<any>) => {
      state.loadingLessonVideo = false
      state.lessonVideo = action.payload
    },
    uploadLessonVideoFailure: (state, action) => {
      state.loadingLessonVideo = false
      state.error = action.payload
    },
    deleteLessonVideo: (state) => {
      state.lessonVideo = []
    },
    //
    uploadLessonImage: (state) => {
      state.loadingLessonImage = true
    },
    uploadLessonImageSuccess: (state, action: PayloadAction<any>) => {
      state.loadingLessonImage = false
      state.lessonImage = action.payload
    },
    uploadLessonImageFailure: (state, action) => {
      state.loadingLessonImage = false
      state.error = action.payload
    },
    deleteLessonImage: (state) => {
      state.lessonImage = []
    },
    //
    uploadPreviewVideo: (state) => {
      state.loadingPreviewVideo = true
    },
    uploadPreviewVideoSuccess: (state, action: PayloadAction<any>) => {
      state.loadingPreviewVideo = false
      state.previewVideo = action.payload
    },
    uploadPreviewVideoFailure: (state, action) => {
      state.loadingPreviewVideo = false
      state.error = action.payload
    },
    deletePreviewVideo: (state) => {
      state.previewVideo = []
    },
    //
    uploadPreviewImage: (state) => {
      state.loadingPreviewImage = true
    },
    uploadPreviewImageSuccess: (state, action: PayloadAction<any>) => {
      state.loadingPreviewImage = false
      state.previewImage = action.payload
    },
    uploadPreviewImageFailure: (state, action) => {
      state.loadingPreviewImage = false
      state.error = action.payload
    },
    deletePreviewImage: (state) => {
      state.previewImage = []
    },
    //
    uploadOverviewImage: (state) => {
      state.loadingOverviewImage = true
    },
    uploadOverviewImageSuccess: (state, action: PayloadAction<any>) => {
      state.loadingOverviewImage = false
      state.overviewImage = action.payload
    },
    uploadOverviewImageFailure: (state, action) => {
      state.loadingOverviewImage = false
      state.error = action.payload
    },
    deleteOverViewImage: (state, action: PayloadAction<any>) => {
      state.overviewImage = []
    },

    clearStore: (state) => {
      state.loadingClearStore = true
    },
    clearStoreSuccess: (state, action: PayloadAction<any>) => {
      state.loadingClearStore = false
      state.thumbnail = []
      state.lessonVideo = []
      state.lessonImage = []
      state.previewVideo = []
      state.previewImage = []
      state.overviewImage = []
    },
    clearStoreFailure: (state, action) => {
      state.loadingClearStore = false
      state.error = action.payload
    },
  },
})

//
export const uploadActions = uploadSlice.actions

//
const uploadReducer = uploadSlice.reducer
export default uploadReducer
