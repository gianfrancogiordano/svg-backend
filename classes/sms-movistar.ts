import axios from "axios";

export default class SmsMovistar {

    private static _instance: SmsMovistar;
    private url: string = `http://movistarsms.api.infobip.com/sms/1/text/single`;
    private USERNAME: string = 'GRUPROMOTORA';
    private PASSWORD: string = 'Colombia.2022';

    private constructor() { }

    // Singleton
    public static get instance() {
        return this._instance || (this._instance = new this());
    }

    get headers() {
        return {
            auth: {
                username: this.USERNAME,
                password: this.PASSWORD
            }
        }
    }

    sendSms(message: { to: string, text: string }) {
        return axios.post(this.url, message, this.headers);
    }

    generateVerificationCode = (length: number) => {

        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        const charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }

        return result;

    }

}
