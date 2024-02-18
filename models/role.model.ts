import { Schema, model } from 'mongoose';

interface Role {
  descripcion: string;
  tipo: string;
  modulos: any[];
  negocio: string;
}

const RoleSchema = new Schema<Role>({

  descripcion: {
    type: String,
    require: true,
  },
  tipo: {
    type: String,
    require: true,
    default: 'VENTAS'
  },
  modulos: [{
    modulo: String,
    visualizar: Boolean,
    editar: Boolean,
    eliminar: Boolean,
    descripcion: String,
  }],
  negocio: {
    require: true,
    type: Schema.Types.ObjectId,
    ref: 'Negocios'
  }

});

export const Role = model<Role>('Roles', RoleSchema);
