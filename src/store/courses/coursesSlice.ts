import {createSlice, PayloadAction} from '@reduxjs/toolkit'

interface IInitialStateCategory {
  data: any
  dataDetail: any

  thumbnail: any
  lessonVideo: any
  lessonImage: any
  previewVideo: any
  previewImage: any
  overviewImage: any

  loadingGetData: boolean
  loadingGetDetail: boolean
  loadingUploadThumbnail: boolean
  loadingUploadVideo: boolean
  loadingCreateCourse: boolean
  loadingUpdateCourse: boolean
  loadingDeleteCourse: boolean
  loadingDeleteVideo: boolean

  loadingLessonImage: boolean
  loadingPreviewVideo: boolean
  loadingPreviewImage: boolean
  loadingOverviewImage: boolean
  paginate: any
  error: any
}
const initialState: IInitialStateCategory = {
  data: null,

  thumbnail: [],
  lessonVideo: [],
  lessonImage: [],
  previewVideo: [],
  previewImage: [],
  overviewImage: [],

  dataDetail: null,
  paginate: null,
  loadingGetData: false,
  loadingGetDetail: false,
  loadingUploadThumbnail: false,
  loadingUploadVideo: false,

  loadingLessonImage: false,
  loadingPreviewVideo: false,
  loadingPreviewImage: false,
  loadingOverviewImage: false,

  loadingCreateCourse: false,
  loadingUpdateCourse: false,
  loadingDeleteCourse: false,
  loadingDeleteVideo: false,
  error: null,
}

const coursesSlice = createSlice({
  name: 'courses',
  initialState,
  reducers: {
    getDataStart: (state) => {
      state.loadingGetData = true
    },
    getDataSuccess: (state, action: PayloadAction<any>) => {
      state.loadingGetData = false
      state.data = action.payload.data
      state.paginate = action.payload.paginate
      state.thumbnail = []
      state.lessonVideo = []
      state.error = null
    },
    getDataFailure: (state, action: PayloadAction<any>) => {
      state.loadingGetData = false
      state.data = null
      state.error = action.payload
    },

    getDetailStart: (state, action: PayloadAction<string>) => {
      state.loadingGetDetail = true
    },
    getDetailSuccess: (state, action: PayloadAction<any>) => {
      state.loadingGetDetail = false
      state.dataDetail = action.payload
      state.error = null
    },
    getDetailFailure: (state, action) => {
      state.loadingGetDetail = false
      state.dataDetail = null
      state.error = action.payload
    },

    onCreateCourse: (state, action: PayloadAction<string>) => {
      state.loadingCreateCourse = true
    },

    onCreateCourseSuccess: (state, action: PayloadAction<any>) => {
      state.loadingCreateCourse = false
      state.error = null
    },

    onCreateCourseFailure: (state, action) => {
      state.loadingGetDetail = false
      state.error = action.payload
    },

    onUpdateCourse: (state, action: PayloadAction<string>) => {
      state.loadingUpdateCourse = true
    },

    onUpdateCourseSuccess: (state, action: PayloadAction<any>) => {
      state.loadingUpdateCourse = false
      state.error = null
    },

    onUpdateCourseFailure: (state, action) => {
      state.loadingUpdateCourse = false
      state.error = action.payload
    },

    onDeleteCourse: (state, action: PayloadAction<string>) => {
      state.loadingDeleteCourse = true
    },

    onDeleteCourseSuccess: (state, action: PayloadAction<any>) => {
      state.loadingDeleteCourse = false
      state.error = null
    },

    onDeleteCourseFailure: (state, action) => {
      state.loadingDeleteCourse = false
      state.error = action.payload
    },

    onUploadThumbail: (state, action: PayloadAction<any>) => {
      state.loadingUploadThumbnail = true
    },
    onUploadThumbailSuccess: (state, action: PayloadAction<any>) => {
      state.loadingUploadThumbnail = false
      state.thumbnail = action.payload
    },
    onUploadThumbailFailure: (state, action: PayloadAction<any>) => {
      state.loadingUploadThumbnail = false
      state.thumbnail = null
      state.error = action.payload
    },

    onUploadLessonImage: (state, action: PayloadAction<any>) => {
      state.loadingLessonImage = true
    },
    onUploadLessonImageSuccess: (state, action: PayloadAction<any>) => {
      state.loadingLessonImage = false
      state.lessonImage = action.payload
    },
    onUploadLessonImageFailure: (state, action: PayloadAction<any>) => {
      state.loadingLessonImage = false
      state.lessonImage = null
      state.error = action.payload
    },

    onUploadVideo: (state, action: PayloadAction<any>) => {
      state.loadingUploadVideo = true
    },
    onUploadVideoSuccess: (state, action: PayloadAction<any>) => {
      state.loadingUploadVideo = false
      state.lessonVideo = action.payload
    },
    onUploadVideoFailure: (state, action: PayloadAction<any>) => {
      state.loadingUploadVideo = false
      state.lessonVideo = null
      state.error = action.payload
    },

    onDeleteVideo: (state, action: PayloadAction<any>) => {
      state.loadingDeleteVideo = true
    },
    onDeleteVideoSuccess: (state, action: PayloadAction<any>) => {
      state.loadingDeleteVideo = false
    },
    onDeleteVideoFailure: (state, action: PayloadAction<any>) => {
      state.loadingDeleteVideo = false
      state.error = action.payload
    },
  },
})

//
export const coursesActions = coursesSlice.actions

//
const coursesReducer = coursesSlice.reducer

export default coursesReducer
