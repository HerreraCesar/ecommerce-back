import { requestLogger } from "../controllers/loggers.js";

export const login = (req, res, next) => {
    let isAdmin = req.user.admin
    if (isAdmin) {
        return next()
    } else {
        requestLogger.info(`ruta ${req.baseUrl} metodo ${req.method} no autorizada`)
        res.send({
            error: -1,
            description: `ruta ${req.baseUrl} metodo ${req.method} no autorizada`
        })
    }
}