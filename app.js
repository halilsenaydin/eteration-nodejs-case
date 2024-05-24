import express from 'express';
import cors from 'cors'
import { createServer } from 'http';
import { asClass, asValue, createContainer } from 'awilix'

// Swagger
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

import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import path from 'path';

import FileLogger from './controller/logging/FileLogger.js';

// Imports of routes
import RouteConstant from './controller/constants/apiConstants/RouteConstant.js';
import homeRoute from './view/routes/HomeRoute.js';
import movieRoutes from './view/routes/MovieRoute.js';
import genreRoutes from './view/routes/GenreRoute.js';

// ORM | Mongoose
import Database from './utilities/Database.js';
Database.runMongoose();

// IOC Container
import Container from './utilities/Container.js';
const genreController = Container.genreController;
const movieController = Container.movieController;

const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, 'public')));

// Parsers
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes Middlewares
app.use(homeRoute);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));

app.use(RouteConstant.V1_MOVIE_ROUTE_ENDPOINT, movieRoutes({ movieController, genreController }));
app.use(RouteConstant.V1_GENRE_ROUTE_ENDPOINT, genreRoutes({ genreController }));

// Catch not found request
app.use((req, res, next) => {
    let result = {}
    return res.status(404).json(result);
})

// Error handler
app.use((err, req, res, next) => {
    // Log
    if (err.log) {
        FileLogger.errorLog(err.log);
    }

    return res.status(500).json(err.result);
})

httpServer.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
    console.log(`Swagger UI is available on http://localhost:${port}/api-docs`);
});

export default app;