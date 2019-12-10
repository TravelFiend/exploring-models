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
});
