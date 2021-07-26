import * as cron from 'node-cron'
import { fillInventory } from './storeAPI';

function scheduleInventoryManagement() {
  cron.schedule('0 1 * * *', () => {
    console.log('Running a job at 01:00 at Indian timezone');
  }, {
    scheduled: true,
    timezone: "Asia/Kolkata"
  });
  
  cron.schedule('* * * * *', async() => {
    console.log('running a task every minute');
    // await fillInventory();
  });
}

module.exports = { scheduleInventoryManagement };