import { Client, LocalAuth } from "whatsapp-web.js";
// import { image as imageQr } from "qr-image";

/**
 * Extendemos los super poderes de whatsapp-web
 */
class WsTransporter extends Client {
    private status = false;
    private id: string = '';

    constructor(number: string) {
        super({
            authStrategy: new LocalAuth({ clientId: number }),
            puppeteer: { headless: true },
        });

        this.id = number;

        console.log('[Whatsapp - Listening]');

        this.initialize();

        this.on('ready', () => {
            this.status = true;
            console.log("LOGIN_SUCCESS");
        });

        this.on('auth_failure', () => {
            this.status = false;
            console.log("LOGIN_FAIL");
        });

        this.on('qr', (qr) => {
            // console.log('Escanea el codigo QR que esta en la carepta tmp')
            this.generateImage(qr)
        });


        this.on('message', async (msg: any) => {

            if( msg._data.type === 'chat' && msg._data.from != 'status@broadcast' )
                console.log('MESSAGE RECEIVED', 'DE: ' + msg._data.from,'PARA: ' + msg._data.to, 'MSG: ' + msg._data.body , 'NOMBRE: ' + msg._data.notifyName);
    
        });

    }

    /**
     * Enviar mensaje de WS
     * @param lead
     * @returns
     */
    async sendMsg(lead: { message: string; phone: string }): Promise<any> {
        try {
            if (!this.status) return Promise.resolve({ error: "WAIT_LOGIN" });
            const { message, phone } = lead;
            const response = await this.sendMessage(`${phone}@c.us`, message);
            return { id: response.id.id };
        } catch (e) {
            return Promise.resolve({ error: e });
        }
    }

    getStatus(): boolean {
        return this.status;
    }

    private generateImage = (base64: string) => {

        console.log(base64);
        console.log('ID: ', this.id);

        // const path = `${process.cwd()}/tmp`;
        // let qr_svg = imageQr(base64, { type: "svg", margin: 4 });
        // qr_svg.pipe(require("fs").createWriteStream(`${path}/qr.svg`));
        // console.log(`⚡ Recuerda que el QR se actualiza cada minuto ⚡'`);
        // console.log(`⚡ Actualiza F5 el navegador para mantener el mejor QR⚡`);

    };
}

export default WsTransporter;
