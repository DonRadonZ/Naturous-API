import fs from 'fs';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Tour from './../../models/tourModel.js';


dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace('<DATABASE_PASSWORD>', process.env.DATABASE_PASSWORD);

mongoose.connect(DB, {    
}).then(() => {
    console.log('DB connection successful!');
});

// Read JSON File
const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours.json`, "utf-8"));

// IMPORT DATA INTO DB
const importData = async () => {
    try {
        await Tour.create(tours);
        console.log('Data successfully loaded!');
        process.exit();
    } catch {
        console.log(err)
    }
    process.exit();
}

// DELETE ALL DATA FROM DB
const deleteData = async () => {
    try {
        await Tour.deleteMany();
        console.log('Data successfully deleted!');
        process.exit();
    } catch {
        console.log(err)
    }
    process.exit();
}

if(process.argv[2] === '--import') {
    importData();
} else if (process.argv[2] === '--delete'){
    deleteData();
}

