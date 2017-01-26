module.exports = {
  apps: [
    {
      name: "API",
      script: "api/index.js",
      env: {
        DEBUG: "swimmy*"
      },
      env_production: {
        NODE_ENV: "production"
      }
    },
    {
      name: "WEB",
      script: "web/index.js",
      env: {
        DEBUG: "swimmy*"
      },
      env_production: {
        NODE_ENV: "production"
      }
    }
  ]
}
