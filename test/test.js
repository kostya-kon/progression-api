// import autocannon from 'autocannon';
const autocannon = require('autocannon');
async function test() {
  autocannon(
    {
      title: 'autocannon test',
      url: 'http://localhost:3000',
      connections: 500,
      duration: 5,
      pipelining: 1,
      workers: 2,
      requests: [
        {
          method: 'POST',
          path: '/input',
          body: JSON.stringify({
            number: 10,
            type: 4,
            data: {
              start: 5,
              start2: 10,
            },
          }),
        },
        {
          method: 'GET',
          path: '/inprogress',
        },
      ],
    },
    console.log,
  );
}

test();
