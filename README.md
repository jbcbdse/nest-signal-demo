## Description

This is a basic application bootstrapped with `nest new`.

Additionally, this demonstrates:

* that Nest will handle SIGTERM for HTTP handlers
* custom logic to handle SIGTERM for a poller outside of the HTTP listeners

### To demonstrate HTTP

* Run `yarn start`
* Note the `<pid>` of the process that starts. This is the number at the start of log messages
* Make a request to `GET localhost:3000`. It should finish quickly.
* Make a request to `"GET localhost:3000/long"`
* It should take 60 seconds to complete
* During that time, run `kill -s TERM <pid>`
* After that, a request to `GET localhost:3000` should fail
* After the 60 seconds is complete, the "long" request should complete with a 200 status code
* Then, the application should exit

### To demontrate the poller

* Run `yarn start`
* Note the `<pid>` of the process that starts, like above
* Note log messages that show that the poller is running. It waits 10 seconds between polls.
* During that time, run `kill -s TERM <pid>`
* The messages should indicate that the poll completes and the poller stops before the application exits

## Installation

```bash
$ yarn install
```

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
