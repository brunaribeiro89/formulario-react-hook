import FilterPopover from "./FilterPopover";

const Filters = ({ columnFilters, setColumnFilters }: any) => {
  const taskName = columnFilters.find((filtro: any) => filtro.id === "task")?.value as string || "";

  const onFilterChange = (id: string, value: any) =>
    setColumnFilters((prev: any) =>
      prev
        .filter((f: any) => f.id !== id)
        .concat({
          id,
          value,
        })
    );

  return (
    <div className="flex space-x-4 mb-2" >
      <div>
        <input
          className="flex w-80 h-10 border-2 rounded-md text-sm text-left pl-2"
          type="text"
          value={taskName}
          placeholder="Nome Task..."
          onChange={(e) => onFilterChange("task", e.target.value)}
        />

      </div>
      <FilterPopover
        columnFilters={columnFilters}
        setColumnFilters={setColumnFilters}
      />
    </div>
  );
};
export default Filters;