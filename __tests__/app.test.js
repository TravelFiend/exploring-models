require('dotenv').config();
const connect = require('../lib/utils/connect');
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../lib/app');
const Beer = require('../lib/models/Beer');

describe('app routes', () => {
    beforeAll(() => {
        connect();
    });

    beforeEach(() => {
        return mongoose.connection.dropDatabase();
    });

    afterAll(() => {
        return mongoose.connection.close();
    });

    it('creates a beer item on POST', () => {
        return request(app)
            .post('/beer')
            .send({
                'brand': 'miller',
                'name': 'lite',
                'brewType': 'lager',
                'abv': 4.6,
                'volume': '12 oz',
                'agedYears': 0.5,
                'bottle': false
            })
            .then(res => {
                expect(res.body).toEqual({
                    _id: expect.any(String),
                    brand: 'miller',
                    name: 'lite',
                    brewType: 'lager',
                    abv: 4.6,
                    volume: '12 oz',
                    agedYears: 0.5,
                    bottle: false,
                    __v: 0
                });
            });
    });

    
});
