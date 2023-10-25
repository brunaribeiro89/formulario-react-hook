import { useEffect, useState } from "react"


export const EditableComponent = ({ getValue, row, column, table }: any) => {
  const initialValue = getValue()
  const [value, setValue] = useState(initialValue)

  const onBlur = () => {
    table.options.meta?.updateData(
      row.index,
      column.id,
      value
    )
  }

  useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  return (
    <input
      value={value}
      onChange={(event) => setValue(event.target.value)}
      onBlur={onBlur}
      className="w-full p-1.5 bg-[#fdfdfdfa] rounded-sm text-sm overflow-hidden text-ellipsis whitespace-nowrap"
      type="text"
    />
  )
}