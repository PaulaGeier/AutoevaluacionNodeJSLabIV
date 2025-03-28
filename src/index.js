//1.Solicitar Datos al Usuario 
import readline from 'readline';
import fs from 'fs';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';


    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    function preguntar(pregunta){
        return new Promise((resultado)=>{
            rl.question(pregunta,resultado)
        });
    }

    const main=async()=>{
        const nombreProducto=await preguntar('Nombre del producto: ');
        const precioProducto=await preguntar('Precio del producto: ');
        const cantidadProducto=await preguntar('Cantidad del producto: ');

        rl.close();

        return{
            nombre:nombreProducto,
            precio:Number(precioProducto),
            cantidad:Number(cantidadProducto)
        }
    }

    
const contenidoJSON = async () => {
    const producto = await main();
    const json = JSON.stringify(producto,null,4);
    return json;
};


//2.Guardar los Datos en un Archivo JSON


const argv = yargs(hideBin(process.argv))
.option('file', {  
    alias: 'f',  
    describe: 'Nombre del archivo JSON',
    demandOption: false,  
    type: 'string', 
    default:'productos',
})
.help()
.argv;

const nombreArchivo=argv.file;

const archivo=`src/${nombreArchivo}.json`;

contenidoJSON().then((json) => {
    if (fs.existsSync(archivo)) {
        console.log(`El archivo ${archivo} existe.`);
        fs.writeFileSync(archivo, json); 
    } else {
        console.log(`El archivo ${archivo} no existe, se creara uno nuevo.`);
        fs.writeFileSync(archivo, json); 
    }
}).catch((err) => {
    console.error('Error al crear el contenido JSON:', err);
});



// //3.LEER CONTENIDO
// const leerArchivo=fs.readFileSync(`src/${nombreArchivo}.json`,'utf-8');
// console.log(leerArchivo);

