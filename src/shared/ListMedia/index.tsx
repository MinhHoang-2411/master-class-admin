import CloseIcon from '@mui/icons-material/Close'
import {Box, Card, CardMedia, Grid} from '@mui/material'
import IconButton from '@mui/material/IconButton'
import {isMappable} from '../../app/helpers/isMapple'
import {useAppDispatch} from '../../app/saga/hooks'
import {bannerActions} from '../../store/banner/bannerSlice'

interface IListImage {
  images: any
  setFieldValue: any
  nameValue: string
  onDelete?: any
}

const ListMedia = ({images, setFieldValue, nameValue, onDelete}: IListImage) => {
  const dispatch = useAppDispatch()

  const removeFile = ({pos, url}: {url: string; pos: number}) => {
    const newFiles = images?.filter((_: never, index: number) => index !== pos)
    setFieldValue(nameValue, newFiles)
    onDeletePublicFile(url)
    onDelete()
  }

  const onDeletePublicFile = (url: string) => {
    const payload: any = {
      urlFile: url,
      uploadType: 'image',
    }
    dispatch(bannerActions.onDeletePublicFile(payload))
  }

  return (
    <Box sx={{flexGrow: 1}}>
      <Grid container spacing={3}>
        {isMappable(images) ? (
          images?.map((image: any, index: number) => (
            <Grid item xs={12} sm={6} md={4} key={image}>
              <Card sx={{maxWidth: 345, position: 'relative'}}>
                <CardMedia sx={{height: 0, paddingTop: '56.25%'}} image={image} title={image} />
                <IconButton
                  color='secondary'
                  component='label'
                  sx={{position: 'absolute', top: '0', right: '0'}}
                  onClick={() => removeFile({url: image, pos: index})}
                >
                  <CloseIcon sx={{backgroundColor: '#fff', borderRadius: '50%'}} />
                </IconButton>
              </Card>
            </Grid>
          ))
        ) : (
          <></>
        )}
      </Grid>
    </Box>
  )
}

export default ListMedia
