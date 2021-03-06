# BoNUS (DeFentilz-Orbital)

Orbital Apollo, Summer 2021

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Development Setup

[Install](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) the latest `npm` and `node` versions on your local machine.
You should have the latest `npm` and `node` versions installed on your local machine before running.

Install all dependencies using yarn for this project (ensure that package-lock.json which comes from npm package manager is not in the file) :

```bash
npm install yarn
yarn install
```

## Environment Variables

to get the key to the AWS RDS, firebase, AWS S3, and other environment variables configuration for this project. Please contact either Amadeus or Simon

## Scripts

To build the app for production:

```bash
yarn run build
```

To run the app in development development

```bash
yarn run dev
```

To run the app in production mode

```bash
yarn run start
```

To run the server app using nodemon for live update and auto-refresh

```bash
yarn run dev:backend
```

To run the server app using ts-node

```bash
yarn run start:backend
```

note : use -p PORT_NUMBER to change the default port, default port is 3000

To test frontend prior to committing code

```bash
yarn cypress run
```

## Learn More

To learn more about the resources used, the following documentation might be helpful :

**Front End**

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [React Documentation](https://reactjs.org/docs)
- [Chakra UI](https://chakra-ui.com/)

**Backend**

- [Express.js](https://expressjs.com/)
- [AWS RDS MySQL](https://aws.amazon.com/rds/)
- [Heroku](https://heroku.com/)
- [Sequlieze ORM](https://sequelize.org/)
- [Firebase](https://firebase.google.com/docs/auth)

For backend documentation, please visit this [link](https://documenter.getpostman.com/view/7505668/TzeRqAGf)

**Note**
The service worker is currently slightly problematic with the yarn dev, because once the page is reloaded, the new sw would be registered and hence would result in multiple sw registration within 1 web. The current workaround is to go to the dev > application > unregister the sw manually.
