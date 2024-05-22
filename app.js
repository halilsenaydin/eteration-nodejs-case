import express from 'express';
import cors from 'cors'
import { createServer } from 'http';

import swaggerUI from 'swagger-ui-express';
import swaggerSpec from './swagger.js';

const app = express();
const httpServer = createServer(app);

const port = process.env.PORT || 8085;

app.use(cors({
    origin: [
        // "http://localhost:4200"
    ],
    credentials: true
}));

// Serve Swagger documentation
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));

import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import path from 'path';

import FileLogger from './controller/logging/FileLogger.js';
import Result from './core/entities/Result.js';

// Imports of routes
import RouteConstant from './controller/constants/apiConstants/RouteConstant.js';
import homeRoute from './view/routes/HomeRoute.js';
import movieRoute from './view/routes/MovieRoute.js';
import genreRoute from './view/routes/GenreRoute.js';

// ORM | Mongoose
import Database from './utilities/database.js';
Database.runMongoose();

const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, 'public')));

// Parsers
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes Middlewares
app.use(homeRoute);

// Banned User
// app.use(Authorization.bannedUser);

app.use(RouteConstant.MOVIE_ROUTE_ENDPOINT, movieRoute);
app.use(RouteConstant.GENRE_ROUTE_ENDPOINT, genreRoute);

// Error handler
app.use((err, req, res, next) => {
    // Log
    if (err.log) {
        FileLogger.errorLog(err.log);
    }

    return res.json(err.result);
})

httpServer.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
    console.log(`Swagger UI is available on http://localhost:${port}/api-docs`);
});