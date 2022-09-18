import path from "path"

const filesRoutes = (app, express, dirname) => {
    app.use(
        "/css",
        express.static(path.join(dirname, "node_modules/bootstrap/dist/css"))
    )
    app.use(
        "/js",
        express.static(path.join(dirname, "node_modules/bootstrap/dist/js"))
    )
    app.use("/js", express.static(path.join(dirname, "node_modules/jquery/dist")))
}

export default filesRoutes