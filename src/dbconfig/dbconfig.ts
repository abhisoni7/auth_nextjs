import mongoose, { connection } from "mongoose";

export async function connect(){
    try {
        mongoose.connect(process.env.MONGO_URL!);
        const connection = mongoose.connection;

        connection.on('connected', () => {
            console.log('Mongo db connected successfully');
        });

        connection.on('error', (err) => {
            console.log('Mongo db connection error: ' + err);
            process.exit();
        });


    } catch (error: any) {
        console.error("Something went wrong");
        console.error(error);
    }
}