# React Todo

A todo tracker for keeping track of tasks and lists.

Live demo [here](http://react-todo.matthewteolis.com:3000/).

## Setup

Before anything, you must clone/download the repository.

### Environment variables

1. Rename `.env.template` to `.env`.
2. Configure the environment variables in the `.env` file.

### Docker

1. Make sure you have [docker](https://docs.docker.com/install/#supported-platforms) installed.
2. Make sure you have [docker-compose](https://docs.docker.com/compose/install/#install-compose) installed.
3. From the root directory, run `docker-compose up`.
   - you can add the `-d` or `--detach` option to run containers in the background.

You should now be able to connect to the following:

- frontend server: [http://localhost:3000/](http://localhost:3000/)
- backend server: localhost:5000
- mysql server: localhost:3306
- adminer (database client): [http://localhost:8080/](http://localhost:8080/)
