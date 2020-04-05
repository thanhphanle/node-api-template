module.exports = {
    apps: [
        {
            name: 'nodeapi-template',
            script: 'npm start',
            exec_mode: 'cluster',

            instances: 3, // Use 'max' to achieve maximum of CPUs
            autorestart: true,
            watch: false,
            max_memory_restart: '1G',
            env: {
                NODE_ENV: 'development'
            },
            env_staging: {
                NODE_ENV: 'staging'
            },
            env_production: {
                NODE_ENV: 'production'
            }
        }
    ]
};
