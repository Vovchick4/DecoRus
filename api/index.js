import { pagesRouter, collectionRouter, imageRouter, } from "./routes/index.js";

const API = (app) => {
    app.use("/", pagesRouter);
    app.use("/api/collections", collectionRouter);
    app.use("/api/image", imageRouter);
};

export default API