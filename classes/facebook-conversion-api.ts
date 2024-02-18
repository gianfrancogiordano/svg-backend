import { createHash } from 'node:crypto'
import axios from 'axios';

const endpoint = `https://graph.facebook.com/v18.0`;

export default class ApiConversionsFacebook {

    private static _instance: ApiConversionsFacebook;

    constructor() {
        // init of api
    }

    // Singleton
    public static get instance() {
        return this._instance || (this._instance = new this());
    }

    get headers() {
        return {
            headers: {
                'Content-Type': 'application/json',
            }
        }
    }

    sendEventLead(pixel: string, apiToken: string, purchaseData: any, clientData: any, accion: string, eventId: string, remoteAddress: any, userAgent: any) {


        const data = {
            "data": [
                {
                    "event_name": accion,
                    "event_time": Date.parse(new Date().toString()) / 1000,
                    "event_id": eventId,
                    "user_data": {
                        "em": [this.convertHash256(clientData.email)],
                        "ph": [this.convertHash256(clientData.codigo + clientData.telefono)],
                        "client_ip_address": clientData.ip,
                        "client_user_agent": userAgent,
                        "fbc": clientData._fbc,
                        "fbp": clientData._fbp
                    },
                    "custom_data": purchaseData,
                    "event_source_url": clientData.domain,
                    "action_source": "website",
                    "opt_out": true
                }
            ]
        }

        return axios.post(`${endpoint}/${pixel}/events?access_token=${apiToken}`, data);
        
    }

    sendEventInitiateCheckout(pixel: string, apiToken: string, purchaseData: any, clientData: any, accion: string, eventId: string, remoteAddress: any, userAgent: any) {

        const data = {
            "data": [
                {
                    "event_name": accion,
                    "event_time": Date.parse(new Date().toString()) / 1000,
                    "event_id": eventId,
                    "user_data": {
                        "em": [this.convertHash256(clientData.email)],
                        "ph": [this.convertHash256(clientData.codigo + clientData.telefono)],
                        "client_ip_address": clientData.ip,
                        "client_user_agent": userAgent,
                        "fbc": clientData._fbc,
                        "fbp": clientData._fbp
                    },
                    "custom_data": purchaseData,
                    "event_source_url": clientData.domain,
                    "action_source": "website",
                    "opt_out": true
                }
            ]
        }

        return axios.post(`${endpoint}/${pixel}/events?access_token=${apiToken}`, data);

    }

    sendEventPurchase(pixel: string, apiToken: string, purchaseData: any, clientData: any, accion: string, eventId: string, remoteAddress: any, userAgent: any) {

        const data = {
            "data": [
                {
                    "event_name": accion,
                    "event_time": Date.parse(new Date().toString()) / 1000,
                    "event_id": eventId,
                    "user_data": {
                        "em": [this.convertHash256(clientData.email)],
                        "ph": [this.convertHash256(clientData.codigo + clientData.telefono)],
                        "client_ip_address": clientData.ip,
                        "client_user_agent": userAgent,
                        "fbc": clientData._fbc,
                        "fbp": clientData._fbp
                    },
                    "custom_data": purchaseData,
                    "event_source_url": clientData.domain,
                    "action_source": "website",
                    "opt_out": true
                }
            ]
        }

        return axios.post(`${endpoint}/${pixel}/events?access_token=${apiToken}`, data);

    }

    sendEventAddToCart(pixel: string, apiToken: string, purchaseData: any, clientData: any, accion: string, eventId: string, remoteAddress: any, userAgent: any) {

        const data = {
            "data": [
                {
                    "event_name": accion,
                    "event_time": Date.parse(new Date().toString()) / 1000,
                    "event_id": eventId,
                    "user_data": {
                        "client_ip_address": clientData.ip,
                        "client_user_agent": userAgent,
                        "fbc": clientData._fbc,
                        "fbp": clientData._fbp
                    },
                    "custom_data": purchaseData,
                    "event_source_url": clientData.domain,
                    "action_source": "website",
                    "opt_out": true,
                }
            ]
        }

        return axios.post(`${endpoint}/${pixel}/events?access_token=${apiToken}`, data);

    }

    sendEventViewContent(pixel: string, apiToken: string, purchaseData: any, clientData: any, accion: string, eventId: string, remoteAddress: any, userAgent: any) {

        const data = {
            "data": [
                {
                    "event_name": accion,
                    "event_time": Date.parse(new Date().toString()) / 1000,
                    "event_id": eventId,
                    "user_data": {
                        "client_ip_address": clientData.ip,
                        "client_user_agent": userAgent,
                        "fbc": clientData._fbc,
                        "fbp": clientData._fbp
                    },
                    "custom_data": purchaseData,
                    "event_source_url": clientData.domain,
                    "action_source": "website",
                    "opt_out": false,
                }
            ]
        }

        return axios.post(`${endpoint}/${pixel}/events?access_token=${apiToken}`, data);

    }

    sendEventPageView(pixel: string, apiToken: string, purchaseData: any, clientData: any, accion: string, eventId: string, remoteAddress: any, userAgent: any) {

        const data = {
            "data": [
                {
                    "event_name": accion,
                    "event_time": Date.parse(new Date().toString()) / 1000,
                    "event_id": eventId,
                    "user_data": {
                        "client_ip_address": clientData.ip,
                        "client_user_agent": userAgent,
                        "fbc": clientData._fbc,
                        "fbp": clientData._fbp
                    },
                    "custom_data": purchaseData,
                    "event_source_url": clientData.domain,
                    "action_source": "website",
                    "opt_out": false,
                }
            ]
        }

        return axios.post(`${endpoint}/${pixel}/events?access_token=${apiToken}`, data);

    }

    convertHash256(text: string): string {
        let em = text.trim().toLowerCase();
        em = createHash('sha256').update(em).digest('hex');
        return em;
    }

}