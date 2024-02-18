import { Response } from 'express';
import { donwloadS3 } from './upload.utils';

export const getFile = async (req: any, res: Response) => {
    const file = req.params.file;
    const tipo = req.params.tipo;
    const path = `${tipo}/${file}`;
    await donwloadS3(req, res, path);
}

export const getFileForCanvas = async (req: any, res: Response) => {
    const url = req.query.url;
    const position = url.indexOf('fileupload/');
    const path = url.slice(position + 11, url.length);
    await donwloadS3(req, res, path);
}
