# Node API Template

Template of a Node API project

### Available API
Endpoints:
* Health check at `http://localhost:3000/api/health`
* Register new user at `http://localhost:3000/api/auth/register`
* Login user at `http://localhost:3000/api/auth/local`

### How to setup project
**Step 1**: Clone or download source from git repository, then install node modules by:

```
$ npm install
```

**Step 2**: Create a config file `.env` in env directory with content below:
```properties
JWT_KEY=this-is-a-sample-secret
DB_STORE=/var/nodeapi-template-db
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

Required: Installed PM2

To run application using PM2 process manager (staging):
```
$ pm2 start ecosystem.config.js --env staging
```

To run application using PM2 process manager (production):
```
$ pm2 start ecosystem.config.js --env production
```
