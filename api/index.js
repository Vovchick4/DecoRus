import { homeRouter } from "./routes/index.js";

const API = (app) => {
    app.use("/", homeRouter);
};

export default API