import mongoose from 'mongoose';
import { gridFSBucketService } from '../shared/services/grid-fs-bucket.js';

function createConnection() {
    mongoose.connect(`${process.env.MONGO_URL}`, {
        dbName: process.env.MONGO_DB,
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    const connection = mongoose.connection;

    connection.on('error', (error) =>
        console.log(`\u001b[1;31m\nDatabase error: ${error}`)
    );
    connection.once('open', () => {
        gridFSBucketService.init(connection.db)
        console.log(
            '\u001b[1;32m\nConnection to database established'
        );
    });

    return connection;
}

export default createConnection();