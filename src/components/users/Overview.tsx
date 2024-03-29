import {Pagination} from '@mui/material'
import _ from 'lodash'
import {useCallback, useEffect, useState} from 'react'
import {isMappable} from '../../app/helpers/isMapple'
import {useAppDispatch, useAppSelector} from '../../app/saga/hooks'
import {IUser} from '../../models/User'
import SearchInput from '../../shared/Search'
import {usersActions} from '../../store/users/usersSlice'
import User from './User'

const UsersOverview = () => {
  const dispatch = useAppDispatch()
  const users = useAppSelector((state) => state.users.users)
  const paginate = useAppSelector((state) => state.users.paginate)
  const loading = useAppSelector((state) => state.users.loadingGetUser)

  //searching
  const [searchTerm, setSearchTerm] = useState('')

  const debounceSearch = useCallback(
    _.debounce((value) => {
      const params: any = {
        page: 1,
        limit: 10,
      }
      if (value && value.trim() !== '') {
        params['search'] = value.trim()
      } else delete params['search']
      console.log('yayy')
    }, 500),
    []
  )

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
    debounceSearch(event.target.value)
  }

  const handleClearSearch = () => {
    const params: any = {
      page: 1,
      limit: 10,
    }
    setSearchTerm('')
    console.log('yayy')
  }

  useEffect(() => {
    const payload: any = {
      limit: 10,
      page: 1,
    }
    dispatch(usersActions.getDataStart(payload))
  }, [])

  const onChangePaginate = (page: number) => {
    const payload: any = {
      limit: 10,
      page,
    }
    dispatch(usersActions.getDataStart(payload))
  }

  return (
    <>
      <div className='card mb-5 mb-xl-10' id='kt_profile_details_view'>
        <div className='card-header cursor-pointer'>
          <div className='card-title m-0'>
            <h3 className='fw-bolder m-0'>Users</h3>
          </div>
        </div>
        <div className='d-flex justify-content-start p-6 pb-0'>
          <SearchInput
            searchTerm={searchTerm}
            size='small'
            color='secondary'
            onChange={handleSearchChange}
            onClearSearch={handleClearSearch}
          />
        </div>
        <div className='card-body p-6'>
          <table className='table align-middle'>
            <thead className={'text-uppercase text-dark thead-pito border-bottom text-uppercase'}>
              <tr>
                <th style={{fontWeight: 600}} className='py-2 text-center'>
                  No
                </th>
                <th style={{fontWeight: 600}} className='py-2 w-40'>
                  Name
                </th>
                <th style={{fontWeight: 600}} className='py-2 '>
                  Email
                </th>
                <th style={{fontWeight: 600}} className='py-2'>
                  Type
                </th>
                <th style={{fontWeight: 600}} className='py-2 text-center'>
                  Role
                </th>
                <th style={{fontWeight: 600}} className='py-2 text-center'>
                  Active Status
                </th>
                <th style={{fontWeight: 600}} className='py-2 text-center'>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className='category-list'>
              {isMappable(users) ? (
                !loading ? (
                  users?.map((user: IUser, idx: number) => (
                    <User user={user} idx={idx} key={user?._id} />
                  ))
                ) : (
                  <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>
                      <div
                        className='text-center mt-9 p-6 spinner-border text-primary'
                        role='status'
                      >
                        <span className='visually-hidden'>Loading...</span>
                      </div>
                    </td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                )
              ) : (
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td>
                    <label className='fw-bold text-muted mt-4'>There are no user</label>
                  </td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className='d-flex justify-content-end p-6'>
          <Pagination
            count={paginate?.total_page}
            color='primary'
            onChange={(e: any, page: number) => onChangePaginate(page)}
          />
        </div>
      </div>
    </>
  )
}

export default UsersOverview
