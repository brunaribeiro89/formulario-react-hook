import Image from 'next/image'
import { Inter } from 'next/font/google'
import {useForm, useFieldArray} from 'react-hook-form'
import { useState } from 'react'
import {number, z} from 'zod'
import{ zodResolver } from '@hookform/resolvers/zod'
const inter = Inter({ subsets: ['latin'] })

const createPromotionFormSchema = z.object({
  name: z.string().nonempty('Nome da promoção é obrigatório').transform( name =>{return name.trim().split(' ').map(word =>{return word[0].toLocaleUpperCase().concat(word.substring(1))}).join(' ')}),
  id_region: z.string().nonempty('Id da região é obrigatório').min(5, "Id região deve conter 5 caracteres" ).toUpperCase(),
  promotion_type: z.string().nonempty('Tipo de promoção é obrigatório'),
  items: z.array(z.object({
    name: z.string().nonempty('Nome do item é obrigatório'),
    price: z.coerce.number().positive().transform(price =>{return price.toFixed(2)}),
    quantity: z.coerce.number().int().positive().transform( quantity =>{return  quantity.toFixed(0)}),
  })).min(1,  "Insira pelo menos 1 item de promoção")
})
type CreatePromotionFormData = z.infer<typeof createPromotionFormSchema>
export default function Home() {
  const [output, setOutput] = useState('')
  const {register, handleSubmit, formState: {errors, isValid, isDirty}, control } = useForm<CreatePromotionFormData>({
    resolver : zodResolver(createPromotionFormSchema),

  })
const {fields, append, remove} = useFieldArray({
  control,
  name: 'items'
})
  function createPromotion(data:CreatePromotionFormData) {
     setOutput(JSON.stringify(data, null, 2))
  }

  function addNewItem (){
    append({name: '', price:'', quantity:''})
  }
 
  return (
    <main
      className={`flex flex-col gap-10 min-h-screen items-center justify-center p-24 bg-slate-400`}
    >
      <form onSubmit={handleSubmit(createPromotion)} className='flex flex-col w-full max-w-sm p-12 gap-4 bg-slate-200 rounded'>
        <div className='flex flex-col gap-1'> 
        <label className='text-black font-normal' htmlFor='name'>Nome Promoção</label>
        <input {...register('name')} className='border border-zinc-300 shadow-sm rounded h-10 px-3' type="text" ></input>
       {errors.name && <span className=''>{errors.name.message}</span>}
        </div>
        <div  className='flex flex-col gap-1'>
        <label  className='text-black font-normal'  htmlFor='id_region'>Id Região</label>
        <input {...register('id_region')} className='border border-zinc-300 shadow-sm rounded h-10 px-3' type="text" ></input>
        {errors.id_region && <span className=''>{errors.id_region.message}</span>}
        </div>
        <div  className='flex flex-col gap-1'>
        <label  className='text-black font-normal'  htmlFor='promotion_type'>Tipo Promoção</label>
        <input {...register('promotion_type')} className='border border-zinc-300 shadow-sm rounded h-10 px-3' type="text" ></input>
        {errors.promotion_type && <span className=''>{errors.promotion_type.message}</span>}
        </div>
        <div  className='flex flex-col gap-1'>
        <label  className='flex items-center justify-between text-black font-normal'  htmlFor=''>
          Item Promoção
          <button type='button' onClick={addNewItem} className='text-slate-700 text-xs'>Adicionar</button>
        </label>
        {fields.map((field, index )=>{
          return (
            <div className='flex flex-wrap  gap-3' key={field.id}>
              <div className='flex-1 flex flex-col gap-1'>
              <input {...register(`items.${index}.name`)} className='flex-1 border border-zinc-300 shadow-sm rounded h-10 px-3' type="text" ></input>
                 {errors.items?.[index]?.name && <span className=''>{errors.items?.[index]?.name?.message}</span>}
              </div>
              <div className='flex-1 flex flex-col gap-1'>
              <input {...register(`items.${index}.price`)} className='flex-1 border border-zinc-300 shadow-sm rounded h-10 px-3' type="number" ></input>
                 {errors.items?.[index]?.price && <span className=''>{errors.items?.[index]?.price?.message}</span>}
              </div>
              <div className='flex-1 flex flex-col gap-1'>
              <input {...register(`items.${index}.quantity`)} className='flex-1 border border-zinc-300 shadow-sm rounded h-10 px-3' type="number" ></input>
                 {errors.items?.[index]?.quantity && <span className=''>{errors.items?.[index]?.quantity?.message}</span>}
              </div>
              <button type='button' onClick={() => remove(index)} className='text-slate-700 text-xs'>Remover</button>
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


