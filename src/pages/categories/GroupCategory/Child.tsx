import DeleteIcon from '@mui/icons-material/Delete'
import PreviewIcon from '@mui/icons-material/Preview'
import { IconButton } from '@mui/material'
import { format } from 'date-fns'
import { useAppDispatch } from '../../../app/saga/hooks'
import history from '../../../routes/history'
import { categoriesActions } from '../../../store/categories/categoriesSlice'

interface IProps {
  idx: any
  item: any
}

const Child = ({idx, item}: IProps) => {
  const dispatch = useAppDispatch()

  const RedirectCategoryDetail = (category: any) => {
    dispatch(categoriesActions.getDetailCategory(category._id))
    history.replace(`/crafted/pages/categories/detail/${category._id}`)
  }

  return (
    <>
      <td>{idx + 1}</td>
      <td>{item.name}</td>
      <td className='text-center'>
        <span className='fw-bold fs-6'>
          {item?.isActive ? (
            <span className='badge badge-success'>active</span>
          ) : (
            <span className='badge badge-info'>inactive</span>
          )}
        </span>
      </td>
      <td className='text-center'>
        <span>{format(new Date(item?.createdAt), 'yyyy-MM-dd')}</span>
      </td>
      <td className='text-center'>
        <span>{format(new Date(item?.updatedAt), 'yyyy-MM-dd')}</span>
      </td>
      <td className='text-center'>
        {item?.deletedAt ? (
          <span>{format(new Date(item?.deletedAt), 'yyyy-MM-dd')}</span>
        ) : (
          <span>-</span>
        )}
      </td>
      <td className='text-center'>
        <IconButton onClick={() => RedirectCategoryDetail(item)}>
          <PreviewIcon color='info' />
        </IconButton>
        <IconButton onClick={() => dispatch(categoriesActions.onDeleteCategory(item?._id))}>
          <DeleteIcon color='secondary' />
        </IconButton>
      </td>
    </>
  )
}
export default Child
