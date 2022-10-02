import bodyParser from "body-parser";
import cookieParser from "cookie-parser"

export default (app, express, dirname) => {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(cookieParser());
}