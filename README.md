# BoilerPlate Backend - Nestjs

This project is a starter template for building robust backend applications using the NestJS framework with TypeScript.

## Description

This boilerplate provides a strong foundation for backend applications, enabling developers to quickly set up and start building features without worrying about the initial configuration and setup.
It includes common modules and features that are often needed in backend projects, such as authentication, user management, database integration, and API documentation.

## System requirement

- Node `LTS 20.3.1`

## Set env

Rename `.evn.example` to `.env` and update environment variables

## Installation

```bash
$ npm install
```

## Database Setup

### Using Docker

- Create a docker image for PostgreSQL

```bash
docker run --name boilerplate -p 7000:5432 -e POSTGRES_PASSWORD=postgres -d postgres
```

- Create the boilerplate database

```bash
CREATE DATABASE boilerplate;
```

- Run the database migrations

```bash
$ npm run migration:run
```

### Without Docker

- Install PostgreSQL and pgAdmin on your machine. You can download them from the official websites: PostgreSQL and pgAdmin.

- Start PostgreSQL and pgAdmin.

- Create a Server Group and register server

- Create a database named boilerplate using pgAdmin.

- Update the database configuration in .env file with your local PostgreSQL settings.

- Run the database migrations with below command

```bash
$ npm run migration:run
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# watch + debug mode
$ npm run start:debug

# production mode
$ npm run start:prod
```

## Build the app

```bash
$ npm run build
```

## Swagger

It will be opened on [http://localhost:7002/swagger](http://localhost:7002/swagger).
It can be accessed on DEV mode only.

## Cloning BoilerPlate and Pushing to a New Repository

Clone Boiler-Plate Repo and Perform Below Steps :

```bash
# Create a new branch in the old repo
$ git checkout --orphan new-branch

# Add all files to the new branch
$ git add .
$ git commit -m "Initial commit in new repository"

# Verify the commit
$ git log
```

Push to the New Remote Repository

```bash
# Add the new remote URL
$ git remote add new-origin new-repo-url

# Push the new branch to the new remote
$ git push new-origin new-branch

# Set the new remote as the default
$ git remote remove origin

#  Note : After Pushing new branch to new repo Delete the existing cloned boiler-plate repo
```

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
