import { STATUSES } from "data";
import { useState } from "react";


export const ColorIcon = ({ color, ...props }: any) => (
  <div style={{ backgroundColor: color }} className={`w-[12px] h-[12px]  border-2 rounded-full mr-3`} type="checkbox" {...props} />
);


const StatusCell = ({ getValue, row, column, table }: any) => {
  const { name, color, id } = getValue() || {};
  const { updateData } = table.options.meta;
  const [openDropdown, setOpenDropdown] = useState(false)

  return (

    <>
      <button key={id} id="dropdownDefaultButton" style={{ backgroundColor: color }} className={`w-44 text-gray-700 hover:bg-blue-200 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-200 dark:hover:bg-blue-200 dark:focus:ring-blue-200`} type="button"> {name}
        <svg onClick={() => setOpenDropdown(!openDropdown)} className={`w-4 h-4 p-0.5 ml-10 ${openDropdown && "rotate-180"}`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
        </svg>
      </button>
      <div id="dropdown" className={`bg-white divide-y divide-gray-100 rounded-lg  shadow w-44 bg-trasnparent border mt-2 overflow-y-auto ${openDropdown ? "max-h-60" : "max-h-0 border-none"
        } `}>
        <ul className="flex flex-col justify-center items-start cursor-pointer bg-[#fafafa] py-2 text-sm text-gray-700 " aria-labelledby="dropdownDefaultButton">
          <li
            className="flex w-full justify-start items-center px-4 py-2 hover:bg-gray-300  "
            onClick={() => updateData(row.index, column.id, null)}>
            <ColorIcon color='#A52A2A' />
            None
          </li>

          {STATUSES.map((status) => (
            <li
              className="flex w-full px-4 py-2  hover:bg-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
              onClick={() => updateData(row.index, column.id, status)}
              key={status.id}
            >
              <ColorIcon color={status.color} />
              {status.name}
            </li>
          ))}
        </ul>
      </div >
    </>

  );
};
export default StatusCell;