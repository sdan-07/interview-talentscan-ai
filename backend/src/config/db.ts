import mongoose from "mongoose";

export const connect_db = async () => {
    try{
        await mongoose.connect(process.env.DB_URI as string);
        console.log("Connected to DB");
        
    }catch(e){
        console.error("Could not connect to DB: ",e)
    }
}