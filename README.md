# Voltron Big Data Platform

[![Testing frontend](https://github.com/EpitechMscPro2020/voltron-big-data/actions/workflows/testing_frontend.yml/badge.svg)](https://github.com/EpitechMscPro2020/voltron-big-data/actions/workflows/testing_frontend.yml)

[![Testing backend](https://github.com/EpitechMscPro2020/voltron-big-data/actions/workflows/testing_backend.yml/badge.svg)](https://github.com/EpitechMscPro2020/voltron-big-data/actions/workflows/testing_backend.yml)

## Launch application

1. Install dependencies

```bash
$ docker-compose run --rm api yarn install
```
```bash
$ docker-compose run --rm front yarn install
```

2. Start the application

```bash
$ docker-compose up
```

3. Start tests

```bash
$ docker-compose run --rm api yarn test
```

```bash
$ docker-compose run --rm front yarn test
```

```bash
$ docker compose up
```

- React on : [localhost:3000](http://localhost:3000)

- API on : [localhost:5000](http://localhost:5000)
