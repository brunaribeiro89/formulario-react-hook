
import { useState } from "react";
import { STATUSES } from "../data";
import { ColorIcon } from "./StatusCell";

const StatusItem = ({ status, setColumnFilters, isActive }: any) => (
  <li
    className={`flex justify-start items-center px-4 py-2 hover:bg-gray-100 hover:text-gray-600 cursor-pointer font-bold ${isActive ? "bg-gray-400" : "transparent"}`}
    onClick={() =>
      setColumnFilters((prev: any) => {
        const statuses = prev.find((filter: any) => filter.id === "status")?.value;
        if (!statuses) {
          return prev.concat({
            id: "status",
            value: [status.id],
          });
        }

        return prev.map((f: any) =>
          f.id === "status"
            ? {
              ...f,
              value: isActive
                ? statuses.filter((s: any) => s !== status.id)
                : statuses.concat(status.id),
            }
            : f
        );
      })
    }
  >
    <ColorIcon color={status.color} mr={3} />

    {status.name}

  </li>
);

const FilterPopover = ({ columnFilters, setColumnFilters, }: any) => {
  const [openFilterModal, setOpenFilterModal] = useState(false)
  const filterStatuses =
    columnFilters.find((f: any) => f.id === "status")?.value || [];

  return (
    <div >

      <button
        onClick={() => { setOpenFilterModal(true), console.log(openFilterModal) }}
        className="flex justify-between items-center w-26 h-10 p-2 text-xl font-medium border-2 rounded-md bg-[#5fa3cfbd] hover:bg-[#156aaf67]"
        color={filterStatuses.length > 0 ? "bg-blue-300" : ""}
      >
        <span>Filtrar</span>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.0} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z" />
        </svg>


      </button>
      {/*<!-- Main modal -->*/}
      <div id="staticModal" data-modal-backdrop="static" tabIndex={-1} aria-hidden="true">
        <div className="relative w-full max-w-2xl max-h-full">
          {  /*<!-- Modal content -->*/}
          <div className={`fixed z-50 ${!openFilterModal && `hidden`} mt-2 bg-white rounded-lg shadow`}>
            {  /*<!-- Modal header -->*/}
            <div className="flex items-center justify-between p-4 border-b rounded-t ">

              <span className="text-sm font-medium text-slate-500">
                Filtrar:  Status
              </span>
              <button onClick={() => { setOpenFilterModal(false), console.log(openFilterModal) }} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 " data-modal-hide="staticModal">
                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            { /*<!-- Modal body -->*/}

            <div className="p-6 space-y-6">
              <ul className="flex flex-col justify-start w-44 p-2 bg-[#156aaf67] border rounded-md" >
                {STATUSES.map((status) => (
                  <StatusItem
                    status={status}
                    isActive={filterStatuses.includes(status.id)}
                    setColumnFilters={setColumnFilters}
                    key={status.id}
                  />
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default FilterPopover;