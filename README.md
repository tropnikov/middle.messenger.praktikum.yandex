# Messenger App ⋅ [![Netlify Status](https://api.netlify.com/api/v1/badges/c0a5707b-c88b-4ff5-9a51-aa5d13fc6b08/deploy-status)](https://app.netlify.com/sites/jolly-belekoy-ea11b4/deploys) ![example branch parameter](https://github.com/tropnikov/middle.messenger.praktikum.yandex/actions/workflows/tests.yml/badge.svg)

Chat app written in Vanilla JavaScript using Block components, EventBus, Router, WebSocket and Handlebars to render templates.

#### This is a work in progress, README will be updated as soon as new features come.

### Current stage – sprint 3:

- Block class for components
- EventBus for events
- Forms validation
- HTTPTransport for requests
- Handlebars for templates
- WebSocket for real-time communication
- Store for state management
- Router for navigation

## Design

Figma design [is here](<https://www.figma.com/design/Amu9hsaKVf8f7hgu7H8e7V/Messenger-App-(Chat)?node-id=0-1&t=nog2LGmTc9GrXy2j-1>).

## Deploy

Deployed to Netlify: https://jolly-belekoy-ea11b4.netlify.app/

## Pages

You need to login to see the app.

- [Auth](https://jolly-belekoy-ea11b4.netlify.app/)
- [Register](https://jolly-belekoy-ea11b4.netlify.app/sign-up)
- [Profile](https://jolly-belekoy-ea11b4.netlify.app/settings)
- [Edit Profile](https://jolly-belekoy-ea11b4.netlify.app/edit-profile)
- [Change Password](https://jolly-belekoy-ea11b4.netlify.app/change-password)
- [Chats](https://jolly-belekoy-ea11b4.netlify.app/messenger)
- [404](https://jolly-belekoy-ea11b4.netlify.app/404)
- [500](https://jolly-belekoy-ea11b4.netlify.app/500)

## Run locally

- `npm install` — install dependencies,
- `npm run dev` — start project in dev mode on `3000` port and open browser,
- `npm run build` — build project,
- `npm run start` — build and preview.
