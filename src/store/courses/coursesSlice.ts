import {createSlice, PayloadAction} from '@reduxjs/toolkit'

interface IInitialStateCategory {
  data: any
  dataDetail: any
  thumbnail: any
  loadingGetData: boolean
  loadingGetDetail: boolean
  loadingUploadThumbnail: boolean
  loadingCreateCourse: boolean
  loadingDeleteCourse: boolean
  paginate: any
  error: any
}
const initialState: IInitialStateCategory = {
  data: null,
  thumbnail: [],
  dataDetail: null,
  paginate: null,
  loadingGetData: false,
  loadingGetDetail: false,
  loadingUploadThumbnail: false,
  loadingCreateCourse: false,
  loadingDeleteCourse: false,
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
      state.thumbnail =[]
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
  },
})

//
export const coursesActions = coursesSlice.actions

//
const coursesReducer = coursesSlice.reducer

export default coursesReducer
