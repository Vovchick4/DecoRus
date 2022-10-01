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
    app.use('/local/images/', express.static(path.join(dirname, "views/images")))
    app.use('/styles/css', express.static(path.join(dirname, "views/styles")))
    app.use('/scripts/js', express.static(path.join(dirname, "views/scripts")))
}

export default filesRoutes