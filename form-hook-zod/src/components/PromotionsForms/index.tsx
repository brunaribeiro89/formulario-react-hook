
import { useForm, useFieldArray, Controller } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react'
import { TextField } from '@/components/TextField'


export const BasicPromotionFormSchema = z.object({
  name: z.string().nonempty('Campo  obrigatório').transform(name => { return name.trim().split(' ').map(word => { return word[0].toLocaleUpperCase().concat(word.substring(1)) }).join(' ') }),
  id_region: z.string().nonempty('Campo  obrigatório').min(5, "Id região deve conter 5 caracteres").toUpperCase(),
  promotion_type: z.string().nonempty('Campo  obrigatório'),
  segment: z.string().nonempty('Campo  obrigatório'),
  accounts: z.string().nonempty('Campo  obrigatório').min(14, { message: "CNPJ preencha somente com números." }).regex(/^[0-9]+$/, { message: "Preencha somente com números." }).length(14, { message: "14 números requeridos." }).transform(value => `${value.slice(0, 2)}.${value.slice(2, 5)}.${value.slice(5, 8)}/${value.slice(8, 12)}-${value.slice(12, 14)}`),
  initial_date: z.coerce.date({
    invalid_type_error: "Campo Obrigatório",
  }).refine((data) => data >= new Date(), { message: "Preencha com uma data inical válida" }),
  final_date: z.coerce.date({
    invalid_type_error: "Campo Obrigatório",
  }),
  items: z.array(z.object({
    name: z.string().nonempty('Campo obrigatório'),
    price: z.coerce.number({
      required_error: "Campo Obrigatório",
      invalid_type_error: "Preencha apenas com números",
    }
    ).positive(),
    quantity: z.coerce.number({
      required_error: "Campo Obrigatório",
      invalid_type_error: "Preencha apenas com números",
    }).int().positive()
  }))
}).refine((data) => data.final_date >= data.initial_date, {
  path: ['final_date'],
  message: 'Data final menor que data inicial'
}).refine((fields) => fields.items.length, {
  path: ['items'],
  message: 'Insira pelo menos um item obrigatório'
}).transform((field) => ({
  name: field.name,
  id_region: field.id_region,
  promotion_type: field.promotion_type,
  segment: field.segment,
  accounts: field.accounts,
  initial_date: field.initial_date,
  final_date: field.final_date,
  items: field.items.map((item) =>
  ({
    name: item.name,
    price: item.price,
    quantity: item.quantity
  }))
}))


const PromotionResults = z.array(BasicPromotionFormSchema)
export type CreatePromotionFormData = z.infer<typeof BasicPromotionFormSchema>
type FormProps = {
  onSubmitReady: (data: CreatePromotionFormData) => Promise<void>
  output?: any
}
export interface PromotionApi {
  setErrors: (errors: Record<string, string>) => void
}

export const PromotionFormComponent = forwardRef(({ ...props }: FormProps, ref) => {
  const [open, setOpen] = useState<boolean | null | any>(false)

  const toggle = (indexItem: any) => {
    if (open == indexItem) {
      return setOpen(null)
    }
    setOpen(indexItem)
  }
  const { register, handleSubmit, setError, trigger, formState: { errors, isValid, isDirty }, control, watch } = useForm<CreatePromotionFormData>({
    mode: 'all',
    criteriaMode: 'all',
    resolver: zodResolver(BasicPromotionFormSchema),


  })
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'items',
    rules: {
      required: "Adicione um Item a promoção",
    },
  })


  const setErrorRef = useRef(setError)
  setErrorRef.current = setError
  useImperativeHandle(ref, () => {
    return {
      setErrors: (errors: any) => {
        console.log('setErrors', errors)
        Object.entries(errors).forEach(([key, value]) => {
          setErrorRef.current(key as "name" | "id_region" | "promotion_type" | "segment" | "accounts" | "initial_date" | "final_date" | "items" | `items.${number}` | `items.${number}.name` | `items.${number}.price` | `items.${number}.quantity`, { message: value })
        })
      }
    }
  }, [])


  function addNewItem() {
    append({
      name: '',
      price: 0.0,
      quantity: 0.0,
    })
  }
  const items = watch(["items"])
  const controlledFields = fields.map((field, index) => {
    return {
      ...field,
      ...items[index]
    };
  });

  console.log(`watch(["items"])`, watch(["items"]));

  const formatCurrency = (value: any, currency: any, localeString: any) => {
    const options = { style: "currency", currency }
    return value.toLocaleString(localeString, options)
  }

  return (
    <main
      className={`flex flex-col gap-10 min-h-screen items-center justify-center p-24 bg-slate-400`}
    >
      <button onClick={() => trigger()}>Display Data Requirements</button>
      <form onSubmit={handleSubmit(props.onSubmitReady)} {...props} className='flex flex-col w-full max-w-4xl p-12 gap-4 bg-slate-200 rounded'>
        <div className='flex flex-col gap-1'>
          <TextField label={'Nome da Promoção'} type={'text'} id="name" error={errors.name?.message as string} inputProps={{ ...register('name') }} placeholder='Nome da promoção' />
        </div>

        <div className='flex flex-col gap-1'>
          <TextField label={'Id Região'} type={'text'} id="id_region" error={errors.id_region?.message as string} inputProps={{ ...register('id_region') }} placeholder='Id da Região' />
        </div>
        <div className='flex flex-col gap-1'>
          <TextField label={'Tipo Promoção'} type={'text'} id="promotion_type" error={errors.promotion_type?.message as string} inputProps={{ ...register('promotion_type') }} placeholder='Tipo da promoção' />
        </div>
        <div className='flex flex-col gap-1'>
          <TextField label={'Seguimento'} type={'text'} id="segmento" error={errors.segment?.message as string} inputProps={{ ...register('segment') }} placeholder='Segmento da promoção' />
        </div>
        <div className='flex flex-col gap-1'>
          <TextField label={'CNPJ'} type={'text'} id="accounts" error={errors.accounts?.message as string} inputProps={{ ...register('accounts', { valueAsNumber: false }) }} placeholder='CNPJ cliente(s)' />
        </div>
        <div className='flex flex-1 basis-full space-x-4'>
          <div className='flex flex-col  basis-1/2 gap-1'>
            <TextField label={'Data Inicial'} type={'date'} id="initial-date" error={errors.initial_date?.message as string} inputProps={{ ...register('initial_date', { required: true }) }} placeholder='Data Inicial' />
          </div>
          <div className='flex flex-col  basis-1/2 gap-1'>
            <TextField label={'Data final'} type={'date'} id="final-date" error={errors.final_date?.message as string} inputProps={{ ...register('final_date', { required: true }) }} placeholder='Data Final' />
          </div>
        </div>


        <div className='flex flex-col gap-1'>
          <label className='flex items-center justify-between text-black font-normal' htmlFor='item'>
            Item Promoção
            <button type='button' onClick={addNewItem} className='text-slate-700 text-xs w-20 py-2 rounded bg-amber-300'>Adicionar</button>
          </label>
          {controlledFields.map((field, index) => {
            return (
              <div className='flex flex-wrap  gap-3' key={field.id} onClick={() => toggle(index)} open={open === index} >
                <div className='flex-1 flex flex-col gap-1'>
                  <Controller
                    control={control}
                    name={`items.${index}.name`}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        error={errors.items?.[index]?.name?.message as string}
                        id="item-name"
                        key={field.name}
                        type={'text'}
                        label={'Nome Item'}
                        placeholder='Nome Item'
                        inputProps={{ ...register(`items.${index}.name`), required: true }}
                      />
                    )}
                  />

                </div>
                <div className='flex-1 flex flex-row gap-1 items-center'>
                  <Controller
                    control={control}
                    name={`items.${index}.price`}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        inputMode='numeric'
                        placeholder='R$ 0.00'
                        key={field.name}
                        onKeyDown={(e: { key: string; preventDefault: () => any }) => ["e", "E", "+", "-"].includes(e.key) && e.preventDefault()}
                        label={'Preço Item'} type={'number'}
                        id="item-price"
                        error={errors.items?.[index]?.price?.message as string}
                        inputProps={{ ...register(`items.${index}.price`, { valueAsNumber: true }), required: true }}
                      />
                    )}
                  />
                  <Controller
                    control={control}
                    name={`items.${index}.quantity`}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        inputMode='numeric'
                        placeholder='0 quantidades'
                        key={field.name}
                        onKeyDown={(e: { key: string; preventDefault: () => any }) => ["e", "E", "+", "-"].includes(e.key) && e.preventDefault()}
                        label={'Quantidade Item'}
                        type={'number'}
                        id="item-quantity"
                        error={errors.items?.[index]?.quantity?.message as string}
                        inputProps={{ ...register(`items.${index}.quantity`, { valueAsNumber: true }), required: true }}
                      />
                    )}
                  />

                </div>

                <button type='button' onClick={() => remove(index)} className='text-slate-700 text-xs w-20 py-2 rounded bg-amber-300'>Remover</button>
              </div>


            )
          })}

          {errors.items && <span className='text-sm text-red-500'>{errors.items.message}</span>}

        </div>
        <button className={['disabled && bg-slate-400 hover:bg-slate-500', 'bg-purple-600', 'rounded', 'font-semibold', 'text-white', 'h-10', 'hover:bg-purple-300'].join(" ")} type="submit" disabled={!isDirty}>Salvar</button>
        <pre>{props.output}</pre>
      </form>


    </main>
  )

})
export default PromotionFormComponent

