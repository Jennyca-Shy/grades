require('dotenv').config();

const express = require('express');
const app = express();
const mongoose = require('mongoose');

mongoose.connect(process.env.DATABASE_URL);
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('connected to database'));

//CORS
const cors = require('cors');
app.use(cors());

app.use(express.json());

app.listen(3000, () => console.log('Server started'));

//ROUTER
const homeworkRouter = require('./routers/homework');
app.use('/homework', homeworkRouter);

const subjectRouter = require('./routers/subject');
app.use('/subject', subjectRouter);

const gradeRouter = require('./routers/grade');
app.use('/grade', gradeRouter);

const scheduleRouter = require('./routers/schedule');
app.use('/schedule', scheduleRouter);

//Daily updates
// const cron = require('node-cron');
// const Homework = require('./models/homework');

// cron.schedule('0 0 * * *', async () => {
//   const now = new Date();
//   await Homework.updateMany(
//     {
//       dueDate: { $lt: now },
//       status: { $ne: 'finished' },
//     },
//     { $set: { $status: 'overdue' } },
//   );
// });
