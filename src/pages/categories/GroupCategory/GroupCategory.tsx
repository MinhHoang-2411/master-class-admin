import Child from './Child'

const GroupCategory = ({
  idx,
  item,
}: any) => {
  return (
    <>
      <tr>
        <Child
          idx={idx}
          item={item}
        />
      </tr>
    </>
  )
}

export default GroupCategory
