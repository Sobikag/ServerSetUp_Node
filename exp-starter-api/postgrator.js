if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
}
if(process.env.NODE_ENV === 'test'){
    process.env.DATABASE_URL = process.env.TEST_DATABASE_URL;
}

const path = require('path');
const Postgrator = require('postgrator');

// postgrator.setConfig({
//     migrationDirectory : __dirname + '/migrations',
//     driver: 'pg',
//     connectionString: process.env.DATABASE_URL
// });
// postgrator.setConfig({
//     migrationDirectory : __dirname + '/migrations',
//     driver: 'pg',
//     host: '',
//     database:'exp_starter_app_test',
//     username:'postgres',
//     password: 'root'
// })

const postgrator1 = new Postgrator({
    migrationDirectory : path.join(__dirname + '/migrations'),
    driver: 'pg',
    connectionString: process.env.DATABASE_URL
});



postgrator1.migrate('max', function(err, migrations) {
    if (err) {
      console.log(err);
    } else  if (migrations) {
        console.log(
          ['***************************************']
            .concat(migrations.map(migration => `checking ${migration.filename}`))
            .join('\n')
        );
      }
    // }
    postgrator1.endConnection(() => {});
  });