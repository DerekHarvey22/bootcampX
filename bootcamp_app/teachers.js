const res = require('express/lib/response');
const { Pool } = require('pg');
const argv = process.argv[2];
const argvarray = process.argv.slice(2);
const value = [argv];

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'bootcampx'
});

pool.connect().then(() => {
  console.log("We have connected!");
}).catch(e => {
  console.log("ERROR :(");
  console.log(e.message);
});

pool.query(`
SELECT DISTINCT(teachers.name) AS name, cohorts.name AS cohort
FROM teachers
JOIN assistance_requests ON teachers.id = teacher_id
JOIN students ON students.id = student_id
JOIN cohorts ON cohorts.id = cohort_id
WHERE cohorts.name LIKE $1
ORDER BY teachers.name;
`, argvarray)
  .then(data => {
    console.log(typeof (argv));
    console.log(argvarray);
    console.log(value);
    data.rows.forEach(teacher => {
      console.log(`${teacher.cohort} : ${teacher.name} `);
    });
  })
  .catch(err => {
    console.error(err);
  });