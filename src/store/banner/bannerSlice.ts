import {createSlice} from '@reduxjs/toolkit'
import {getAuth} from '../../utils/auth'

interface IInitialStateBanner {
  data: any
  loadingGetData: boolean
  loadingGetDataDetail: boolean
  loadingUploadImages: boolean
  loadingDeleteImage: boolean
  loadingDeleteBanner: boolean
  loadingCreateBanner: boolean
  loadingUpdateBanner: boolean
  error: any
  images: any
  bannerDetail: any
  imagesI: any
}
const initialState: IInitialStateBanner = {
  data: null,
  loadingGetData: false,
  loadingGetDataDetail: false,
  loadingUploadImages: false,
  loadingDeleteImage: false,
  loadingDeleteBanner: false,
  loadingCreateBanner: false,
  loadingUpdateBanner: false,
  error: null,
  images: [],
  bannerDetail: null,
  imagesI: []
}

const bannerSlice = createSlice({
  name: 'banner',
  initialState,
  reducers: {
    getDataStart: (state) => {
      state.loadingGetData = true
    },
    getDataSuccess: (state, action) => {
      state.loadingGetData = false
      state.data = action.payload
      state.error = null
    },
    getDataFailure: (state, action) => {
      state.loadingGetData = false
      state.data = null
      state.error = action.payload
    },

    getDataDetail: (state) => {
      state.loadingGetDataDetail = true
    },
    getDataDetailSuccess: (state, action) => {
      state.loadingGetDataDetail = false
      state.bannerDetail = action.payload
      state.imagesI =  action.payload.images
      state.error = null
    },
    getDataDetailFailure: (state, action) => {
      state.loadingGetDataDetail = false
      state.data = null
      state.error = action.payload
    },

    onCreateBanner: (state) => {
      state.loadingCreateBanner = true
    },

    onCreateBannerSuccess: (state, action) => {
      state.loadingCreateBanner = false
      state.images = []
      state.error = null
    },

    onCreateBannerFailure: (state, action) => {
      state.loadingCreateBanner = false
      state.error = action.payload
    },
   
    onUpdateBanner: (state) => {
      state.loadingUpdateBanner = true
    },

    onUpdateBannerSuccess: (state, action) => {
      state.loadingUpdateBanner = false
      state.images = []
      state.error = null
    },

    onUpdateBannerFailure: (state, action) => {
      state.loadingUpdateBanner = false
      state.error = action.payload
    },
    
    //
    onDeleteBanner: (state) => {
      state.loadingDeleteBanner = true
    },

    onDeleteBannerSuccess: (state, action) => {
      state.loadingDeleteBanner = false
      state.error = null
    },

    onDeleteBannerFailure: (state, action) => {
      state.loadingDeleteBanner = false
      state.error = action.payload
    },
    
    //
    onUploadImages: (state) => {
      state.loadingUploadImages = true
    },

    onUploadImagesSuccess: (state, action) => {
      state.loadingUploadImages = false
      state.images = action.payload
      state.error = null
    },

    onUploadImagesFailure: (state, action) => {
      state.loadingUploadImages = false
      state.data = null
      state.error = action.payload
    },
    
    onDeleteImage: (state) => {
      state.loadingDeleteImage = true
    },

    onDeleteImageSuccess: (state, action) => {
      state.loadingDeleteImage = false
      state.images = action.payload
      state.error = null
    },

    onDeleteImageFailure: (state, action) => {
      state.loadingDeleteImage = false
      state.data = null
      state.error = action.payload
    },

  },
})

//
export const bannerActions = bannerSlice.actions

//
const bannerReducer = bannerSlice.reducer
export default bannerReducer
