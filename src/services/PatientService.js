
class PatientService {
    constructor(model) {
        this.model = model;
        this.insert = this.insert.bind(this);
        this.delete = this.delete.bind(this);
        this.getAllMissingFirstName = this.getAllMissingFirstName.bind(this);
        this.getConsentYMissingEmail = this.getConsentYMissingEmail.bind(this);
        this.getConsentYEmails = this.getConsentYEmails.bind(this);
    }
    async insert(patients) {
        console.log("inserting patients");
        try {
            let items = await this.model.insertMany(patients);
            if (items)
                return {
                    error: false,
                    items
                };
        } catch (error) {
            console.log("error", error);
            return {
              error: true,
              statusCode: 500,
              message: error.errmsg || "Not able to create item",
              errors: error.errors
            };
        }
    }

    async delete(patient_id) {
        console.log("delete called");
        return {
            error: false,
            statusCode: 200,
          };
    }

    async getAllMissingFirstName() {
        console.log("get_all_missing_first_name called");
        try {
            let patients = await this.model.find({"First Name": ''});
            return {
                error: false,
                statusCode: 200,
                data: patients
            };
        } catch (error) {
            console.log("error", error);
            return {
              error: true,
              statusCode: 500,
              message: error.errmsg || "Not able to create item",
              errors: error.errors
            };
        }
    }

    async getConsentYMissingEmail() {
        console.log("getConsentYMissingEmail called");
        try {
            let patients = await this.model.find({"Email Address": '', 'CONSENT': 'Y'});
            return {
                error: false,
                statusCode: 200,
                data: patients
            };
        } catch (error) {
            console.log("error", error);
            return {
              error: true,
              statusCode: 500,
              message: error.errmsg || "Not able to create item",
              errors: error.errors
            };
        }
    }

    async getConsentYEmails() {
        console.log("getConsentYEmails called");
        try {
            let patients = await this.model.find({'CONSENT': 'Y', "Email Address": {"$ne": ""}});
            // console.log(patients);
            return patients
        } catch (error) {
            console.log("error", error);
            return []
        }
    }
}

export default PatientService