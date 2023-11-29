import type { NextApiRequest, NextApiResponse } from 'next'
import sqlite3 from "sqlite3"
//const sqlite3 = require('sqlite3').verbose();
const sql = sqlite3.verbose();
//const db = new sqlite3.Database(':memory:');

const db = new sql.Database("./main.db", sql.OPEN_READWRITE, (err: any) => {
  if(err) return console.log('Database error ', err);
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {firstname, lastname} = JSON.parse(req.body);
  const data = [null, firstname, lastname];
  console.log('data =>', data);
  db.run('INSERT INTO teachers (id, firstname, lastname) VALUES (?,?,?)', data, err => {
    if(err) return console.log(`INSERT FAILED! `, err);
  });
  console.log('request => ', req.body);
  res.status(200).json({ name: 'John Doe' })
}
