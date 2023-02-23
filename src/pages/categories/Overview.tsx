import {useEffect} from 'react'
import {Link} from 'react-router-dom'
import {isMappable} from '../../app/helpers/isMapple'
import {useAppDispatch, useAppSelector} from '../../app/saga/hooks'
import {ICategory} from '../../models/CategoryModels'
import {categoriesActions} from '../../store/categories/categoriesSlice'
import {uploadActions} from '../../store/upload/uploadSlice'
import GroupCategory from './GroupCategory/GroupCategory'

const CategoriesOverview = () => {
  const categories = useAppSelector((state) => state.categories.data)
  const loading = useAppSelector((state) => state.categories.loadingGetData)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(categoriesActions.getDataStart())
  }, [])

  useEffect(() => {
    dispatch(uploadActions.clearStore())
  }, [])

  return (
    <>
      {!loading ? (
        <div className='card mb-5 mb-xl-10' id='kt_profile_details_view'>
          <div className='card-header cursor-pointer'>
            <div className='card-title m-0'>
              <h3 className='fw-bolder m-0'>Category</h3>
            </div>

            <Link
              to='/crafted/pages/categories/create'
              className='btn btn-primary align-self-center'
            >
              Create Category
            </Link>
          </div>
          <div className='card-body p-9'>
            <table className='table align-middle'>
              <thead className={'text-uppercase text-dark thead-pito border-bottom text-uppercase'}>
                <tr>
                  <th className='py-2 pl-4 pr-2 '>No</th>
                  <th className='py-2 w-40'>Category Name</th>
                  <th className='py-2 text-center'>Active Status</th>
                  <th className='py-2 text-center'>Date Created</th>
                  <th className='py-2 text-center'>Date updated</th>
                  <th className='py-2 text-center'>Date deleted</th>
                  <th className='py-2 text-center'>Actions</th>
                </tr>
              </thead>
              <tbody className='category-list'>
                {isMappable(categories) ? (
                  categories?.map((item: ICategory, idx: number) => (
                    <GroupCategory item={item} idx={idx} key={item?._id} />
                  ))
                ) : (
                  <></>
                )}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <>Loading...</>
      )}
    </>
  )
}

export default CategoriesOverview
