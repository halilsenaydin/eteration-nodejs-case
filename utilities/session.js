import session from 'express-session';

import pg from 'pg';
import PgSession from 'connect-pg-simple';

export default class Session {
    constructor() { }

    static pgSession = PgSession(session);
    static pgPool = new pg.Pool({
        host: 'localhost',
        database: 'db_name',
        user: 'postgres',
        password: 'password',
    });

    static sessionStore = {
        store: new Session.pgSession({
            pool: Session.pgPool,
            tableName: 'UserSessions'
        }),
        secret: 'benzersiz_kimlik',
        resave: false,
        saveUninitialized: true,
        cookie: {
            maxAge: 30 * 24 * 60 * 60 * 1000
        }
    }
}