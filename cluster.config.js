module.exports = {
    apps: [
        {
            name: 'nodeapi-template',
            script: 'npm',
            args: 'start',
            exec_mode: "cluster", // Must be "" character to avoid systax error

            instances: 'max', // Specific a number or 'max' to indacate using maximum of CPUs
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