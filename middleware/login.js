export const login = (req, res, next) => {
    let isAdmin = true
    if (isAdmin) {
        return next()
    } else {
        
        res.send({
            error: -1,
            description: `ruta ${req.baseUrl} metodo ${req.method} no autorizada`
        })
    }
}