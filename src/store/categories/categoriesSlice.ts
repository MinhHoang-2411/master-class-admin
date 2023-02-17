import {createSlice} from '@reduxjs/toolkit'

interface IInitialStateCategory {
  data: any
  dataDetail: any
  loadingGetData: boolean
  loadingCreate: boolean
  loadingUpdate: boolean
  loadingDelete: boolean
  loadingGetDetail: boolean
  error: any
}
const initialState: IInitialStateCategory = {
  data: null,
  dataDetail: null,
  loadingGetData: false,
  loadingCreate: false,
  loadingUpdate: false,
  loadingDelete: false,
  loadingGetDetail: false,
  error: null,
}

const categoriesSlice = createSlice({
  name: 'categories',
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
    onCreateCategory: (state) => {
      state.loadingCreate = true
    },
    onCreateCategorySuccess: (state, action) => {
      state.loadingCreate = false
      state.data = action.payload
      state.error = null
    },
    onCreateCategoryFailure: (state, action) => {
      state.loadingCreate = false
      state.data = null
      state.error = action.payload
    },
    
    onUpdateCategory: (state) => {
      state.loadingUpdate = true
    },
    onUpdateCategorySuccess: (state, action) => {
      state.loadingUpdate = false
      state.error = null
    },
    onUpdateCategoryFailure: (state, action) => {
      state.loadingUpdate = false
      state.error = action.payload
    },

    onDeleteCategory: (state) => {
      state.loadingDelete = true
    },
    onDeleteCategorySuccess: (state, action) => {
      state.loadingDelete = false
      state.error = null
    },
    onDeleteCategoryFailure: (state, action) => {
      state.loadingDelete = false
      state.error = action.payload
    },

    getDetailCategory: (state) => {
      state.loadingGetDetail = true
    },
    getDetailCategorySuccess: (state, action) => {
      state.loadingGetDetail = false
      state.dataDetail = action.payload
      state.error = null
    },
    getDetailCategoryFailure: (state, action) => {
      state.loadingGetData = false
      state.dataDetail = action.payload
      state.error = action.payload
    },
  },
})

//
export const categoriesActions = categoriesSlice.actions

//
const categoriesReducer = categoriesSlice.reducer
export default categoriesReducer
