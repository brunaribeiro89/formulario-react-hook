import React, { useEffect, useRef } from "react";


const CheckBoxCell = ({ indeterminate, ...rest }: any) => {
  const ref = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (typeof indeterminate === 'boolean' && indeterminate !== null) {
      ref.current!.indeterminate = !rest.checked && indeterminate;
    }
  }, [ref, indeterminate])
  return (
    <div className="flex justify-center items-center " >

      <input
        className="flex w-4 h-4 border rounded-full"
        type="checkbox"
        ref={ref}
        {...rest}
      />



    </div>
  );
};
export default CheckBoxCell;