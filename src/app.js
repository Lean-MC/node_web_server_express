const { envs } = require('./config/env')
const { startServer } = require('./server/server')

//console.log("empezando server")

const main = () => {
    startServer({
    port:envs.PORT,
    public_path:envs.PUBLIC_PATH
})
}

// funcion agnostica autoconvocada asyncronica
//agnostica porque no tiene nombre
//autoconvocada porque la ejecutamos con los parentesis

(async () =>{
    main()
}) () 