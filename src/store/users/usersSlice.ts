import {createSlice, PayloadAction} from '@reduxjs/toolkit'

interface IInitialStateBanner {
  users: any
  paginate: any
  userDetail: any
  loadingGetUser: boolean
  loadingGetUserDetail: boolean
  loadingHandleBlockUser: boolean
  loadingHandleUpdateUser: boolean
  error: any
}
const initialState: IInitialStateBanner = {
  users: null,
  paginate: null,
  userDetail: null,
  loadingGetUser: false,
  loadingGetUserDetail: false,
  loadingHandleBlockUser: false,
  loadingHandleUpdateUser: false,
  error: null,
}

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    getDataStart: (state, action: PayloadAction<any>) => {
      state.loadingGetUser = true
    },
    getDataSuccess: (state, action: PayloadAction<any>) => {
      state.loadingGetUser = false
      state.users = action.payload.data
      state.paginate = action.payload.paginate
    },
    getDataFailure: (state, action) => {
      state.loadingGetUser = false
    },

    getDataDetailStart: (state, action: PayloadAction<any>) => {
      state.loadingGetUserDetail = true
    },
    getDataDetailSuccess: (state, action: PayloadAction<any>) => {
      state.loadingGetUserDetail = false
      state.userDetail = action.payload
    },
    getDataDetailFailure: (state, action) => {
      state.loadingGetUserDetail = false
    },

    handleBlockUser: (state, action: PayloadAction<any>) => {
      state.loadingHandleBlockUser = true
    },
    handleBlockUserSuccess: (state, action: PayloadAction<any>) => {
      state.loadingHandleBlockUser = false
    },
    handleBlockUserFailure: (state, action) => {
      state.loadingHandleBlockUser = false
    },
    
    handleUpdateUser: (state, action: PayloadAction<any>) => {
      state.loadingHandleUpdateUser = true
    },
    handleUpdateUserSuccess: (state, action: PayloadAction<any>) => {
      state.loadingHandleUpdateUser = false
    },
    handleUpdateUserFailure: (state, action) => {
      state.loadingHandleBlockUser = false
    },
  },
})

export const usersActions = usersSlice.actions

const usersReducer = usersSlice.reducer
export default usersReducer
