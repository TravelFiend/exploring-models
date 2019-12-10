const app = require('./lib/app');
require('dotenv').config();
require('./lib/utils/connect')();

app.listen(6789, () => {
    console.log('listening on port 6789');
});
