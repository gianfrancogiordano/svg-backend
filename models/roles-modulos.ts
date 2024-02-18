import { Schema, model } from 'mongoose';

interface RoleModulos {
    tipoRole: string;
    modulos: any[];
    negocio: string;
}

const RoleModulosSchema = new Schema<RoleModulos>({

    tipoRole: {
        type: String,
        require: true,
    },
    modulos: [{
        modulo: String,
        visualizar: Boolean,
        editar: Boolean,
        eliminar: Boolean,
        descripcion: String,
    }]

});

export const RoleModulos = model<RoleModulos>('Modulos', RoleModulosSchema);
