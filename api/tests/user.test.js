//During the test the env variable is set to test
require('dotenv').config();

process.env.NODE_ENV="test"
process.env.DB_NAME="TEST_Voltron"
process.env.API_URL="/users"

const mongoose = require('../database');
const User = require('../models/user');


describe('Users', () => {

    beforeEach(async () => {
        await User.deleteMany({}, (err) => {
        });
    });
    afterAll(()=>{ mongoose.connection.close();});

    describe("App test", () => {
        it("Application is up", () => {
            expect(true).toBe(true);
        });
    });
});