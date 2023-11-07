import mongoose from "mongoose";

const connect = async () => {
  if (mongoose.connections[0].readyState) return;
  try {
    // await mongoose.connect(process.env.MONGO_URL);
    await mongoose.connect("mongodb+srv://abubakar:Blockchain29@cluster0.kwwt0up.mongodb.net/?retryWrites=true&w=majority");
    console.log("Mongoose Connection Done");
  } catch (err) {
    throw new Error("Error Connecting to Mongoose");
  }
};

export default connect;
