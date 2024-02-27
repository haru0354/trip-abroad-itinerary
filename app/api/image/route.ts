import multer from 'multer';
import { NextApiRequest, NextApiResponse } from 'next';
import path from 'path';
import fs from 'fs';

const uploadDir = path.join(process.cwd(), 'public', 'postImage');

// Multerの設定
const upload = multer({
  storage: multer.diskStorage({
    destination: uploadDir,
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    },
  }),
});

// POSTメソッドのハンドラー
const postHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    // Promiseの型引数にvoidを含める
    await new Promise<void>((resolve, reject) => {
      upload.single('file')(req as any, res as any, (err: any) => {
        if (err) reject(err);
        resolve();
      });
    });
    // ファイルがアップロードされた後の処理
    res.status(200).json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Failed to upload file' });
  }
};

// POSTメソッドのハンドラーをエクスポート
export { postHandler };
