import { homeRouter, contactRouter, imageRouter } from "./routes/index.js";

const API = (app) => {
    app.use("/", homeRouter);
    app.use("/", contactRouter);
    app.use("/api/image", imageRouter);
};

export default API