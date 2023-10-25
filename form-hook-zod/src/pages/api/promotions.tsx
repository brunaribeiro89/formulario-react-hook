import { NextApiRequest, NextApiResponse } from "next";


export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { name, id_region, promotion_type, segment, accounts, initial_date, final_date, items } = req.body

  console.log('POST/promotions', req.body, { name: name, id_region: id_region, promotion_type: promotion_type, segment: segment, accounts: accounts, initial_date: initial_date, final_date: final_date, items: items });
  await new Promise((resolve) => setTimeout(resolve, 1000))
  res.status(200).json({ sucess: true })

}
