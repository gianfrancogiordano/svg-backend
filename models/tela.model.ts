import { Schema, model } from 'mongoose';

interface Tela {
    usuario: string;
    sku: string;
    color: string;
    ancho: number;
    promedio: number;
    kg: number;
    cantidadIngresada: number;
    cantidad: number;
    unidadMedida: string; // Siempre en metros (mts = kg x promedio)
    proveedor: string;
    skuproveedor: string;
    descripcion: string;
}

const TelaSchema = new Schema<Tela>({

    sku: {
        type: String
    },
    descripcion: {
        type: String
    },
    color: {
        type: String
    },
    ancho: {
        type: Number
    },
    promedio: {
        type: Number
    },
    kg: {
        type: Number
    },
    cantidadIngresada: {
        type: Number
    },
    cantidad: {
        type: Number
    },
    unidadMedida: {
        type: String
    },
    proveedor: {
        type: String
    },
    skuproveedor: {
        type: String
    },
    usuario: {
        require: true,
        type: Schema.Types.ObjectId,
        ref: 'Usuarios'
    }

});

TelaSchema.set('timestamps', true);

export const Tela = model<Tela>('Telas', TelaSchema);
