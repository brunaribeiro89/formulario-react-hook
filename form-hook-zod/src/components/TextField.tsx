import { ChangeHandler, RefCallBack } from "react-hook-form";

interface TextFieldProps {
  id?: string;
  label: string;
  error?: string
  type: string
  inputMode?: any
  onKeyDown?: ChangeHandler | any
  placeholder?: string
  key?: string
  inputProps?: {
    onChange?: ChangeHandler;
    onBlur?: ChangeHandler;
    ref?: RefCallBack;
    name: string;
    min?: string | number;
    max?: string | number;
    maxLength?: number;
    minLength?: number;
    pattern?: string;
    required?: boolean;
    disabled?: boolean;
  }
}


export const TextField = (props: TextFieldProps) => {
  return (

    <>
      <label className='text-black font-normal' htmlFor={props.id}>
        <span className="label-text">{props.label}</span>
      </label>
      <input
        className='borderborder-zinc-100 shadow-sm rounded h-10 px-3'
        id={props.id}
        key={props.key}
        type={props.type ?? "text"}
        {...(props.inputProps ?? {})}
        inputMode={props.inputMode}
        placeholder={props.placeholder}
        onKeyDown={props.onKeyDown} />

      {props.error ? (<span className='text-sm text-red-500'>{props.error}</span>) : null}
    </>
  )
}