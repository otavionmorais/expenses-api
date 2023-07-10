## Description

REST API to manage users expenses.

## Technologies

- Node.js (v18)
- NestJS (v10)
- PostgreSQL (v15)

## Documentation

The API documentation (Swagger) is available at `/docs` route.

## Running the project

### - **Without docker**

First, you need to create a `.env` file in the root of the project, based on the `.env.example` file.
Insert the environment variables values in the `.env` file.

Then, you need to install the dependencies:

```sh
npm install
```

Run the migrations:

```sh
npm run migrations:execute
```

And finally, you can run the project:

```sh
npm run start:dev
```

That's it! The project will be running on `localhost:${PORT}`.  
<br>

### - **With docker**

Build the image:

```sh
docker build -t expenses-api .
```

Run the container (**This command will also run the migrations**):

```sh
docker run -d \
	-e TZ='UTC' \
	-e PORT='3000' \
	-e NODE_ENV='development' \
	-e DATABASE_URL='postgres://username:password@host.docker.internal:5432/databasename' \
	-e JWT_SECRET='my-secret' \
	-e AWS_REGION='us-east-1' \
    -e AWS_ACCESS_KEY_ID='your_access_key_id' \
    -e AWS_SECRET_ACCESS_KEY='your_secret_access_key' \
 -p 3000:3000 expenses-api
```

## Utils

#### - Running the migrations

```sh
npm run migrations:execute
```

#### - Reverting the migrations

```sh
npm run migrations:revert
```

#### - Creating a new migration

```sh
npm run typeorm migration:create src/database/migrations/NameOfTheMigration
```

#### - Running the tests

```sh
npm run test
```

#### - Running lint

```sh
npm run lint
```
