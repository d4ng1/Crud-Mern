// Importamos el modulo de Express
const express = require('express');
// Llamamos el modulo de express
const app = express();


const { mongoose } = require('./database')


// Importamos el modulo de morgan
const morgan = require('morgan');

const path = require('path');

// Importamos el modulo

// Vamos a tener el sgte flujo

        //-------Settings

// Lo configuramos para que tome un puerto del sistema o por defecto el 3000
app.set('port',process.env.PORT || 3000)

        //-------Middleware (Funciones que se ejecutan antes de llegar a las rutas)

// Hacemos uso de la libreria de morgan y le ponemos el modo dev para enteder las peticiones
app.use(morgan('dev'));
// Para convertir los datos que vienen en algo legible
app.use(express.json());
        
        // -------Routes 

app.use('/api/task',require('./routes/task.routes'))

        

        //-------Static Files (Donde se guardan los archivos hechos con react)

app.use(express.static(path.join(__dirname,'public')));

// Creamos un servidor en el puerto x que corresponde al primer parametro,  el segundo es lo que va decir cuando se inicie

app.listen(app.get('port'), () =>{
        console.log(`Server on port ${app.get('port')}`);
});

