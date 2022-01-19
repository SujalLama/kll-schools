module.exports = {
    resolve: {
        fallback: { 
            "querystring": require.resolve("querystring-es3"),
            "process": require.resolve("process/browser"),
            "buffer": require.resolve("buffer/") 
        }
    }
}