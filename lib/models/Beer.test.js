const Beer = require('./Beer');

describe('Beer model', () => {
    describe('brand', () => {
        it('should require brand', () => {
            const beer = new Beer({
                name: 'Fresh Squeezed IPA',
                brewType: 'IPA',
                abv: 6.4,
                volume: '12oz',
                agedYears: 1,
                bottle: true
            });
            const { errors } = beer.validateSync();
            expect(errors.brand.message).toEqual('Path `brand` is required.');
        });
    });

    describe('name', () => {
        it('should require name', () => {
            const beer = new Beer({
                brand: 'Deschutes',
                brewType: 'IPA',
                abv: 6.4,
                volume: '12oz',
                agedYears: 1,
                bottle: true
            });
            const { errors } = beer.validateSync();
            expect(errors.name.message).toEqual('Path `name` is required.');
        });
    });

    describe('brewType', () => {
        it('should require brewType', () => {
            const beer = new Beer({
                brand: 'Deschutes',
                name: 'Fresh Squeezed IPA',
                abv: 6.4,
                volume: '12oz',
                agedYears: 1,
                bottle: true
            });
            const { errors } = beer.validateSync();
            expect(errors.brewType.message).toEqual('Path `brewType` is required.');
        });
    });

    describe('abv', () => {
        it('should require abv', () => {
            const beer = new Beer({
                brand: 'Deschutes',
                name: 'Fresh Squeezed IPA',
                brewType: 'IPA',
                volume: '12oz',
                agedYears: 1,
                bottle: true
            });
            const { errors } = beer.validateSync();
            expect(errors.abv.message).toEqual('Path `abv` is required.');
        });

        it('is over 0', () => {
            const beer = new Beer({
                brand: 'Deschutes',
                name: 'Fresh Squeezed IPA',
                brewType: 'IPA',
                abv: 0,
                volume: '12oz',
                agedYears: 1,
                bottle: true
            });
            const { errors } = beer.validateSync();
            expect(errors.abv.message).toEqual('Path `abv` (0) is less than minimum allowed value (0.1).');
        });

        it('is under 67.6', () => {
            const beer = new Beer({
                brand: 'Deschutes',
                name: 'Fresh Squeezed IPA',
                brewType: 'IPA',
                abv: 67.6,
                volume: '12oz',
                agedYears: 1,
                bottle: true
            });
            const { errors } = beer.validateSync();
            expect(errors.abv.message).toEqual('Path `abv` (67.6) is more than maximum allowed value (67.5).');
        });
    });

    describe('volume', () => {
        it('should require beer', () => {
            const beer = new Beer({
                brand: 'Deschutes',
                name: 'Fresh Squeezed IPA',
                brewType: 'IPA',
                abv: 6.4,
                agedYears: 1,
                bottle: true
            });
            const { errors } = beer.validateSync();
            expect(errors.volume.message).toEqual('Path `volume` is required.');
        });
    });

    describe('agedYears', () => {
        it('should require agedYears', () => {
            const beer = new Beer({
                brand: 'Deschutes',
                name: 'Fresh Squeezed IPA',
                brewType: 'IPA',
                abv: 6.4,
                volume: '12oz',
                bottle: true
            });
            const { errors } = beer.validateSync();
            expect(errors.agedYears.message).toEqual('Path `agedYears` is required.');
        });

        it('is over -1', () => {
            const beer = new Beer({
                brand: 'Deschutes',
                name: 'Fresh Squeezed IPA',
                brewType: 'IPA',
                abv: 6.4,
                volume: '12oz',
                agedYears: -1,
                bottle: true
            });
            const { errors } = beer.validateSync();
            expect(errors.agedYears.message).toEqual('Path `agedYears` (-1) is less than minimum allowed value (0).')
        });

        it('is under 201', () => {
            const beer = new Beer({
                brand: 'Deschutes',
                name: 'Fresh Squeezed IPA',
                brewType: 'IPA',
                abv: 6.4,
                volume: '12oz',
                agedYears: 201,
                bottle: true
            });
            const { errors } = beer.validateSync();
            expect(errors.agedYears.message).toEqual('Path `agedYears` (201) is more than maximum allowed value (200).');
        });
    });

    describe('bottle', () => {
        it('should require bottle', () => {
            const beer = new Beer({
                brand: 'Deschutes',
                name: 'Fresh Squeezed IPA',
                brewType: 'IPA',
                abv: 6.4,
                volume: '12oz',
                agedYears: 1,
            });
            const { errors } = beer.validateSync();
            expect(errors.bottle.message).toEqual('Path `bottle` is required.');
        });
    });
});
