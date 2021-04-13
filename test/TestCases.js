const assert = require('assert');
const fs = require('fs');
const mongoose = require('mongoose');
const csv = require('csv-parser');
import PatientSchema from '../src/models/Patient';
import './../config/database';



describe('Email Scheduler Service Test', () => {
    it('emails for each patient are scheduled correctly', () => {
        patientsConsent = await patient.find({'CONSENT': 'Y', "Email Address": {"$ne": ""}});
        emails = []
        var end =  new Promise( (resolve, reject) => {fs.createReadStream('../logs/emails.log')
            .on('data', (data) => {
                emailName = data.split(" ")[3] + " " + data.split(" ")[4];
                emails.push(emailName);
            })
            .on('end', () => {
              resolve()
            })
            .on('error', reject);
          });
        await end;
        
        var end =  new Promise( (resolve, reject) => {fs.createReadStream('../logs/users.log')
        .on('data', (data) => {
            emailName = data.split(" ")[3].split("-")[0];
            emails.push(emailName);
        })
        .on('end', () => {
          resolve()
        })
        .on('error', reject);
      });
        await end;
        assert
       });
    it('Emails were created in Emails Collection for patients who have CONSENT as Y', () => {
        
        patientsConsent = await patient.find({'CONSENT': 'Y', "Email Address": {"$ne": ""}});
        patientWithEmail = new Set()
        var end =  new Promise( (resolve, reject) => {fs.createReadStream('../logs/users.log')
            .on('data', (data) => {
                email = data.split(" ")[3].split("-")[0];
                patientWithEmail.add(email);
                if(patientWithEmail.length == patientsConsent.length) break;
            })
            .on('end', () => {
              resolve()
            })
            .on('error', reject);
          });

        await end;
        assert(patientWithEmail.length, patientsConsent.length);
       });
    it('data in flat file matches the data in Patients collection', () => {
        patient = mongoose("patient", PatientSchema);
        patientsDB = await patient.find({});
        patientsCSV = []
        var end =  new Promise( (resolve, reject) => {fs.createReadStream('../input.csv')
            .pipe(csv({ separator: '|' }))
            .on('data', (data) => {
                patientsCSV.push(data);
            })
            .on('end', () => {
              resolve()
            })
            .on('error', reject);
          });
        await end;
        assert(patientsDB.length, patientsCSV);
    })
});