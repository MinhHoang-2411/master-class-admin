import { Switch, TextField } from '@mui/material'
import { Field } from 'formik'
import { ErrorMessage } from '../../../../shared/ErrorMesage/ErrorMessage'

interface Props {
  values: any
  setFieldValue: any
  handleChange: any
}

const HeadSection = ({values, setFieldValue, handleChange}: Props) => {
  const label = {inputProps: {'aria-label': 'Switch status'}}

  return (
    <div className='card-body border-top p-9'>
      <div className='row mb-6'>
        <label className='col-lg-4 col-form-label required fw-bold fs-6'>First Name</label>
        <div className='col-lg-8 fv-row'>
          <Field
            as={TextField}
            name='firstName'
            label='First Name'
            variant='outlined'
            value={values.firstName}
            onChange={handleChange}
            margin='normal'
            fullWidth
          />
          <ErrorMessage name='firstName' />
        </div>
      </div>
      <div className='row mb-6'>
        <label className='col-lg-4 col-form-label required fw-bold fs-6'>Last Name</label>
        <div className='col-lg-8 fv-row'>
          <Field
            as={TextField}
            name='lastName'
            label='Last Name'
            variant='outlined'
            value={values.lastName}
            onChange={handleChange}
            margin='normal'
            fullWidth
          />
          <ErrorMessage name='lastName' />
        </div>
      </div>
      <div className='row mb-6'>
        <label className='col-lg-4 col-form-label required fw-bold fs-6'>Active status</label>
        <div className='col-lg-8 fv-row'>
          <Switch
            {...label}
            color='secondary'
            checked={values.isActive}
            value={values.isActive}
            onChange={(e) => setFieldValue('isActive', e.target.checked)}
          />
        </div>
      </div>
      <div className='card-footer d-flex justify-content-end py-6 px-9'>
        <button type='submit' className='btn btn-primary'>
          Update
        </button>
      </div>
    </div>
  )
}

export default HeadSection
