import type { NextApiRequest, NextApiResponse } from 'next'
import sqlite3 from "sqlite3"
const sql = sqlite3.verbose();

const db = new sql.Database("./main.db", sql.OPEN_READWRITE, (err: any) => {
  if(err) return console.log('Database error ', err);
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const data = JSON.parse(req.body);
  if(!data.teacher_id) return res.status(200).json([]);
  console.log('data.teacher_id => ', data.teacher_id);
  db.all(`
         SELECT *,
            (SELECT label FROM subjects WHERE id = s.subject_id) as subject_name,
            (SELECT lastname || ", " || firstname FROM teachers WHERE id = s.teacher_id) as teacher_name
         FROM schedules s
         WHERE teacher_id = (SELECT id FROM teachers WHERE teacher_id = "${data.teacher_id}")
   `, (err, row) => {
    console.log('row => ', row);
    console.log('error => ', err);
    res.status(200).json(row)
  });
}
