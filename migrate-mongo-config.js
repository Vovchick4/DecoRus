import path from 'path';

const config = {
    mongodb: {
        databaseName: process.env.MONGO_DB,
        url: process.env.MONGO_URL,
        options: {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    },
    migrationFileExtension: '.js',
    changelogCollectionName: 'changelog',
    migrationsDir: path.resolve(path.dirname("Decorus"), 'db', 'migrations')
};

export default config;