import type { NextApiRequest, NextApiResponse } from 'next'
import sqlite3 from "sqlite3"
//const sqlite3 = require('sqlite3').verbose();
const sql = sqlite3.verbose();
//const db = new sqlite3.Database(':memory:');

const db = new sql.Database("./main.db", sql.OPEN_READWRITE, (err: any) => {
  if(err) return console.log('Database error ', err);
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const data = JSON.parse(req.body);

  data.map(item => {
    const {subject_id, teacher_id, room, week, startTime, endTime} = item;
    const insertData = [null, subject_id, teacher_id, room, week, startTime, endTime];
    //console.log('item =>', item);
    //console.log('insertdata =>', insertData);
    db.run('INSERT INTO schedules (id, subject_id, teacher_id, room, week, start_time, end_time) VALUES (?,?,?,?,?,?,?)', insertData, err => {
      if(err) return console.log(`INSERT FAILED! `, err);
    });
  });
  //console.log('request => ', req.body);
  res.status(200).json({ name: 'John Doe' })
}
