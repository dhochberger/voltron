//During the test the env variable is set to test
require('dotenv').config();
const moment = require('moment');

process.env.NODE_ENV="test"
process.env.DB_NAME="TEST_Voltron"
process.env.API_URL="/sensors"

//Require the dev-dependencies
const request = require('supertest')
const mongoose = require('../database');

const { Humidity, Luminosity, Temperature } = require('../models/sensor');
let server = require('../app');


describe('Sensors', () => {

    beforeEach(async () => {
        await Humidity.deleteMany({}, (err) => {
        });
        await Luminosity.deleteMany({}, (err) => {
        });
        await Temperature.deleteMany({}, (err) => {
        });
    });
    afterAll(()=>{ mongoose.connection.close();});

/*
    * Test the /GET/me route
    */
    describe('/GET all sensors', () => {
        it('it should NOT GET sensors if no value found', async () => {
            const res = await request(server)
            .get(`${process.env.API_URL}/all`)
            
            expect(res.statusCode).toEqual(404)
            expect(res.body).toHaveProperty('status')

        });
        it('it should GET sensors if value found', async () => {
            let humidity = new Humidity({value: 55})
            await humidity.save()
            const res = await request(server)
            .get(`${process.env.API_URL}/all`)
            
            expect(res.statusCode).toEqual(200)
            expect(res.body).toHaveProperty('status')
            expect(res.body.data).toHaveProperty('humidity')
        });
        it('it should GET sensors by date', async () => {
            let humidity = new Humidity({value: 55})
            await humidity.save()
            let luminosity = new Luminosity({value: 55})
            await luminosity.save()
            let temperature = new Temperature({valueC: 55, valueF: 32})
            await temperature.save()
            const res = await request(server)
            .get(`${process.env.API_URL}/all/date?start=${moment().subtract(1, 'days')}&end=${moment().add(1, 'days')}`)
            .set('Accept', 'application/json')

            expect(res.statusCode).toEqual(200)
            expect(res.body).toHaveProperty('status')
            expect(res.body.data).toHaveProperty('humidity')
            expect(res.body.data).toHaveProperty('luminosity')
            expect(res.body.data).toHaveProperty('temperature')
        });
    });

    describe('/GET humidity', () => {
        it('it should NOT GET humidity if no value found', async () => {
            const res = await request(server)
            .get(`${process.env.API_URL}/humidity`)
            
            expect(res.statusCode).toEqual(404)
            expect(res.body).toHaveProperty('status')

        });
        it('it should GET humidity if value found', async () => {
            let humidity = new Humidity({value: 55})
            await humidity.save()
            const res = await request(server)
            .get(`${process.env.API_URL}/humidity`)
            .set('Accept', 'application/json')
            
            expect(res.statusCode).toEqual(200)
            expect(res.body).toHaveProperty('status')
            expect(res.body.data[0]).toHaveProperty('value')
        });
        it('it should GET humidity by date', async () => {
            let humidity = new Humidity({value: 55})
            await humidity.save()
            const res = await request(server)
            .get(`${process.env.API_URL}/humidity/date?start=${moment().subtract(1, 'days')}&end=${moment().add(1, 'days')}`)
            .set('Accept', 'application/json')

            expect(res.statusCode).toEqual(200)
            expect(res.body).toHaveProperty('status')
            expect(res.body.data[0]).toHaveProperty('value')
        });
    });

    describe('/GET luminosity', () => {
        it('it should NOT GET humidity if no value found', async () => {
            const res = await request(server)
            .get(`${process.env.API_URL}/luminosity`)
            
            expect(res.statusCode).toEqual(404)
            expect(res.body).toHaveProperty('status')

        });
        it('it should GET luminosity if value found', async () => {
            let luminosity = new Luminosity({value: 55})
            await luminosity.save()
            const res = await request(server)
            .get(`${process.env.API_URL}/luminosity`)
            .set('Accept', 'application/json')
            
            expect(res.statusCode).toEqual(200)
            expect(res.body).toHaveProperty('status')
            expect(res.body.data[0]).toHaveProperty('value')
        });
        it('it should GET luminosity by date', async () => {
            let luminosity = new Luminosity({value: 55})
            await luminosity.save()
            const res = await request(server)
            .get(`${process.env.API_URL}/luminosity/date?start=${moment().subtract(1, 'days')}&end=${moment().add(1, 'days')}`)
            .set('Accept', 'application/json')

            expect(res.statusCode).toEqual(200)
            expect(res.body).toHaveProperty('status')
            expect(res.body.data[0]).toHaveProperty('value')
        });
    });

    describe('/GET temperature', () => {
        it('it should NOT GET temperature if no value found', async () => {
            const res = await request(server)
            .get(`${process.env.API_URL}/temperature`)
            
            expect(res.statusCode).toEqual(404)
            expect(res.body).toHaveProperty('status')

        });
        it('it should GET temperature if value found', async () => {
            let temperature = new Temperature({valueC: 55, valueF: 55})
            await temperature.save()
            const res = await request(server)
            .get(`${process.env.API_URL}/temperature`)
            .set('Accept', 'application/json')
            
            expect(res.statusCode).toEqual(200)
            expect(res.body).toHaveProperty('status')
            expect(res.body.data[0]).toHaveProperty('valueC')
            expect(res.body.data[0]).toHaveProperty('valueF')
        });
        it('it should GET temperature by date', async () => {
            let temperature = new Temperature({valueC: 55, valueF: 55})
            await temperature.save()
            const res = await request(server)
            .get(`${process.env.API_URL}/temperature/date?start=${moment().subtract(1, 'days')}&end=${moment().add(1, 'days')}`)
            .set('Accept', 'application/json')

            expect(res.statusCode).toEqual(200)
            expect(res.body).toHaveProperty('status')
            expect(res.body.data[0]).toHaveProperty('valueC')
            expect(res.body.data[0]).toHaveProperty('valueF')
        });
    });
});