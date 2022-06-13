const res = require('express/lib/response');
const { Pool } = require('pg');
const argv = process.argv.slice(2);
const argvArray = [`%${argv[0]}%`, argv[1]];

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'bootcampx'
});

pool.query(`
SELECT students.id AS id, students.name AS name, cohorts.name AS cohorts_name
FROM students
JOIN cohorts ON cohorts.id = cohort_id
WHERE cohorts.name LIKE $1
LIMIT $2;
`, argvArray)
  .then(data => {
    console.log(argv);
    data.rows.forEach(user => {
      console.log(`${user.name} has an id of ${user.id} and was in the ${user.cohorts_name} cohort`);
    });
  })
  .catch(err => console.error('query error', err.stack
  ));