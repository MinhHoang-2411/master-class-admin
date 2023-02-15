/* eslint-disable jsx-a11y/anchor-is-valid */
import {FC} from 'react'
import {Route, Routes} from 'react-router-dom'
import {useAppSelector} from '../../app/saga/hooks'
import {PageLink, PageTitle} from '../../layout/core'
import {IBanner} from '../../models/BannerModels'
import BannerDetail from './BannerDetail'
import CreateBanner from './CreateBanner'
import BannersOverview from './Overview'
import UpdateBanner from './UpdateBanner'

const bannerBreadCrumbs: Array<PageLink> = [
  {
    title: 'Banner',
    path: '/crafted/pages/banner/overview',
    isSeparator: false,
    isActive: false,
  },
  {
    title: '',
    path: '',
    isSeparator: true,
    isActive: false,
  },
]

const BannersPage: FC = () => {
  const banner: IBanner = useAppSelector((state) => state.banner.bannerDetail)
  return (
    <Routes>
      <Route>
        <Route
          path='overview'
          element={
            <>
              <PageTitle breadcrumbs={bannerBreadCrumbs}>Overview</PageTitle>
              <BannersOverview />
            </>
          }
        />
        <Route
          path='create'
          element={
            <>
              <PageTitle breadcrumbs={bannerBreadCrumbs}>Create</PageTitle>
              <CreateBanner />
            </>
          }
        />
        <Route
          path='update'
          element={
            <>
              <PageTitle breadcrumbs={bannerBreadCrumbs}>Update</PageTitle>
              <UpdateBanner banner={banner} />
            </>
          }
        />
        <Route
          path='/detail/:id'
          element={
            <>
              <PageTitle breadcrumbs={bannerBreadCrumbs}>Detail</PageTitle>
              <BannerDetail />
            </>
          }
        />
      </Route>
    </Routes>
  )
}

export default BannersPage
