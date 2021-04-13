import mongoose from "mongoose";
import EmailSchema from './../models/Email'
import EmailService from './../services/EmailService'

const email = mongoose.model("email", EmailSchema);
const emailService = new EmailService(email);

class EmailController {
    constructor(service) {
        this.service = service;
        this.insert = this.insert.bind(this);
        this.delete = this.delete.bind(this);
      }
    
      async insert(req, res) {
        let response = await this.service.insert(req.body);
        if (response.error) return res.status(response.statusCode).send(response);
        return res.status(201).send(response);
      }
  
      async delete(req, res) {
        const {id} = req.params;
        let response = await this.service.delete(id);
        return res.status(response.statusCode).send(response);
      }
}


export default new EmailController(emailService);