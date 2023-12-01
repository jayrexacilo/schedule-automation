import type { NextApiRequest, NextApiResponse } from 'next'
import sqlite3 from "sqlite3"
//const sqlite3 = require('sqlite3').verbose();
const sql = sqlite3.verbose();
//const db = new sqlite3.Database(':memory:');

const db = new sql.Database("./main.db", sql.OPEN_READWRITE, (err: any) => {
  if(err) return console.log('Database error ', err);
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {teacher_id, subject_id} = JSON.parse(req.body);

  db.all(`SELECT * FROM schedules WHERE teacher_id = ${teacher_id} AND subject_id = ${subject_id}`, (err, row) => {
    res.status(200).json(row)
  });
}
