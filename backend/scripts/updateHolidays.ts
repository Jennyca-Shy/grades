import mongoose from 'mongoose';
import holiday from '../models/holiday.js';
import { Holiday } from 'open-holiday-js';
import * as dotenv from 'dotenv';

dotenv.config({ path: './backend/.env' });
const holidayAPI = new Holiday();

async function updateHolidays() {
  try {
    await mongoose.connect('mongodb://localhost/subscribers');
    console.log('Connected to database!');

    const year = new Date().getFullYear();
    const country = 'DE';
    const subdivisions = ['DE-BY'];

    for (const sub of subdivisions) {
      const schoolHolidays = await holidayAPI.getSchoolHolidays(
        country,
        new Date(year, 0, 1),
        new Date(year, 11, 31),
        sub,
      );

      const mp = schoolHolidays.map((hol) => ({
        name: hol.name,
        startDate: hol.startDate,
        endDate: hol.endDate,
        subdivisions: sub,
      }));
      await holiday.insertMany(mp);
    }
  } catch (error) {
    console.log('Error: ', error);
  } finally {
    await mongoose.disconnect();
  }
}

updateHolidays();

//possibly change the comments in holiday.js model
//run with npx ts-node backend/scripts/updateHolidays.ts
