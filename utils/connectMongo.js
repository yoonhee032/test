import mongoose from "mongoose";

function connectMongo() {
  if (mongoose.connections[0].readyState) {
    console.log("connected already");
  } else {
    mongoose.connect(process.env.MONGO_URI, () => {
      console.log("mongo is connected");
    });
  }
}

export default connectMongo;
