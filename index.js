import express from "express";
import db from "./config/db.js";
import usuarios from "./router/usuarioRouters.js";

// Crear la app
const app = express();

// Habikitar lectira datos formulario
app.use(express.urlencoded({ extended: true }));

// Conexion DB
try {
    await db.authenticate();
    db.sync();
    console.log("Conexion correcta a la DB");
} catch (error) {
    console.log(error);
}

// Carpeta Publica
app.use(express.static("public"));

// Routing
app.use("/auth", usuarios);

// Definir puerto
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log("El servidor esta funcionando en el puerto :", port);
});
