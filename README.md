# progression-api
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

## Running Docker

```bash
# for local development
$ docker-compose up -d

# build image of app
$ docker build -t <name> .
```


# Api Docs
## /input (POST)
### For creating job wich will calculate progression
- number - index (number) of number series numbers
- type - Progression key(number)
- data : 
  - start - start number of progression
  - common - common ratio (step) of progression
  - start2 - second number for fibonacci

## /inprogress (GET)
### Get all in progress job

## /output?tiket= (GET)
### Get results of job
- tiket - id of tiket you got in /input
