import { pagesRouter, collectionRouter, imageRouter, authRouter } from "./routes/index.js";

const API = (app) => {
    app.use("/", pagesRouter);
    app.use("/api/collections", collectionRouter);
    app.use("/api/image", imageRouter);
    app.use("/api/auth", authRouter);
};

export default API