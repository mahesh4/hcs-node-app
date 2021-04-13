import PatientSchema from "./../../src/models/Patient";
import EmailSchema from "./../../src/models/Email";
import PatientService from "./../../src/services/PatientService";
import EmailService from "./../../src/services/EmailService";
import mongoose from "mongoose";

const schedule = require('node-schedule');
const log = require('simple-node-logger');

const emailLogger = log.createSimpleLogger({logFilePath: "logs/emails.log", timestampFormat:'YYYY-MM-DD HH:mm:ss.SSS'});
const userLogger = log.createSimpleLogger({logFilePath: "logs/users.log", timestampFormat:'YYYY-MM-DD HH:mm:ss.SSS'});

// log4js.configure({
//   appenders: {
//     email: { type: 'file', filename: '../../logs/emails.log' },
//     user: { type: 'file', filename: '../../logs/users.log' },
//     console: {type: 'console'}
//   },
//   categories: {
//     default: {
//       appenders: ['console'], level: 'all'
//     }, 
//     email: { 
//       appenders: ['email'], level: 'info' 
//     },
//     user: { 
//       appenders: ['user'], level: 'info' 
//     }
//   }
// });

// var emailLogger = log4js.getLogger('email'); 
// var userLogger = log4js.getLogger('user')

const patientSchema = mongoose.model("patient", PatientSchema);
const patientService = new PatientService(patientSchema);
const emailSchema = mongoose.model("email", EmailSchema);
const emailService = new EmailService(emailSchema);

const rule = new schedule.RecurrenceRule();
rule.second = 5;
var job = schedule.scheduleJob(rule, sendEmail);
var nextDate = null;

function scheduleEmail(req, res, next) {
  console.log(req.body);
  let from = req.body.scheduled_date.split("-")
  console.log(from)
  let date = new Date(from[2], from[1] - 1, from[0]);
  req.body.scheduled_date = date;
  if(nextDate == null) {
    nextDate = date;
  } else if(nextDate < date) {
      nextDate = date;
  } else {
      console.log("new data is greater than the scheduled date");
  }
  console.log("job scheduled on: ", nextDate);
  next();
}

async function sendEmail() {
  console.log("Sending Email to all patients who have given consent");
  let emails = await emailService.findByDate(nextDate);
  let consentPatients = await patientService.getConsentYEmails();
  emails.forEach(email => {
    emailLogger.info(email["Name"]);
    consentPatients.forEach(patient => {
        console.log("email sent to ", patient["Email Address"]);
        let message = patient["Email Address"] + "-" + email["Name"];
        userLogger.info(message);
    });
  });
}

export default scheduleEmail;