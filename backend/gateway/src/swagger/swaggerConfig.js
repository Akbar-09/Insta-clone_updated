const swaggerJsdoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Instagram Clone API',
            version: '1.0.0',
            description: 'Comprehensive API documentation for the Instagram Clone microservices architecture. All endpoints are proxied through this API Gateway.',
            contact: {
                name: 'API Support',
                email: 'support@jaadoe.com'
            }
        },
        servers: [
            {
                url: 'http://192.168.1.5:5000/api/v1',
                description: 'Local Development Gateway'
            },
            {
                url: 'http://192.168.1.5:8000/api/v1',
                description: 'Production Gateway'
            }
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                    description: 'Enter your JWT token in the format: Bearer <token>'
                }
            }
        },
        security: [
            {
                bearerAuth: []
            }
        ]
    },
    // Paths to files containing OpenAPI definitions
    apis: ['./src/swagger/*.js', './index.js'],
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
