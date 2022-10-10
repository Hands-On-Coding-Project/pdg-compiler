export const swaggerJsDocOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Compiler API',
            version: '1.0.0',
            description: 'The Compiler API for the HandsOnCoding project, an open-source MOOC (Massive Open Online Courses) for multiple programming languages.'
        },
        servers: [
            {
                url:'http://localhost:12345/'
            }
        ]
    },
    apis: ['*.js'],
}

export const swaggerUIOptions = {
    customCss: '.swagger-ui .topbar { display: none }',
    swaggerOptions: {
        display:{
            syntaxHighligh:{
                activate: false,
                theme:"arta"
            }
        }
    },
}