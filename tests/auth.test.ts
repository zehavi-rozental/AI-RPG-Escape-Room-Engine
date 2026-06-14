import request from 'supertest';
import { app } from '../src/app';
import { User } from '../src/models/User';

// הגדרת משתנה סביבה כדי למנוע שגיאת JWT
process.env.JWT_SECRET = 'test-secret';

// התיקון כאן: שימוש בנתיב המלא שתואם ל-import של ה-User
jest.mock('../src/models/User');

describe('Auth Endpoints', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should register a new game master successfully', async () => {
    (User.findOne as jest.Mock).mockResolvedValue(null);
    (User.create as jest.Mock).mockResolvedValue({
      _id: 'user-id',
      email: 'test@example.com',
      role: 'Game_Master',
      username: 'testmaster'
    });

    const res = await request(app)
      .post('/api/auth/register')
      .send({
        username: 'testmaster',
        email: 'test@example.com',
        password: 'password123',
        role: 'Game_Master',
      });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('er_token');
    expect(res.body.er_role).toEqual('Game_Master');
  });
});