# Node API Template

Template of a Node API project

### Available API
Endpoints:
* Health check: `http://localhost:3000/api/health`

### How to setup project
Clone or download source from git repository, then install node modules by:

```
$ npm install
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
