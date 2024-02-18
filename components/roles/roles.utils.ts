import { CustomError } from "../../classes/custom-error";
import { Role } from "../../models/role.model";

export const findOneRoleAndDelete = async (idRole: string) => {

    const roleDB = await Role.findByIdAndDelete(idRole);

    if (!roleDB)
        throw new CustomError('El role no fue encontrado en BD', 400, 'El role no fue encontrado en BD');

    return roleDB;

}