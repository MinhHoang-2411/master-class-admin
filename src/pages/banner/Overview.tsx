import {Grid} from '@mui/material'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import {FC, useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import {isMappable} from '../../app/helpers/isMapple'
import {useAppDispatch, useAppSelector} from '../../app/saga/hooks'
import history from '../../routes/history'
import SearchInput from '../../shared/Search'
import {bannerActions} from '../../store/banner/bannerSlice'
import {uploadActions} from '../../store/upload/uploadSlice'

const BannersOverview: FC = () => {
  const banners = useAppSelector((state) => state.banner.data) || []
  const paginate = useAppSelector((state) => state.banner.paginate)
  const [searchTerm, setSearchTerm] = useState<string>('')

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(uploadActions.clearStore())
  }, [])

  useEffect(() => {
    const payload: any = {
      limit: 10,
      page: 1,
    }
    dispatch(bannerActions.getDataStart(payload))
  }, [])

  const RedirecBannerDetail = (banner: any) => {
    dispatch(bannerActions.getDataDetail(banner._id))
    history.replace(`/crafted/pages/banner/detail/${banner._id}`)
  }

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }

  const onSearch = () => {
    const payload: any = {
      limit: paginate.limit,
      page: paginate.page,
      search: searchTerm,
    }
    dispatch(bannerActions.getDataStart(payload))
  }
  return (
    <>
      <div className='card mb-5 mb-xl-10' id='kt_profile_details_view'>
        <div className='card-header cursor-pointer'>
          <div className='card-title m-0'>
            <h3 className='fw-bolder m-0'>Banners</h3>
          </div>

          <Link to='/crafted/pages/banner/create' className='btn btn-primary align-self-center'>
            Create Banner
          </Link>
        </div>
        {/* <div className='d-flex justify-content-end p-6 pb-0'>
          <SearchInput
            size='small'
            color='secondary'
            onChange={handleSearchChange}
            onSearch={onSearch}
          />
        </div> */}
        <div className='card-body p-6'>
          <Grid container spacing={3}>
            {isMappable(banners) ? (
              banners.map((banner: any) => (
                <Grid item xs={12} sm={6} md={4} key={banner._id}>
                  <Card sx={{maxWidth: 345}}>
                    <CardMedia sx={{height: 140}} image={banner.images[0]} title='banner' />
                    <CardContent>
                      <Typography gutterBottom variant='h5' component='div'>
                        {banner.title}
                      </Typography>
                      <Typography variant='body2' color='text.secondary'>
                        {banner.description}
                      </Typography>
                    </CardContent>
                    <CardActions sx={{display: 'flex', justifyContent: 'end'}}>
                      <Button
                        size='small'
                        onClick={() => dispatch(bannerActions.onDeleteBanner(banner._id))}
                      >
                        Delete
                      </Button>
                      <Button size='small' onClick={() => RedirecBannerDetail(banner)}>
                        Detail
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))
            ) : (
              <div className='p-9'>
                <label className='fw-bold text-muted'>There are no banner</label>
              </div>
            )}
          </Grid>
        </div>
      </div>
    </>
  )
}

export default BannersOverview
