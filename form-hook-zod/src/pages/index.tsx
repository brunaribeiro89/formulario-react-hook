import PromotionFormComponent, { CreatePromotionFormData, PromotionApi } from "@/components/PromotionsForms";
import { TaskTableComponent } from "@/components/TaskTable";
import { useRef, useState } from "react";


export default function PromotionPage() {
  const [output, setOutput] = useState('')
  const promotionFormRef = useRef<PromotionApi>(null)

  const handleSubmit = async (data: CreatePromotionFormData) => {
    setOutput(JSON.stringify(data, null, 2))
    console.log('handle submit ready data', data)
    const httpResponse = await fetch(('api/promotions'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: data.name,
        id_region: data.id_region,
        promotion_type: data.promotion_type,
        segment: data.segment,
        accounts: data.accounts,
        initial_date: data.initial_date,
        final_date: data.final_date,
        items: data.items.map(item => { item.name, item.price, item.quantity })

      })

    })
    const jsonResponse = await httpResponse.json()

    if (!jsonResponse.success) {
      console.log(jsonResponse.errors)
      promotionFormRef.current?.setErrors(jsonResponse.errors)
    }
    console.log(jsonResponse)
  }
  return (
    <div className="flex justify-center items-center w-screen h-screen">
      {/*<PromotionFormComponent onSubmitReady={handleSubmit} output={output} ref={promotionFormRef} />*/}
      <TaskTableComponent />
    </div>

  )
}


