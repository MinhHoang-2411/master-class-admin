import {Grid} from '@mui/material'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import {FC, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {isMappable} from '../../app/helpers/isMapple'
import {useAppDispatch, useAppSelector} from '../../app/saga/hooks'
import history from '../../routes/history'
import {bannerActions} from '../../store/banner/bannerSlice'
import {layoutPageActions} from '../../store/layoutPage/layoutPageSlice'

const OverviewLayoutPage: FC = () => {
  const dispatch = useAppDispatch()
  const data = useAppSelector((state) => state.layoutPage.data)
  console.log('data', data)

  useEffect(() => {
    // dispatch(uploadActions.clearStore())
  }, [])

  useEffect(() => {
    const payload: any = {
      limit: 10,
      page: 1,
    }
    dispatch(layoutPageActions.getDataStart(payload))
  }, [])

  const RedirecBannerDetail = (layout: any) => {
    dispatch(layoutPageActions.getDataDetail(layout._id))
    history.replace(`/crafted/pages/layout/detail/${layout._id}`)
  }

  return (
    <>
      <div className='card mb-5 mb-xl-10' id='kt_profile_details_view'>
        <div className='card-header cursor-pointer'>
          <div className='card-title m-0'>
            <h3 className='fw-bolder m-0'>Layout page</h3>
          </div>

          <Link to='/crafted/pages/layout/create' className='btn btn-primary align-self-center'>
            Create Layout page
          </Link>
        </div>

        <div className='card-body p-6'>
          <Grid container spacing={3}>
            {isMappable(data) ? (
              data.map((layout: any) => (
                <Grid item xs={12} sm={6} md={4} key={layout._id}>
                  <Card sx={{maxWidth: 345}}>
                    <CardMedia sx={{height: 140}} image={layout.welcome.thumbnail} title='banner' />
                    <CardContent>
                      <Typography gutterBottom variant='h5' component='div'>
                        {layout.welcome.description}
                      </Typography>
                    </CardContent>
                    <CardActions sx={{display: 'flex', justifyContent: 'end'}}>
                      <Button
                        size='small'
                        onClick={() => dispatch(layoutPageActions.handleDeleteLayout(layout._id))}
                      >
                        Delete
                      </Button>
                      <Button size='small' onClick={() => RedirecBannerDetail(layout)}>
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

export default OverviewLayoutPage
