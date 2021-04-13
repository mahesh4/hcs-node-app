import EmailController from './../src/controllers/EmailController';
import PatientController from './../src/controllers/PatientController'
import multer from 'multer'

var upload = multer({dest: 'tmp/csv/' });

export default (app) => {
  app.post(`/patient-records/upload`, upload.single("records"), PatientController.insert);
  app.post(`/email/create`, EmailController.insert);
  app.get(`/patient-records/missing/first-name`, PatientController.getAllMissingFirstName)
  app.get(`/patient-records/missing/email`, PatientController.getConsentYMissingEmail);
}