import mongoose from "mongoose";

class Connection {
  constructor() {
    const url = process.env.MONGODB_URI || `mongodb://localhost:27017/hcs`;
    console.log("Establish new connection with url", url);
    mongoose.Promise = global.Promise;
    mongoose.connect(url, { 
      useNewUrlParser: true, 
      useCreateIndex: true, 
      useUnifiedTopology: true
  });
  }
}

export default new Connection();