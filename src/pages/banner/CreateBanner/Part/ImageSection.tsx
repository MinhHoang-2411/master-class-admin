import {useEffect, useState} from 'react'
import {useAppDispatch, useAppSelector} from '../../../../app/saga/hooks'
import DropzoneCustom from '../../../../shared/dropzone/DropzoneCustom'
import ListMedia from '../../../../shared/ListMedia'
import {bannerActions} from '../../../../store/banner/bannerSlice'

interface Props {
  values: any
  setFieldValue: any
}

const ImageSection = ({values, setFieldValue}: Props) => {
  const images = useAppSelector((state) => state.banner.images)
  const [index, setIndex] = useState(0)

  const dispatch = useAppDispatch()

  const onUploadImage = (formdata: any) => {
    dispatch(bannerActions.onUploadImages(formdata))
  }

  useEffect(() => {
    if (images) {
      setFieldValue('images', [...values.images, ...images])
    }
  }, [images])
  return (
    <div className='row mb-9'>
      <label className='col-lg-4 col-form-label required fw-bold fs-6'>List Image</label>
      <div className='col-lg-8'>
        <div className='col-lg-2'>
          <DropzoneCustom
            maxFile={15 - values.images?.length}
            onUploadImage={onUploadImage}
            typeAppend={'images'}
            setIndex={setIndex}
            index={index}
          />
        </div>
        <div className='col-lg-10 mt-6'>
          <ListMedia images={values.images} setFieldValue={setFieldValue} nameValue={'images'} />
        </div>
      </div>
    </div>
  )
}

export default ImageSection
