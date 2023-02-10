import {useFormik} from 'formik'
import React, {useEffect, useRef} from 'react'
import {Link} from 'react-router-dom'
import * as Yup from 'yup'
import '../../app/assets/sass/components/auth.scss'
import {useAppDispatch, useAppSelector} from '../../app/saga/hooks'
import {TOKEN_FORGOT_PASS} from '../../constants/auth'
import {VerifyCodeModel} from '../../models'
import {authActions} from '../../store/auth/authSlice'
import {getSessionStorage} from '../../utils/auth'
import CountdownTimer from '../date-time/countdown-time.tsx'

const initialValues = {
  arrCode: [],
}

const verifyCodeSchema = Yup.object().shape({
  arrCode: Yup.array()
    .of(Yup.string().trim().required('Please enter enough confirmation code').nullable())
    .min(6, 'Please enter enough confirmation code')
    .required('Please enter enough confirmation code'),
})

export function VerifyCode() {
  const codesRef = useRef<any>([])
  const dataTokenForgotPass = getSessionStorage(TOKEN_FORGOT_PASS)
  const token_forgot_pass = useAppSelector((state) => state?.auth?.tokenForgotPass)
  const loading = useAppSelector((state) => state?.auth?.loadingVerify)
  const dispatch = useAppDispatch()

  const formik = useFormik({
    initialValues,
    validationSchema: verifyCodeSchema,
    onSubmit: (values, {setStatus, setSubmitting}) => {
      try {
        const params = {
          code: values.arrCode.join(''),
          token: token_forgot_pass,
        }
        dispatch(authActions.verifyCode(params as VerifyCodeModel))
      } catch (error) {
        console.error(error)
      }
    },
  })

  const handleEnterCode = (value: string, index: number) => {
    const code: Array<string> = JSON.parse(JSON.stringify(formik?.values?.arrCode))
    const number = value ? Math.max(0, Math.min(9, Number(value))) : ''

    code[index] = number?.toString()

    formik.setFieldValue('arrCode', code)
  }

  const handleChangeCode = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (Number(e.key) >= 0 && Number(e.key) <= 9) {
      handleEnterCode(e.key, index)
      setTimeout(() => {
        codesRef.current[index + 1].focus()
      }, 10)
    } else if (e.key === 'Backspace') {
      if (formik?.values?.arrCode[index] !== undefined && formik?.values?.arrCode[index] !== '') {
        handleEnterCode('', index)
      } else {
        setTimeout(() => {
          codesRef.current[index - 1].focus()
        }, 10)
      }
    }
  }

  useEffect(() => {
    codesRef.current = codesRef.current.slice(0, 6)
  }, [])

  return (
    <>
      <form
        className='form w-100 fv-plugins-bootstrap5 fv-plugins-framework'
        noValidate
        id='kt_login_password_reset_form'
        onSubmit={formik.handleSubmit}
      >
        <div className='text-center mb-5'>
          {/* begin::Title */}
          <h1 className='text-dark mb-3'>Forgot Password ?</h1>
          {/* end::Title */}

          {/* begin::Link */}
          <div className='text-gray-400 fw-bold fs-4'>
            Enter the confirmation code from your email to reset your password.
          </div>
          {/* end::Link */}
        </div>
        <div>
          <CountdownTimer targetDate={dataTokenForgotPass?.expiresAt} session={TOKEN_FORGOT_PASS} />
        </div>
        {/* Verify code  */}
        <div className='fv-row mb-15 mt-5 d-flex justify-content-center'>
          {Array.from(Array(6).keys())?.map((item, index) => {
            return (
              <input
                ref={(element) => (codesRef.current[index] = element)}
                key={index}
                type='number'
                autoComplete='off'
                name='arrCode'
                value={formik?.values?.arrCode?.[index]}
                onKeyDown={(e) => handleChangeCode(e, index)}
                style={{width: '50px'}}
                className={'form-control form-control-lg form-control-solid me-4'}
              />
            )
          })}
        </div>
        {formik.touched.arrCode && formik.errors.arrCode && (
          <div className='d-flex justify-content-center fv-plugins-message-container mb-5'>
            <div className='fv-help-block'>
              <span role='alert'>Please enter enough confirmation code</span>
            </div>
          </div>
        )}
        {/* end::Form group */}

        {/* begin::Form group */}
        <div className='d-flex flex-wrap justify-content-center pb-lg-0'>
          <button
            type='submit'
            id='kt_password_reset_submit'
            className='btn btn-lg btn-primary fw-bolder me-4'
          >
            <span className='indicator-label'>Submit</span>
            {loading && (
              <span className='indicator-progress'>
                Please wait...
                <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
              </span>
            )}
          </button>
          <Link to='/auth/forgot-password'>
            <button
              type='button'
              id='kt_login_password_reset_form_cancel_button'
              className='btn btn-lg btn-light-primary fw-bolder'
              disabled={formik.isSubmitting || !formik.isValid}
            >
              Cancel
            </button>
          </Link>{' '}
        </div>
        {/* end::Form group */}
      </form>
    </>
  )
}
