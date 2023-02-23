import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import {Box} from '@mui/material'
import {useCallback} from 'react'
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
  onUploadImage: any
  typeAppend: string
  index?: any
  setIndex?: any
}

const DropzoneCustom = ({maxFile, typeAppend, onUploadImage, index, setIndex}: IDropzone) => {
  const onDrop = useCallback((acceptedFiles: any) => {
    try {
      if (acceptedFiles.length < maxFile) {
        return false
      } else {
        const newFiles = acceptedFiles.map((file: File) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
        setIndex(index)
        const formdata: any = new FormData()
        newFiles.map((file: File) => formdata.append(typeAppend, file))
        onUploadImage(formdata)
      }
    } catch (error) {
      console.log(error)
    }
  }, [])

  const {getRootProps, getInputProps} = useDropzone({
    accept: {
      'image/*': [],
    },
    maxFiles: maxFile,
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

export default DropzoneCustom
