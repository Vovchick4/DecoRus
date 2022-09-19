import cookieParser from "cookie-parser"

export default (app, express, dirname) => {
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(cookieParser());
}