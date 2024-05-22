export default class CongifurationConstant {
    static TMDB_ROOT = "https://api.themoviedb.org/3"
    static TMDB_API_KEY = "1e0beec696bf3833215f580677ae30e2"
    static TMDB_API_TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxZTBiZWVjNjk2YmYzODMzMjE1ZjU4MDY3N2FlMzBlMiIsInN1YiI6IjY2NGNiMjc4NzM3MDMyNWYwMzE5OGRlYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.MkFb1ZMsuw03jlpcoyA12QXnSq8H5YGoPMTg4-DTk0w";
    static TMDB_GENRE_TV = "tv"
    static TMDB_GENRE_MOVIE = "movie"

    static MONGO_DB = "movies_db"
    static MONGO_DB_USER = "halilsenaydin"
    static MONGO_DB_USER_PASS = "lu9wtGso4PhO0Car"
    static MONGO_DB_CONNECTION_STRING = `mongodb+srv://${CongifurationConstant.MONGO_DB_USER}:${CongifurationConstant.MONGO_DB_USER_PASS}@moviels.iv7k29s.mongodb.net/${CongifurationConstant.MONGO_DB}?retryWrites=true&w=majority&appName=Moviels`
}