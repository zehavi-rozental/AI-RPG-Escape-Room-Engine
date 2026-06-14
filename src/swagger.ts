import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: { title: 'Escape Room API', version: '1.0.0' },
  },
  // כאן אנחנו מגדירים את התיעוד ישירות (או מפנים אותו ל-Routes אם נרצה)
  // אבל הדרך הכי נקייה היא להגדיר כאן את ה-Paths בצורה מרוכזת
  apis: ['./src/routes/*.ts'],
};

export const swaggerSpec = swaggerJsdoc(options);
