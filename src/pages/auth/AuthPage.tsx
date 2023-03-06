/* eslint-disable jsx-a11y/anchor-is-valid */
import {useEffect} from 'react'
import {Navigate, Outlet, Route, Routes} from 'react-router-dom'
import {Registration} from '../../components/auth/Registration'
import {ForgotPassword} from '../../components/auth/ForgotPassword'
import {Login} from '../../components/auth/Login'
import {toAbsoluteUrl} from '../../app/helpers'
import {VerifyCode} from '../../components/auth/VerifiCode'
import {useAppSelector} from '../../app/saga/hooks'
import {ResetPassword} from '../../components/auth/ResetPassword'

const AuthLayout = () => {
  useEffect(() => {
    document.body.classList.add('bg-body')
    return () => {
      document.body.classList.remove('bg-body')
    }
  }, [])

  return (
    <div
      className='d-flex flex-column flex-column-fluid bgi-position-y-bottom position-x-center bgi-no-repeat bgi-size-contain bgi-attachment-fixed'
      style={{
        backgroundImage: `url(${toAbsoluteUrl('/media/illustrations/sketchy-1/14.png')})`,
      }}
    >
      {/* begin::Content */}
      <div className='d-flex flex-center flex-column flex-column-fluid p-10 pb-lg-20'>
        {/* begin::Logo */}
        <a href='#' className='mb-12'>
          <img alt='Logo' src={toAbsoluteUrl('/media/logo.jpg')} className='h-90px' />
        </a>
        {/* end::Logo */}
        {/* begin::Wrapper */}
        <div className='w-lg-500px bg-body rounded shadow-sm p-10 p-lg-15 mx-auto'>
          <Outlet />
        </div>
        {/* end::Wrapper */}
      </div>
      {/* end::Content */}
      {/* begin::Footer */}
      {/* <div className='d-flex flex-center flex-column-auto p-10'>
        <div className='d-flex align-items-center fw-bold fs-6'>
          <a href='#' className='text-muted text-hover-primary px-2'>
            About
          </a>

          <a href='#' className='text-muted text-hover-primary px-2'>
            Contact
          </a>

          <a href='#' className='text-muted text-hover-primary px-2'>
            Contact Us
          </a>
        </div>
      </div> */}
      {/* end::Footer */}
    </div>
  )
}

const AuthPage = () => {
  const {tokenForgotPass, tokenVerifyCode} = useAppSelector((state) => state?.auth)

  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path='login' element={<Login />} />
        <Route path='registration' element={<Registration />} />
        <Route path='forgot-password' element={<ForgotPassword />} />
        <Route path='verify-code' element={tokenForgotPass ? <VerifyCode /> : <VerifyCode />} />
        <Route
          path='reset-password'
          element={tokenVerifyCode ? <ResetPassword /> : <Navigate to='/auth/forgot-password' />}
        />
        <Route index element={<Login />} />
      </Route>
    </Routes>
  )
}

export {AuthPage}
