import BlockIcon from '@mui/icons-material/Block'
import PreviewIcon from '@mui/icons-material/Preview'
import {IconButton} from '@mui/material'
import {useAppDispatch, useAppSelector} from '../../app/saga/hooks'
import {IUser} from '../../models/User'
import history from '../../routes/history'
import {usersActions} from '../../store/users/usersSlice'
import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar'

interface IProps {
  idx: number
  user: IUser
}

const User = ({idx, user}: IProps) => {
  const dispatch = useAppDispatch()
  const paginate = useAppSelector((state) => state.users.paginate)

  const onRedirectDetail = (id: string) => {
    history.replace(`/crafted/pages/users/detail/${id}`)
  }

  const handleBlockUser = (user: IUser) => {
    dispatch(usersActions.handleBlockUser(user))
  }

  return (
    <>
      <tr>
        <td className='text-center'>{idx + 1 + (paginate.page - 1) * 10}</td>
        <td>{`${user.firstName} ${user.lastName}`}</td>
        <td>{`${user.email}`}</td>
        <td className='text-center'>{`${user.roleName}`}</td>
        <td className='text-center'>
          <span className='fw-bold fs-6'>
            {user?.isActive ? (
              <span className='badge badge-success'>active</span>
            ) : (
              <span className='badge badge-info'>inactive</span>
            )}
          </span>
        </td>
        <td className='text-center'>
          <IconButton onClick={() => onRedirectDetail(user._id)}>
            <PreviewIcon color='info' />
          </IconButton>
          <IconButton onClick={() => handleBlockUser(user)}>
            {user.isActive ? (
              <BlockIcon color='secondary' />
            ) : (
              <PermContactCalendarIcon color='secondary' />
            )}
          </IconButton>
        </td>
      </tr>
    </>
  )
}
export default User
