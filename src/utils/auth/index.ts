import {AUTH_LOCAL_STORAGE_KEY, INFO_USER_LOCAL_STORAGE_KEY} from '../../constants/auth'
import {AuthModel} from '../../models'
import history from '../../routes/history'

const getAuth = (key: string = AUTH_LOCAL_STORAGE_KEY): AuthModel | undefined => {
  if (!localStorage) {
    return
  }

  const lsValue: string | null = localStorage.getItem(key)

  if (!lsValue) {
    return
  }

  try {
    const auth: AuthModel = JSON.parse(lsValue) as AuthModel
    if (auth) {
      // You can easily check auth_token expiration also
      return auth
    }
  } catch (error) {
    console.error('AUTH LOCAL STORAGE PARSE ERROR', error)
  }
}

const getSessionStorage = (key: string): any => {
  if (!sessionStorage) {
    return
  }

  const lsValue: string | null = sessionStorage.getItem(key)

  if (!lsValue) {
    return
  }

  try {
    const auth: any = JSON.parse(lsValue)

    if (auth) {
      return auth
    }
  } catch (error) {
    console.error('AUTH SESSION STORAGE PARSE ERROR', error)
  }
}

const removeSessionStorage = (key: string) => {
  if (!sessionStorage) {
    return
  }

  try {
    sessionStorage.removeItem(key)
  } catch (error) {
    console.error('AUTH SESSION STORAGE PARSE ERROR', error)
  }
}

const setAuth = (auth: AuthModel | undefined) => {
  if (!localStorage) {
    return
  }

  try {
    const lsValue = JSON.stringify(auth)
    localStorage.setItem(AUTH_LOCAL_STORAGE_KEY, lsValue)
  } catch (error) {
    console.error('AUTH LOCAL STORAGE SAVE ERROR', error)
  }
}

const removeAuth = () => {
  if (!localStorage) {
    return
  }

  try {
    localStorage.removeItem(AUTH_LOCAL_STORAGE_KEY)
  } catch (error) {
    console.error('AUTH LOCAL STORAGE REMOVE ERROR', error)
  }
}

const logout = () => {
  if (window.location.pathname !== '/login') {
    localStorage.removeItem(AUTH_LOCAL_STORAGE_KEY)
    history.replace('/auth')
  }
}

export {getAuth, setAuth, removeAuth, logout, getSessionStorage, removeSessionStorage}
