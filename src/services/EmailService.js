
class EmailService {
    constructor(model) {
        this.model = model;
        this.insert = this.insert.bind(this);
        this.delete = this.delete.bind(this);
        this.findByDate = this.findByDate.bind(this);
    }

    async insert(email) {
        console.log("new email insert ", JSON.stringify(email));
        try {
            let item = await this.model.create(email);
            if (item)
              return {
                error: false,
                item
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

    async delete(email) {
        console.log("email delete ", JSON.stringify(email))
        return {
            error: false,
            statusCode: 200,
          };
    }

    async findByDate(date) {
      console.log("finding emails at date: ", date)
      try {
        let emails = await this.model.find({"scheduled_date": date});
        // console.log(emails);
        return emails
      } catch (error) {
          console.log("error", error);
          return [];
      }
    }
}

export default EmailService