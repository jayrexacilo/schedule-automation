import type { NextApiRequest, NextApiResponse } from 'next'
import sqlite3 from "sqlite3"
const sql = sqlite3.verbose();

const db = new sql.Database("./main.db", sql.OPEN_READWRITE, (err: any) => {
  if(err) return console.log('Database error ', err);
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  db.all('SELECT * FROM subjects ORDER BY id DESC', (err, row) => {
    res.status(200).json(row)
  });
}
