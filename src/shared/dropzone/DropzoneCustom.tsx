import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import {Box} from '@mui/material'
import {useCallback, useEffect, useState} from 'react'
import {useDropzone} from 'react-dropzone'
import {toast} from 'react-toastify'
import {useAppDispatch, useAppSelector} from '../../app/saga/hooks'
import {bannerActions} from '../../store/banner/bannerSlice'

const styleDropzone = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '10px',
  borderWidth: 2,
  borderRadius: 2,
  borderColor: '#eeeeee',
  borderStyle: 'dashed',
  backgroundColor: '#fafafa',
  color: '#bdbdbd',
  outline: 'none',
  transition: 'border .24s ease-in-out',
  cursor: 'pointer',
}

interface IDropzone {
  maxFile: number
  setFieldValue?: any
  name: any
}

const DropzoneCustom = ({maxFile, setFieldValue, name}: IDropzone) => {

  const dispatch = useAppDispatch();


  const onDrop = useCallback((acceptedFiles: any) => {
    const newFiles = acceptedFiles.map((file: File) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
      })
    )

    const formdata: any = new FormData()
    newFiles.map((file: File) => formdata.append('images', file))

    dispatch(bannerActions.onUploadImages(formdata))
  }, [])


  const {getRootProps, getInputProps} = useDropzone({
    accept: {
      'image/*': [],
    },
    maxFiles: maxFile,
    onDrop,
    onDropRejected: (files) => {
      if (files?.length > maxFile) {
        toast.error(`Số lượng tối đa cho phép ${maxFile}`)
      }
    },
  })

  return (
    <Box {...getRootProps()} sx={styleDropzone}>
      <input {...getInputProps()} />
      <CloudUploadIcon sx={{fontSize: '3rem'}} />
    </Box>
  )
}

export default DropzoneCustom
