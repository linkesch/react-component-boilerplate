module.exports = {
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    cacheDirectory: true,
                    presets: ['react', 'es2015', 'stage-2']
                }
            }
        ]
    },
    output: {
        libraryTarget: 'umd',
        library: 'PackageName',
        filename: 'package.js'
    },
    externals: [
        {
            react: {
                root: 'React',
                commonjs2: 'react',
                commonjs: 'react',
                amd: 'react'
            }
        }
    ],
    resolve: {
        extensions: ['', '.js', '.json']
    }
};
