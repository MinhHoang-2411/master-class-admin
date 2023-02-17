import React, {useState} from 'react'
import Child from './Child'

const GroupCategory = ({
  onOpenEditCategory,
  setCategoryId,
  deleteCate,
  onActivate,
  level = 0,
  idx,
  item,
}: any) => {
  const [hidden, setHidden] = useState(true)

  return (
    <>
      <tr>
        <Child
          onActivate={onActivate}
          hidden={hidden}
          setHidden={setHidden}
          level={level}
          idx={idx}
          item={item}
        />
      </tr>
    </>
  )
}

export default GroupCategory
