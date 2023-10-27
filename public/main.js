const {app, BrowserWindow, dialog} = require("electron");
const ipcMain = require("electron").ipcMain;
const isDev = require("electron-is-dev");
const path = require("path");
const fs = require("fs");
const { createProducts, getAllproducts } = require("./app/controllers/controllerProduct");
const { buscarProducto } = require("./app/controllers/controllersVentas");
const sqlite = require("sqlite3").verbose();

require("@electron/remote/main").initialize();
const appDataPath = app.getAppPath("userData");
const dbPath = path.join(appDataPath, "data.db");

let mainWindow;
//let windowLogin;


function createMainWindow () {
    mainWindow = new BrowserWindow({
        width: 1000,
        height: 500,
        webPreferences: {
            nodeIntegration: true,
            enableRemoteModule: true,
            contextIsolation:true,
            preload:path.join(__dirname, "preload.js")
            
        }
    });

    mainWindow.loadURL(
        isDev?
        'http://localhost:3000'
        :
        `file://${path.join(__dirname, '../build/index.html')}`

    )
    
    
}


app.on("ready", createMainWindow);
app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
        // crear base de datos 
        
    const db = new sqlite.Database(dbPath, (err) => {
        if (err) {
            console.log(err)
        } else {
            console.log("conexion exitosa");

            const sql = fs.readFileSync(path.join(__dirname, "db.sql"), "utf8");
     db.exec(sql, function(err) {
        if (err) {
            console.log('Error al crear la tabla', err);
        } else {
            console.log('Éxito al crear la tabla');
        }
    });
        }

    });

    

    db.close();
    }
});

app.on("activate" , () => {
    if (BrowserWindow.getAllWindows.length === 0) {
        createMainWindow();
    }
})


// codigo del crud produts

ipcMain.handle('createProducto', async (event, data) => {
    const result = await (await createProducts(data));
    console.log(result)
    if (result.success) {
       dialog.showMessageBox(mainWindow, 
        {
            type: "info",
            title: "exito",
            message: result.message
        });
        return true
    } else {
        dialog.showMessageBox(mainWindow, {type: "info", 
        title: "alerta", 
        message: "producto en el inventario",
        buttons: ["ok"]
    })
    return false
    }

});
ipcMain.handle("getproducto", async() => {
    const resultado = await (await getAllproducts());
    if (!resultado.success) {
       dialog.showMessageBox(mainWindow, 
            {
                type: "info",
                title: "error",
                message: resultado.message
            })
    } 

    return resultado.data;
    
})

// ----------------lector de codigo de barras -----------------

ipcMain.handle("showReaderCode", () => {
    windowReaderCode();
})
let readercode;

function windowReaderCode () {
    readercode = new BrowserWindow({
        width: 400,
        height:300,
        webPreferences: {
            nodeIntegration: true,
            enableRemoteModule: true,
            contextIsolation:true,
            preload:path.join(__dirname, "preload.js")

        }
    })
    readercode.setMenu(null);
    readercode.loadFile(path.join(__dirname,"code.html"));
}



// --------------------- ventas ---------------------------
//crear venta
//buscar producto
ipcMain.handle("findProduct", async (event, data) => {
    if (data.data) {
        const result = await buscarProducto(data.data);
    return result
    }
   return []
})



