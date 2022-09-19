import path from 'path';

const config = {
    entry: [
        './views/pages/d.ejs',
        './views/pages/home.ejs',
    ],
    output: {
        filename: 'my-first-webpack.bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.ejs$/,
                use: [{
                    loader: "ejs-webpack-loader",
                    options: {
                        data: { title: "New Title", someVar: "hello world" },
                        htmlmin: true
                    }
                },
                {
                    loader: 'extract-loader'
                },
                ]
            }
        ]
    }
};