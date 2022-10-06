function postArchivoController(req, res) {
    const file = req.file
    if (!file) {
        res.status(400).json({
            mensaje: 'falta el archivo'
        })
    } else {
        res.status(202).json({msg: "File saved successfully",
                            path: `Images/${file.filename}`})
    }
}

export default postArchivoController