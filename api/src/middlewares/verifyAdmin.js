const verifyAdmin = (req, res, next) => {
    if(req.user.role !== 'ADMIN'){
        return res.status(403).json({
            message: 'No tienes permisos para realizar esta acción'
        })
    }
    next();
}

module.exports = verifyAdmin;