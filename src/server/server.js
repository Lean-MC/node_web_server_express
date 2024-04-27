const express = require('express')
const path = require('path')

const startServer = (options) => {
    const {port , public_path = 'public'} = options
  // console.log(port)
  // console.log(public_path)
  const app = express()
//para poder usar middlewares se usa la palabra use (express)
//los middlewares configuran nuestra aplicacion
  app.use(express.static(public_path)) //contenido estatico que ponemos disponible
//recibimos una peticion y devolvemos algo
//request es la peticion que nos hace el navegador
//response es lo que devolvemos

//esto es para devolver el indeex, es uno solo debido a 
//que es una spa,si fuera una web manejaria varias rutas

//primeros las rutas especificas
app.get('/error',(req,res) => {
  const notfound = path.join(__dirname + `../../../${public_path}/error.html`)
  res.sendFile(notfound)
})

//luego las rutas dinamicas
app.get('*',(req,res) => {
    const indexPath = path.join(__dirname + `../../../${public_path}/index.html`)
    res.sendFile(indexPath)
})

app.use(express.static(public_path))


//esto es para abrir un puerto y estar escuchando ahi
app.listen(port,() => {
    console.log(`Escuchando en el puerto ${port}`)
})

}

module.exports = {
    startServer
}