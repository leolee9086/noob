function auth(req, res, next) {
    console.error(req.method)
    switch (req.method) {
        case "GET":
            if (req.sission) {
                console.log(req.session)
            }
        break
    }

    next()
}
module.exports = auth