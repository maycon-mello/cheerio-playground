let env = process.env.NODE_ENV || 'development';
let config = {
  development: {
    db: {
      uri: 'mongodb://localhost/cheerio-playground',
    },
    log: true,
  },
  test: {
    db: {
      uri: 'mongodb://localhost/cheerio-playground-test',
    },
    log: false,
  },
  production: {
    db: {
      uri: process.DB_URI,
    },
    log: false,
  },
};

const current = config[env];

console.log(`Current env: ${env}`);

if (!current) {
  console.log('ENV config not found.');
  process.exit(0);
}

export default current;
