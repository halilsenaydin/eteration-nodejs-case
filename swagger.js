import swaggerJSDoc from 'swagger-jsdoc';

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Eteration Node.js Case',
            description: 'Eteration Case API Documentation',
            version: '1.0.0',
        },
    },
    apis: ['./view/routes/*.js'], // Belgelemek istediğiniz rotaları buraya ekleyin
};

const swaggerSpec = swaggerJSDoc(options);
export default swaggerSpec;