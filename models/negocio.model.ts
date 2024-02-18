import { Schema, model } from 'mongoose';

interface Negocio {
  pais: string;
  moneda: string;
  razon_social: string;
  nombre_comercial: string;
  documento: string;
  representante: string;
  direccion: string;
  telefono: string;
  whatsapp: string;
  identnegocio: string;
  activo: Number;
  verified: Boolean;
  domain?: string;
  cantidadsedes?: Number;
  sedes?: [{descripcion: string, wsnumber: string, usuario: string}];
  gtag?: string;
  pixel?: string;
  pixel_access_token?: string;
  email?: string;
  banner?: [];
  logo?: string;
  eslogan?: string;
  last_suscription_end?: Date;
  last_login_date?: Date;
  sms?: boolean;
  saldo_sms?: number;
  tarifa_sms?: number;
  distribuidor: string;
}

const NegocioSchema = new Schema<Negocio>({

  pais: {
    type: String,
    require: true,
    default: 'CO'
  },
  moneda: {
    type: String,
    require: true,
    default: '$'
  },
  razon_social: {
    type: String,
    require: true,
  },
  nombre_comercial: {
    type: String,
    require: true,
  },
  documento: {
    type: String,
    require: true,
    unique: true
  },
  representante: {
    type: String,
    require: true,
  },
  direccion: {
    type: String,
    require: true,
  },
  telefono: {
    type: String,
    require: true,
  },
  whatsapp: {
    type: String,
    require: true,
  },
  posPrinter: {
    type: Boolean,
    default: false
  },
  identnegocio: {
    type: String,
    require: true,
    unique: true
  },
  domain: {
    type: String,
    unique: true
  },
  cantidadsedes: {
    type: Number,
    default: 5
  },
  sedes: [{
    descripcion: String,
    wsnumber: String,
    encargado: {
      require: true,
      type: Schema.Types.ObjectId,
      ref: 'Usuarios'
    }
  }],
  gtag: {
    type: String,
  },
  pixel: {
    type: String,
  },
  pixel_access_token: {
    type: String,
    default: ''
  },
  activo: {
    type: Number,
    default: 1
  },
  verified: {
    type: Boolean,
    default: true
  },
  email: {
    type: String,
    require: true,
  },
  banner: [],
  logo: {
    type: String,
  },
  logourl: {
    type: String,
    default: ''
  },
  eslogan: {
    type: String,
  },
  last_suscription_end: {
    type: Date
  },
  last_login_date: {
    type: Date
  },
  sms: {
    type: Boolean,
    default: false
  },
  saldo_sms: {
    type: Number,
    default: 0
  },
  tarifa_sms: {
    type: Number,
    default: 0
  },
  distribuidor: {
    require: true,
    type: Schema.Types.ObjectId,
    ref: 'Distribuidores'
  }

});

NegocioSchema.set('timestamps', true);

export const Negocio = model<Negocio>('Negocios', NegocioSchema);
