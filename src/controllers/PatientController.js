import mongoose from "mongoose";
import PatientSchema from './../models/Patient'
import PatientService from './../services/PatientService'
import fs from "fs"

const csv = require('csv-parser');
const patient = mongoose.model("patients", PatientSchema)
const patientService = new PatientService(patient)
 
class PatientController {
    constructor(service) {
        this.service = service;
        this.insert = this.insert.bind(this);
        this.delete = this.delete.bind(this);
        this.getAllMissingFirstName = this.getAllMissingFirstName.bind(this);
        this.getConsentYMissingEmail = this.getConsentYMissingEmail.bind(this);
        this.getConsentYEmails = this.getConsentYEmails.bind(this); 
      }
      
      async insert(req, res) {
        const results = [];
        console.log(req.file.path);        
        var end =  new Promise( (resolve, reject) => {fs.createReadStream(req.file.path)
          .pipe(csv({ separator: '|' }))
          .on('data', (data) => {
            results.push(data);
          })
          .on('end', () => {
            resolve()
          })
          .on('error', reject);
        });
        
        await end;
        console.log("csv extraction complete")
        console.log(results);
        let response = await this.service.insert(results);
        if (response.error) return res.status(response.statusCode).send(response);
        return res.status(201).send(response);
      }
  
      async delete(req, res) {
        const {id} = req.params;
        let response = await this.service.delete(id);
        return res.status(response.statusCode).send(response);
      }

      async getAllMissingFirstName(req, res) {
          let response = await this.service.getAllMissingFirstName();
          return res.status(response.statusCode).send(response);
      }

      async getConsentYMissingEmail(req, res) {
        let response = await this.service.getConsentYMissingEmail();
        console.log(response);
        return res.status(response.statusCode).send(response);
    }

    async getConsentYEmails(req, res) {
      let response = await this.service.getConsentYEmails();
      return res.status(response.statusCode).send(response);
  }

}

export default new PatientController(patientService);