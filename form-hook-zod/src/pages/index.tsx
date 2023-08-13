
import { Inter } from 'next/font/google'
import {useForm, useFieldArray} from 'react-hook-form'
import { useEffect, useState } from 'react'
import {ZodType, z} from 'zod'
import{ zodResolver } from '@hookform/resolvers/zod'
import React from 'react'


export const BasicPromotionFormSchema  = z.object({
  name: z.string().nonempty('Nome da promoção é obrigatório').transform( name =>{return name.trim().split(' ').map(word =>{return word[0].toLocaleUpperCase().concat(word.substring(1))}).join(' ')}),
  id_region: z.string().nonempty('Id da região é obrigatório').min(5, "Id região deve conter 5 caracteres" ).toUpperCase(),
  promotion_type: z.string().nonempty('Tipo de promoção é obrigatório'),
  segment: z.string().nonempty('Tipo de seguimento é obrigatório'),
  accounts: z.string().nonempty('CNPJ é obrigatório').min(14,{message:"CNPJ numbers are a minimum of 14 digits."}).regex(/^[0-9]+$/, { message: "Only numbers are allowed."}).length(14, {message: "14 numbers are required."}).transform(value => `${value.slice(0, 2)}.${value.slice(2, 5)}.${value.slice(5, 8)}/${value.slice(8, 12)}-${value.slice(12, 14)}`),
  initial_date: z.coerce.date().refine((data) => data >= new Date(), { message: "Preencha com uma data inical válida" }),
  final_date: z.coerce.date(),
  items: z.array(z.object({
    name: z.string().nonempty('Nome do item é obrigatório'),
    price: z.coerce.number({
      invalid_type_error: "Preço do item é obrigatório"
    }).positive(),
    quantity: z.coerce.number({
      invalid_type_error: "Quantidade de items é obrigatória"
    }).int().positive()
  }))
}).refine((data) => data.final_date >= data.initial_date , {
  path : [ 'final_date'],
  message: 'Data final menor que data inicial'
}).refine((fields) => fields.items.length , {
  path : ['items'],
  message: 'Insira pelo menos um item obrigatório'
} ).transform((field)=>({
  name: field.name,
  id_region: field.id_region,
  promotion_type: field.promotion_type,
  segment: field.segment,
  accounts: field.accounts,
  initial_date: field.initial_date,
  final_date: field.final_date,
  items: field.items.map((item)=>
  ({ 
   name: item.name,
   price: item.price,
   quantity: item.quantity
  }))
}))


const PromotionResults = z.array(BasicPromotionFormSchema)
type CreatePromotionFormData = z.infer<typeof BasicPromotionFormSchema>
type FormProps = {
  onClick: () => void
  open: boolean | null,
}

export const  FormComponent  = ({...props}: FormProps) => {
  const [output, setOutput] = useState('')
  const [open, setOpen] = useState<any>()
  const {register, handleSubmit,trigger, formState: {errors, isValid, isDirty}, control,watch } = useForm<CreatePromotionFormData>({
    mode: 'all',
    criteriaMode: 'all',
    resolver : zodResolver(BasicPromotionFormSchema),
    

  })
const {fields, append, remove} = useFieldArray({
  control,
  name: 'items'
})
  function createPromotion(data:CreatePromotionFormData) {
     setOutput(JSON.stringify(data, null, 2))
  }

  function addNewItem (){
    append({name: '', price: 0   , quantity: 0 })
  }
  const toggle =(indexItem: any) =>{
    if(open == indexItem) {
      return setOpen(null)
    }
    setOpen(indexItem)
  }
  
  const items = watch(["items"])

  console.log(`watch(["items"])`, watch(["items"]));

  const formatCurrency = (value : any, currency : any, localeString : any) => {
    const options = { style: "currency", currency }
    return value.toLocaleString(localeString, options)
  }

  return (
    <main
      className={`flex flex-col gap-10 min-h-screen items-center justify-center p-24 bg-slate-400`}
    >

      <button onClick={()=> trigger()}>Display Data Requirements</button>
      <form onSubmit={handleSubmit(createPromotion)} {...props} className='flex flex-col w-full max-w-4xl p-12 gap-4 bg-slate-200 rounded'>
        <div className='flex flex-col gap-1'> 
        <label className='text-black font-normal' htmlFor='name'>Nome Promoção</label>
        <input {...register('name')} id='name' className='border border-zinc-300 shadow-sm rounded h-10 px-3' type="text" />
       {errors.name?.message && <span className='text-sm text-red-500'>{errors.name.message}</span>}
        </div>
        <div  className='flex flex-col gap-1'>
        <label  className='text-black font-normal'  htmlFor='id_region'>Id Região</label>
        <input {...register('id_region')} id="id_region" className='border border-zinc-300 shadow-sm rounded h-10 px-3' type="text" />
        {errors.id_region?.message && <span className='text-sm text-red-500'>{errors.id_region.message}</span>}
        </div>
        <div  className='flex flex-col gap-1'>
        <label  className='text-black font-normal'  htmlFor='promotion_type'>Tipo Promoção</label>
        <input {...register('promotion_type')} id="promotion_type" className='border border-zinc-300 shadow-sm rounded h-10 px-3' type="text" />
        {errors.promotion_type?.message && <span className='text-sm text-red-500'>{errors.promotion_type.message}</span>}
        </div>
        <div  className='flex flex-col gap-1'>
        <label  className='text-black font-normal'  htmlFor='segmento'>Seguimento</label>
        <input {...register('segment')} id="segmento" className='border border-zinc-300 shadow-sm rounded h-10 px-3' type="text" />
        {errors.segment?.message && <span className='text-sm text-red-500'>{errors.segment.message}</span>}
        </div>
        <div  className='flex flex-col gap-1'>
        <label  className='text-black font-normal'  htmlFor='accounts'>CNPJ</label>
        <input {...register('accounts',{ valueAsNumber: true })} id="accounts" className='border border-zinc-300 shadow-sm rounded h-10 px-3' type="text" />
        {errors.accounts?.message && <span className='text-sm text-red-500'>{errors.accounts.message}</span>}
        </div>
        <div className='flex flex-1 basis-full space-x-4'>
        <div  className='flex flex-col  basis-1/2 gap-1'>
        <label  className='text-black font-normal'  htmlFor='initial-date'>Data Inicial</label>
        <input {...register('initial_date', {required: "Campo obrigatório"})} id="initial-date" className='border border-zinc-300 shadow-sm rounded h-10 px-3' type="date" />
        {errors. initial_date?.message && <span className='text-sm text-red-500'>{errors.initial_date?.message}</span>}
        </div>
        <div  className='flex flex-col  basis-1/2 gap-1'>
        <label  className='text-black font-normal'  htmlFor='final-date'>Data final</label>
        <input {...register('final_date', {required: "Campo obrigatório"})} id="final-date" className='border border-zinc-300 shadow-sm rounded h-10 px-3' type="date"/>
        {errors.final_date?.message && <span className='text-sm text-red-500'>{errors.final_date?.message}</span>}
        </div>
        </div>
      
        
        <div  className='flex flex-col gap-1'>
        <label  className='flex items-center justify-between text-black font-normal'  htmlFor='item'>
          Item Promoção
          <button type='button' onClick={addNewItem} className='text-slate-700 text-xs w-20 py-2 rounded bg-amber-300'>Adicionar</button>
        </label>
        {fields.map((field, index)=>{
          return (
            <div className='flex flex-wrap  gap-3' key={field.id} onClick={()=> toggle(index)} open={open === index} >
              <div className='flex-1 flex flex-col gap-1'>
              <label  className='text-black text-sm'  htmlFor='item-name'>Nome Item</label>
              <input {...register(`items.${index}.name`)} id="item-name" className='flex-1 border border-zinc-300 shadow-sm rounded h-10 px-3' type="text" />
                 {errors.items?.[index]?.name?.message && <span className='text-sm text-red-500'>{errors.items?.[index]?.name?.message}</span>}
              </div>
              <div className='flex-1 flex flex-col gap-1'>
              <label  className='text-black text-sm'  htmlFor='item-price'>Preço Item</label>
              <input inputMode='numeric' id="item-price" onKeyDown={(e)=>["e", "E","+","-"].includes(e.key)&& e.preventDefault()} placeholder="R$0.00"  {...register(`items.${index}.price`,{valueAsNumber: true})} className='flex-1 border border-zinc-300 shadow-sm rounded h-10 px-3' type="number" />
                 {errors.items?.[index]?.price?.message && <span className='text-sm text-red-500'>{errors.items?.[index]?.price?.message}</span>}
              </div>
              <div className='flex-1 flex flex-col gap-1'>
              <label  className='text-black text-sm'  htmlFor='item-quantiy'>Quantidade Item</label>
              <input inputMode='numeric' id="item-quantity" {...register(`items.${index}.quantity`,{valueAsNumber: true})} className='flex-1 border border-zinc-300 shadow-sm rounded h-10 px-3' type="number" />
                 {errors.items?.[index]?.quantity?.message && <span className='text-sm text-red-500'>{errors.items?.[index]?.quantity?.message}</span>}
              </div>
              <button type='button' onClick={() => remove(index)} className='text-slate-700 text-xs w-20 py-2 rounded bg-amber-300'>Remover</button>
            </div>
         

        )})}
          
          {errors.items && <span className='text-sm text-red-500'>{errors.items.message}</span>}
           
        </div>
        <button className='bg-purple-600 rounded font-semibold text-white h-10 hover:bg-purple-300' type="submit">Salvar</button>
        
      </form>
      <pre>{output}</pre>
      
    </main>
  )
 
}
export default FormComponent

