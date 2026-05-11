import "dotenv/config"
import app from "./app.js";
import { connect_db } from "./config/db.js";
const port = process.env.PORT;

const start = async () => {
    await connect_db();
    app.listen(port, ()=>{
        console.log(`Server running on ${port}`);
    })
}

start();