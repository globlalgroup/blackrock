module.exports = {
  apps: [
    // FRONTEND (Next.js)
    {
      name: 'frontend',
      script: 'node_modules/next/dist/bin/next',
      args: 'start',
      cwd: '/home/deploy/blackrock',
      instances: 2,
      exec_mode: 'cluster',
      node_args: '--max-old-space-size=1024',
      env_production: {
        NODE_ENV: 'production',
        PORT: 3000
      },
      error_file: '/home/deploy/blackrock/logs/frontend-err.log',
      out_file: '/home/deploy/blackrock/logs/frontend-out.log',
      log_date_format: 'YYYY-MM-DD HH:mm Z',
      merge_logs: true,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G'
    },
    // BACKEND (Express API)
    {
      name: 'backend',
      script: 'server.js',
      cwd: '/home/deploy/blackrock',
      instances: 1,
      exec_mode: 'fork',
      env_production: {
        NODE_ENV: 'production',
        PORT: 3002
      },
      error_file: '/home/deploy/blackrock/logs/backend-err.log',
      out_file: '/home/deploy/blackrock/logs/backend-out.log',
      log_date_format: 'YYYY-MM-DD HH:mm Z',
      merge_logs: true,
      autorestart: true,
      watch: false,
      max_memory_restart: '500M'
    }
  ]
};
