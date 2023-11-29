import type { NextApiRequest, NextApiResponse } from 'next'
import sqlite3 from "sqlite3"
//const sqlite3 = require('sqlite3').verbose();
const sql = sqlite3.verbose();
//const db = new sqlite3.Database(':memory:');

const db = new sql.Database("./todoro.db", sql.OPEN_READWRITE, (err: any) => {
  if(err) return console.log('Database error ', err);
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  db.run('DELETE FROM todos WHERE id = (?)', req.body.id, err => {
    if(err) return console.log(`DELETE FAILED! `, err);
  });
  console.log('request => ', req.body);
  res.status(200).json({ name: 'John Doe' })
}
