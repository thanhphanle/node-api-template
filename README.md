# Node API Template

Template of a Node API project

### Available API
Endpoints:
* Health check at `http://localhost:3000/api/health`
* Register new user at `http://localhost:3000/api/auth/register`
* Login user at `http://localhost:3000/api/auth/local`
* User entity at `http://localhost:3000/api/users`

### How to setup project
**Step 1**: Clone or download source from git repository, then install node modules by:

```
$ npm install
```

**Step 2**: Create a config file `.env` in env directory with content below:
```properties
JWT_KEY=this-is-a-sample-secret
DB_STORE=/var/node-api-template-db
```

### How to run application
To run in development environment:
```
$ npm start
```

To run in staging environment:
```
$ npm run start:stg
```

To run in production environment:
```
$ npm run start:prod
```

### How to deploy application with PM2

Require: Installed process manager PM2 following `npm install -g pm2`

To start application using PM2 in standalone mode (production):
```
$ pm2 start ecosystem.config.js --env production
```

To start application using PM2 in cluster mode (production):
```
$ pm2 start cluster.config.js --env production
```
