import { forwardRef } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import ptBR from "date-fns/locale/pt-BR";
import "react-datepicker/dist/react-datepicker.css";



registerLocale('ptBR', ptBR);
var formatter = new Intl.DateTimeFormat('pt-Br');
const DateCustomInput = forwardRef<HTMLDivElement, any>(({ value, onClick, clearDate }: any, ref) => (
  <div ref={ref} onClick={onClick} className="flex flex-1 w-40 justify-center items-center">
    {value ? (
      <>
        {value}
        <div
          className="absolute cursor-pointer right-3 text-base text-red-500"
          onClick={(e) => {
            e.stopPropagation();
            clearDate();
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>

        </div>
      </>
    ) : (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
      </svg>

    )}
  </div >
));

const DateCell = ({ getValue, row, column, table }: any) => {
  const date = getValue();
  const { updateData } = table.options.meta;
  const months = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];

  return (
    <DatePicker
      wrapperClassName="date-wrapper"
      dateFormat={formatter.format(date)}
      closeOnScroll={true}
      locale="ptBR"
      monthsShown={1}
      selected={date}
      minDate={new Date()}
      onChange={(date) => updateData(row.index, column.id, date)}
      customInput={
        <DateCustomInput
          clearDate={() => updateData(row.index, column.id, null)}
        />
      }
    />
  );
};
export default DateCell;