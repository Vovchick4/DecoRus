import { homeRouter, contactRouter } from "./routes/index.js";

const API = (app) => {
    app.use("/", homeRouter);
    app.use("/", contactRouter);
};

export default API