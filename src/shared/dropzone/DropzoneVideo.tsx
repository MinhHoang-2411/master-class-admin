import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import {Box} from '@mui/material'
import {useCallback, useState} from 'react'
import {useDropzone} from 'react-dropzone'
import {toast} from 'react-toastify'

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
  onUploadVideo: any
  typeAppend: string
  setIndex?: any
  idx?: any
  setFieldValue?: any
  nameValue?: any
}

const DropzoneVideo = ({
  maxFile,
  typeAppend,
  onUploadVideo,
  setIndex,
  idx,
  setFieldValue,
  nameValue,
}: IDropzone) => {
  const onDrop = useCallback((acceptedFiles: any) => {
    try {
      if (acceptedFiles.length < maxFile) {
        return false
      } else {
        const newFiles = acceptedFiles.map((file: File) => {
          const video = document.createElement('video')
          video.preload = 'metadata'

          video.onloadedmetadata = () => {
            setFieldValue(nameValue, video.duration)
            URL.revokeObjectURL(video.src)
          }
          video.src = URL.createObjectURL(file)

          return Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        })
        const formdata: any = new FormData()
        newFiles.map((file: File) => formdata.append(typeAppend, file))
        onUploadVideo(formdata)
        setIndex(idx)
      }
    } catch (error) {
      console.log(error)
    }
  }, [])

  const {getRootProps, getInputProps} = useDropzone({
    accept: {
      'video/*': [],
    },
    maxFiles: 1,
    onDrop,
    onDropRejected: (files) => {
      if (files?.length > maxFile) {
        toast.error(`The maximum amount allowed is ${maxFile}`)
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

export default DropzoneVideo
