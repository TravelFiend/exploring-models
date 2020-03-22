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

    it('gets all beers on GET', async() => {
        const beers = await Beer.create([
            {
                'brand': 'miller',
                'name': 'lite',
                'brewType': 'lager',
                'abv': 4.6,
                'volume': '12 oz',
                'agedYears': 0.5,
                'bottle': false
            },
            {
                'brand': 'coors',
                'name': 'banquet',
                'brewType': 'lager',
                'abv': 4.7,
                'volume': '16 oz',
                'agedYears': 0.5,
                'bottle': false
            },
            {
                'brand': 'deschutes',
                'name': 'fresh squeezed',
                'brewType': 'ipa',
                'abv': 6.4,
                'volume': '12 oz',
                'agedYears': 1,
                'bottle': true
            }
        ]);

        return request(app)
            .get('/beer')
            .then(res => {
                beers.forEach(beer => {
                    expect(res.body).toContainEqual({
                        _id: beer._id.toString(),
                        brand: beer.brand,
                        name: beer.name,
                        brewType: beer.brewType,
                        abv: beer.abv,
                        volume: beer.volume,
                        agedYears: beer.agedYears,
                        bottle: beer.bottle,
                        __v: 0
                    });
                });
            });
    });

    it('gets a beer by id on GET', async() => {
        const beer = await Beer.create({
            brand: 'deschutes',
            name: 'fresh squeezed',
            brewType: 'ipa',
            abv: 6.4,
            volume: '12 oz',
            agedYears: 1,
            bottle: true
        });

        return request(app)
            .get(`/beer/${beer._id}`)
            .then(res => {
                expect(res.body).toEqual({
                    _id: beer._id.toString(),
                    brand: beer.brand,
                    name: beer.name,
                    brewType: beer.brewType,
                    abv: beer.abv,
                    volume: beer.volume,
                    agedYears: beer.agedYears,
                    bottle: beer.bottle,
                    __v: beer.__v
                });
            });
    });

    it('updates a beer with PUT', async() => {
        const beer = await Beer.create({
            brand: 'deschutes',
            name: 'fresh squeezed',
            brewType: 'ipa',
            abv: 6.4,
            volume: '12 oz',
            agedYears: 1,
            bottle: true
        });

        return request(app)
            .put(`/beer/${beer._id}`)
            .send({
                _id: beer._id,
                brand: 'miller',
                name: 'lite',
                brewType: 'lager',
                abv: 4.6,
                volume: '12 oz',
                agedYears: 0.5,
                bottle: false,
                __v: beer.__v
            })
            .then(res => {
                expect(res.body).toEqual({
                    _id: beer._id.toString(),
                    brand: 'miller',
                    name: 'lite',
                    brewType: 'lager',
                    abv: 4.6,
                    volume: '12 oz',
                    agedYears: 0.5,
                    bottle: false,
                    __v: beer.__v
                });
            });
    });

    it('can delete a beer with DELETE', async() => {
        const beer = await Beer.create({
            brand: 'miller',
            name: 'lite',
            brewType: 'lager',
            abv: 4.6,
            volume: '12 oz',
            agedYears: 0.5,
            bottle: false,
        });

        return request(app)
            .delete(`/beer/${beer._id}`)
            .then(res => {
                expect(res.body).toEqual({
                    _id: beer._id.toString(),
                    brand: beer.brand,
                    name: beer.name,
                    brewType: beer.brewType,
                    abv: beer.abv,
                    volume: beer.volume,
                    agedYears: beer.agedYears,
                    bottle: beer.bottle,
                    __v: beer.__v
                });
            });
    });
});
