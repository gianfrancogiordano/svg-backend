import { Response } from 'express';
import { S3Client, PutObjectCommand, PutObjectCommandInput, GetObjectCommand, GetObjectCommandInput, DeleteObjectCommand, DeleteObjectCommandInput, CopyObjectCommand, CopyObjectCommandInput } from '@aws-sdk/client-s3';
import { CustomError } from '../../classes/custom-error';
import sharp from 'sharp';
import { v4 as uuidv4 } from 'uuid';
import { join } from 'path';
import { Readable } from 'stream';
import { param } from 'express-validator';

// Configuraciones de AWS - S3
const bucketName = process.env.AWS_BUCKET_NAME || '';

const s3 = new S3Client({
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY || '',
    secretAccessKey: process.env.AWS_SECRET_KEY || ''
  },
  region: process.env.AWS_BUCKET_REGION || '',
});

export const borrarArchivo = async (fileKey: string) => {

  const params: DeleteObjectCommandInput = {
    Bucket: bucketName,
    Key: fileKey
  }

  const command = new DeleteObjectCommand(params);
  return await s3.send(command);

}

export const uploadS3 = async (file: any, name: string, params?: PutObjectCommandInput) => {

  let uploadParams: PutObjectCommandInput = {
    Bucket: bucketName,
    Key: name,
    Body: file.data,
    ContentType: file.mimetype
  }

  if ( params ) { uploadParams = params }

  const command = new PutObjectCommand(uploadParams);
  return await s3.send(command);

}

export const copyFileFromS3 = async (OldfileKey: string, locationPath: string) => {

  const nombreCortado = OldfileKey.split('.');
  let extensionArchivo = nombreCortado[nombreCortado.length - 1];

  // Generamos el nombre del archivo
  const nombreArchivo = `${uuidv4()}.${extensionArchivo}`;

  // Path para guardar el archivo
  const path = `${locationPath}/${nombreArchivo}`;

  const copyParams: CopyObjectCommandInput = {
    Bucket: bucketName,
    CopySource: `${bucketName}/${OldfileKey}`,
    Key: path,
  }

  try {

    const command = new CopyObjectCommand(copyParams);
    await s3.send(command);
    return nombreArchivo;
    
  } catch (e) {

    console.log('Error copiando imagen');
    return `../../uploads/no-img.png`;

  }

}

export const donwloadS3 = async (req: any, res: Response, fileKey: string) => {

  const downloadParams: GetObjectCommandInput = {
    Bucket: bucketName,
    Key: fileKey
  }

  try {

    const command = new GetObjectCommand(downloadParams);
    const response: any = await s3.send(command);
    const stream = response.Body as Readable;
    stream.pipe(res);

  } catch (e) {

    console.log('Error obteniendo imagen');
    const pathImg = join(__dirname, `../../uploads/no-img.png`);
    res.sendFile(pathImg);

  }

}

export const uploadOptImg = async (uploadFiles: any, locationPath: 'categorias' | 'productos' | 'landing' | 'banner' | 'logo' | 'bgimg' | 'productosextra',
  imgWidth: number, imgHeight: number, locationPathAntiguo: string = '') => {

  // Procesamos el archivo
  const file: any = uploadFiles;
  const nombreCortado = file.name.split('.');
  let extensionArchivo = nombreCortado[nombreCortado.length - 1].toLowerCase();

  // Validar extension
  const extensionesValidas = ['png', 'jpg', 'jpeg', 'gif'];
  if (!extensionesValidas.includes(extensionArchivo)) {
    throw new CustomError(`No es una extension permitida - ${ extensionArchivo }`, 400);
  }

  // Generamos el nombre del archivo
  const nombreArchivo = `${uuidv4()}.${extensionArchivo}`;

  // Path para guardar el archivo
  const path = `${locationPath}/${nombreArchivo}`;

  try {

    if (locationPath === 'landing') {
      // Optimizamos la img
      file.data = await sharp(file.data)
        .png({ progressive: true, quality: 80 })
        .toBuffer();

    } else if (locationPath === 'productosextra') {

      if (extensionArchivo === 'GIF' || extensionArchivo === 'gif') {

        console.log('optimizando GIF');
        // Optimizamos el GIF
        file.data = await sharp(file.data, { animated: true })
          // .resize(imgWidth, imgHeight)
          // .flatten({ background: '#FFFFFF' })
          .gif()
          .toBuffer();

      } else {

        let imgWidth: number = 0;
        await sharp(file.data).metadata().then((metadata) => imgWidth = metadata.width && metadata.width > 600 ? 600 : metadata.width || 0);

        // Optimizamos la img
        file.data = await sharp(file.data)
          .resize(imgWidth)
          .png({ progressive: true, quality: 50 })
          .toBuffer();

      }

    } else if (extensionArchivo === 'GIF' || extensionArchivo === 'gif') {

      console.log('optimizando GIF');

      // Optimizamos el GIF
      file.data = await sharp(file.data, { animated: true })
        .resize(imgWidth, imgHeight)
        .flatten({ background: '#FFFFFF' })
        .gif()
        .toBuffer();

    } else {

      let imgWidth: number = 0;
      await sharp(file.data).metadata().then((metadata) => imgWidth = metadata.width && metadata.width > 1024 ? 1024 : metadata.width || 0);

      // Optimizamos la img
      file.data = await sharp(file.data)
        .resize(imgWidth)
        .flatten({ background: '#FFFFFF' })
        .jpeg({ progressive: true, chromaSubsampling: '4:4:4', quality: 80, force: true })
        .toBuffer();

    }

    // Movemos la imagen al S3
    await uploadS3(file, path);

    if (locationPathAntiguo != '') {
      borrarArchivo(locationPathAntiguo);
    }

    return nombreArchivo;

  } catch (err) {
    throw new CustomError('Error subiendo el archivo', 400, err);

  }

}
