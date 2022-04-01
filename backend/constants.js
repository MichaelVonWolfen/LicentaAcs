module.exports = {
    mongoURL:"mongodb://127.0.0.1:27017/split-personality-blog",
    jwtSecret:"changeThisToSomethingMoreSecure",
    port:5000,
    max_top_categories_total:3,
    namespaces:{
        user:"user",
        anonymous:"anonymous",
    }
}