import request from 'supertest';
import mongoose from 'mongoose';
import app from '../src/app';

describe('Auth Endpoints', () => {
  // התנתקות מהדאטהבייס בסיום הבדיקות כדי שלא יתקע את התהליך
  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('should register a new game master successfully', async () => {
    // מייצרים ערכים ייחודיים כדי שהבדיקה לא תיכשל בריצות חוזרות על משתמש קיים
    const uniqueSuffix = Date.now();
    const uniqueUsername = `testmaster_${uniqueSuffix}`;
    const uniqueEmail = `testmaster_${uniqueSuffix}@test.com`;

    const res = await request(app)
      .post('/api/auth/register')
      .send({
        username: uniqueUsername,
        email: uniqueEmail,
        password: 'password123',
        role: 'Game_Master'
      });

    // בדיקת הציפיות (Assertions)
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('er_token');
    expect(res.body.er_role).toEqual('Game_Master');
  });

  it('should fail registration if email is missing', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        username: 'baduser',
        password: 'password123',
        role: 'Player'
      });

    // ולידציית ה-Zod או ה-Mongoose אמורה להכשיל את זה בסטטוס 400
    expect(res.statusCode).toEqual(400);
  });
});