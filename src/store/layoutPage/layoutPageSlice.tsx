import {createSlice, PayloadAction} from '@reduxjs/toolkit'

interface IInitialStateLayoutPage {
  data: any
  dataDetail: any

  loadingGetData: boolean
  loadingGetDataDetail: boolean,

  loadingHandleCreateLayout: boolean
  loadingHandleUpdateLayout: boolean
  loadingHandleDeleteLayout: boolean


  trailerThumbnail: any
  trailerUrl: any

  loadingTrailerThumbnail: boolean
  loadingTrailerUrl: boolean

  welcomeThumbnail: any
  welcomeUrl: any

  loadingWelcomeThumbnail: boolean
  loadingWelcomeUrl: boolean

  messagesTeamThumbnail: any
  messagesTeamUrl: any

  loadingMessagesTeamThumbnail: boolean
  loadingMessagesTeamUrl: boolean

  loadingDeleteVideo: boolean
  error: any
}
const initialState: IInitialStateLayoutPage = {
  data: null,
  dataDetail: null,

  loadingGetData: false,
  loadingGetDataDetail: false,

  loadingHandleCreateLayout: false,
  loadingHandleUpdateLayout: false,
  loadingHandleDeleteLayout: false,

  trailerThumbnail: [],
  trailerUrl: [],

  loadingTrailerThumbnail: false,
  loadingTrailerUrl: false,

  welcomeThumbnail: [],
  welcomeUrl: [],

  loadingWelcomeThumbnail: false,
  loadingWelcomeUrl: false,

  messagesTeamThumbnail: [],
  messagesTeamUrl: [],

  loadingMessagesTeamThumbnail: false,
  loadingMessagesTeamUrl: false,

  loadingDeleteVideo: false,

  error: null,
}

const layoutPageSlice = createSlice({
  name: 'layoutPage',
  initialState,
  reducers: {
    getDataStart: (state) => {
      state.loadingGetData = true
    },
    getDataSuccess: (state, action: PayloadAction<any>) => {
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
      state.dataDetail = action.payload
      state.error = null
    },
    getDataDetailFailure: (state, action) => {
      state.loadingGetDataDetail = false
      state.dataDetail = null
      state.error = action.payload
    },
    

    handleCreateLayout: (state) => {
      state.loadingHandleCreateLayout = true
    },
    handleCreateLayoutSuccess: (state, action) => {
      state.loadingHandleCreateLayout = false
      state.error = null
    },
    handleCreateLayoutFailure: (state, action) => {
      state.loadingHandleCreateLayout = false
      state.error = action.payload
    },
    
    handleUpdateLayout: (state) => {
      state.loadingHandleUpdateLayout = true
    },
    handleUpdateLayoutSuccess: (state, action) => {
      state.loadingHandleUpdateLayout = false
      state.error = null
    },
    handleUpdateLayoutFailure: (state, action) => {
      state.loadingHandleUpdateLayout = false
      state.error = action.payload
    },

    handleDeleteLayout: (state) => {
      state.loadingHandleDeleteLayout = true
    },
    handleDeleteLayoutSuccess: (state, action) => {
      state.loadingHandleDeleteLayout = false
      state.error = null
    },
    handleDeleteLayoutFailure: (state, action) => {
      state.loadingHandleDeleteLayout = false
      state.error = action.payload
    },





    uploadTrailerThumbnailStart: (state, action: PayloadAction<string>) => {
      state.loadingTrailerThumbnail = true
    },
    uploadTrailerThumbnailSuccess: (state, action: PayloadAction<any>) => {
      state.loadingTrailerThumbnail = false
      state.trailerThumbnail = action.payload
      state.error = null
    },
    uploadTrailerThumbnailFailure: (state, action) => {
      state.loadingTrailerThumbnail = false
      state.trailerThumbnail = []
      state.error = action.payload
    },

    uploadTrailerUrlStart: (state, action: PayloadAction<string>) => {
      state.loadingTrailerUrl = true
    },
    uploadTrailerUrlSuccess: (state, action: PayloadAction<any>) => {
      state.loadingTrailerUrl = false
      state.trailerUrl = action.payload
      state.error = null
    },
    uploadTrailerUrlFailure: (state, action) => {
      state.loadingTrailerUrl = false
      state.trailerThumbnail = []
      state.error = action.payload
    },

    uploadWelcomeUrlStart: (state, action: PayloadAction<string>) => {
      state.loadingWelcomeUrl = true
    },
    uploadWelcomeUrlSuccess: (state, action: PayloadAction<any>) => {
      state.loadingWelcomeUrl = false
      state.welcomeUrl = action.payload
      state.error = null
    },
    uploadWelcomeUrlFailure: (state, action) => {
      state.loadingWelcomeUrl = false
      state.welcomeUrl = []
      state.error = action.payload
    },
    
    uploadWelcomeThumbnailStart: (state, action: PayloadAction<string>) => {
      state.loadingWelcomeThumbnail = true
    },
    uploadWelcomeThumbnailSuccess: (state, action: PayloadAction<any>) => {
      state.loadingWelcomeThumbnail = false
      state.welcomeThumbnail = action.payload
      state.error = null
    },
    uploadWelcomeThumbnailFailure: (state, action) => {
      state.loadingWelcomeThumbnail = false
      state.welcomeThumbnail = []
      state.error = action.payload
    },
    
    //
    uploadMessagesTeamThumbnailStart: (state, action: PayloadAction<string>) => {
      state.loadingMessagesTeamThumbnail = true
    },
    uploadMessagesTeamThumbnailSuccess: (state, action: PayloadAction<any>) => {
      state.loadingMessagesTeamThumbnail = false
      state.messagesTeamThumbnail = action.payload
      state.error = null
    },
    uploadMessagesTeamThumbnailFailure: (state, action) => {
      state.loadingMessagesTeamThumbnail = false
      state.messagesTeamThumbnail = []
      state.error = action.payload
    },
   
    //
    uploadMessagesTeamUrlStart: (state, action: PayloadAction<string>) => {
      state.loadingMessagesTeamUrl = true
    },
    uploadMessagesTeamUrlSuccess: (state, action: PayloadAction<any>) => {
      state.loadingMessagesTeamUrl = false
      state.messagesTeamUrl = action.payload
      state.error = null
    },
    uploadMessagesTeamUrlFailure: (state, action) => {
      state.loadingMessagesTeamUrl = false
      state.messagesTeamUrl = []
      state.error = action.payload
    },

    handleDeleteVideoStart: (state, action: PayloadAction<string>) => {
      state.loadingDeleteVideo = true
    },
    handleDeleteVideoSuccess: (state, action: PayloadAction<any>) => {
      state.loadingDeleteVideo = false
      state.error = null
    },
    handleDeleteVideoFailure: (state, action) => {
      state.loadingDeleteVideo = false
      state.error = action.payload
    },
  },
})

//
export const layoutPageActions = layoutPageSlice.actions

//
const layoutPageReducer = layoutPageSlice.reducer

export default layoutPageReducer
