const contextBridge = require("electron").contextBridge;
const ipcRender = require("electron").ipcRenderer;

const ipc = {
    'render': {
        'send':[
            'createProducto',
            "updateProducto",
            "findProduct",
            "codigoBarras"

        ],
        'sendReceive': [
            'getproducto',
            "deletProduct",
            "createProducto",
            "findProduct",
            "codigoBarras",
            "showReaderCode"

        ]
    }
}


contextBridge.exposeInMainWorld(
    'Electron', {
        send: (channel, args) => {
            let validChannel = ipc.render.send;

            if (validChannel.includes(channel)) {
                ipcRender.send(channel, args)
            }
        },
        invoke: (channel, args) => {
            let validChannels = ipc.render.sendReceive;

            if (validChannels.includes(channel, args)) {
                return ipcRender.invoke(channel, args)
                
            }
        }
    }
)




/*contextBridge.exposeInMainWorld("Electron", {
    data: {
        sendData(message) {
            ipcRender.send('persona', message)
        }
    }
})
*/
