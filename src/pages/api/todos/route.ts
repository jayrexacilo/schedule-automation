import type { NextApiRequest, NextApiResponse } from 'next'

export async function POST(req, res: NextApiResponse) {
  const res = await fetch('https://data.mongodb-api.com/...', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'API-Key': process.env.DATA_API_KEY,
    },
    body: JSON.stringify({ time: new Date().toISOString() }),
  })
 
  const data = await res.json()

  console.log('res => ', res);
 
  return res.json(data)
}
