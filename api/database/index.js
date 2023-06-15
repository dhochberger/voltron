const { Mongoose } = require('mongoose');
const fs = require('fs');

require('dotenv').config();

const mongoose = new Mongoose();

if (process.env.NODE_ENV === "development" || process.env.NODE_ENV === "test") {
    process.env.DB_ADDRESS = `mongodb+srv://${process.env.DEV_DB_USERNAME}:${process.env.DEV_DB_PWD}@${process.env.DEV_DB_ADDRESS}/${process.env.NODE_ENV === 'test' ? 'TEST_'+process.env.DEV_DB_NAME : 'DEV_'+process.env.DEV_DB_NAME}?retryWrites=true&w=majority&ssl=true`
}
else if (process.env.NODE_ENV === "production") {
    process.env.DB_ADDRESS = `mongodb://${process.env.PROD_DB_USERNAME}:${process.env.PROD_DB_PWD}@${process.env.PROD_DB_ADDRESS}/${process.env.PROD_DB_NAME}?retryWrites=true&w=majority&ssl=true`
}

(async () => {
    try {
        await mongoose.connect(
            `${process.env.DB_ADDRESS}`,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useCreateIndex: true,
                useFindAndModify: false,
                /*sslKey: credentials,
                sslCert: credentials,*/
            }
        );
        console.log('db is connect');
    } catch (error) {
        console.log('Unable to connect to db ', error);
    }
})();

module.exports = mongoose;
