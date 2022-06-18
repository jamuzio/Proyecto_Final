import db from "../DataBase/FireBaseServer.js"

const query = db.collection("Productos")
const id = Date.now()
const hoy = new Date()

let doc = query.doc(`${id}`)
const NewElement = {
    TIMESTAMP: `${hoy.toDateString() +' '+  hoy.toLocaleTimeString()}`,
    NOMBRE: "Mouse",
    DESCRIPCION: "Mouse USB Genius",
    CODIGO: 3088,
    FOTO: "http:\\...",
    PRECIO: 2000,
    STOCK: 50
}
await doc.create(NewElement)
let resultado = await doc.get()
resultado = resultado.data()
console.log(resultado)
if(!!resultado){
    console.log("encontrado")
} 
 else console.log("mooo encontrado")
let item = await doc.update({NOMBRE: "Otro Mouse"})
console.log(item)
item = await doc.delete()
console.log(item)
doc = query.doc(`598`)
resultado = await doc.get()
resultado = resultado.data()
console.log(resultado)
if(!!resultado){
    console.log("encontrado")
} 
 else console.log("no  encontrado")
 try{
     item = await doc.delete()
     console.log(item)
 } catch(error){
    console.log(error.code)
 }
//resultado = await query.get()
//let docs = resultado.docs
//const respuesta = docs.map((doc) => ({
//    ID: doc.id,
//    TIMESTAMP: doc.data().TIMESTAMP,
//    NOMBRE: doc.data().NOMBRE,
//    DESCRIPCION: doc.data().DESCRIPCION,
//    CODIGO: doc.data().CODIGO,
//    FOTO: doc.data().FOTO,
//    PRECIO: doc.data().PRECIO,
//    STOCK: doc.data().STOCK
//}))
//console.log(respuesta)
const listacompleta = await buscarymapear(query)
const indicebuscado = listacompleta.find(p => p.NOMBRE == "Tecldo")
console.log(!indicebuscado)
async function buscarymapear(collection){
    const resultado = await collection.get()
    let docs = resultado.docs
    const respuesta = docs.map((doc) => ({
        ID: doc.id,
        TIMESTAMP: doc.data().TIMESTAMP,
        NOMBRE: doc.data().NOMBRE,
        DESCRIPCION: doc.data().DESCRIPCION,
        CODIGO: doc.data().CODIGO,
        FOTO: doc.data().FOTO,
        PRECIO: doc.data().PRECIO,
        STOCK: doc.data().STOCK
    }))
    return respuesta
}