# MyCargonaut

[![Documentation Status](https://readthedocs.org/projects/mycargonaut/badge/?version=latest)](https://mycargonaut.readthedocs.io/en/latest/?badge=latest)
[![CI/CD](https://github.com/KMS-WS20-T01/MyCargonaut/workflows/CI/CD/badge.svg)](https://github.com/KMS-WS20-T01/MyCargonaut/actions?query=workflow%3ACI%2FCD)
[![Codacy Badge](https://app.codacy.com/project/badge/Grade/160ba71e8bf2434cb7f11130290d2695)](https://www.codacy.com/gh/KMS-WS20-T01/MyCargonaut/dashboard?utm_source=github.com&utm_medium=referral&utm_content=KMS-WS20-T01/MyCargonaut&utm_campaign=Badge_Grade)
[![Codacy Badge](https://app.codacy.com/project/badge/Coverage/160ba71e8bf2434cb7f11130290d2695)](https://www.codacy.com/gh/KMS-WS20-T01/MyCargonaut/dashboard?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=KMS-WS20-T01/MyCargonaut&amp;utm_campaign=Badge_Coverage)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat)](https://github.com/prettier/prettier)

MyCargonaut ist ein Projekt im Rahmen des KmS-Praktikums im WS20/21.

## Technologien

-   [ReactJS](https://reactjs.org/)
-   [Redux](https://redux.js.org/)
-   [Material-UI](https://material-ui.com/)
-   [NestJS](https://nestjs.com/)
-   [GraphQL](https://graphql.org/)

## Development

### Frontend

-   _In den `frontend`-Ordner wechseln:_ `cd frontend`
-   _Benötigte Module installieren:_ `npm i`
-   _Development-Server starten: `npm run start`

### Backend

-   _In den `backend`-Ordner wechseln:_ `cd backend`
-   _Datenbank starten_: `npm run db:start`
-   _Benötigte Module installieren:_ `npm i`
-   _Development-Server starten_: `npm run start:dev`

## Dokumentation

Für die Dokumentation wird [mkdocs-material](https://squidfunk.github.io/mkdocs-material/getting-started/) verwendet.

### Lokal starten

=== "Linux"

    -   _requirements installieren:_ `sudo pip3 install -r docs/requirements.txt`
    -   _mkdocs-material starten:_ `mkdocs serve`

=== "Windows"

    -   _requirements installieren:_ `pip install -r docs/requirements.txt`
    -   _mkdocs-material starten:_ `mkdocs serve`


> sollte der Port 8000 belegt sein, so kann das Pragramm auf einem anderen gestartet werden:
> `mkdocs serve --dev-addr 127.0.0.1:port`
