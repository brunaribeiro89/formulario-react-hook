import Image from 'next/image'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main
      className={`flex min-h-screen items-center justify-between p-24 bg-slate-400`}
    >
      <form className='flex flex-col w-full max-w-sm p-12 gap-4 bg-slate-200 rounded'>
        <div className='flex flex-col gap-1'> 
        <label className='text-black font-normal' htmlFor='name'>Nome Promoção</label>
        <input className='border border-zinc-300 shadow-sm rounded h-10' type="text" name="name"></input>
        </div>
        <div  className='flex flex-col gap-1'>
        <label  className='text-black font-normal'  htmlFor='id_region'>Id Região</label>
        <input className='border border-zinc-300 shadow-sm rounded h-10' type="text" name="id_region"></input>
        </div>
        <div  className='flex flex-col gap-1'>
        <label  className='text-black font-normal'  htmlFor='promotion_type'>Tipo Promoção</label>
        <input className='border border-zinc-300 shadow-sm rounded h-10' type="text" name="promotion_type"></input>
        </div>
        <button className='bg-purple-600 rounded font-semibold text-white h-10 hover:bg-purple-300' type="submit">Salvar</button>
        
      </form>
      
    </main>
  )
}
