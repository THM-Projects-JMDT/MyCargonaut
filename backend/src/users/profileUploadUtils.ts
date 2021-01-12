import { extname } from "path";

/**
 * @author https://medium.com/better-programming/nestjs-file-uploading-using-multer-f3021dfed733
 */
export const profileImageFileFilter = (req, file, callback) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return callback(new Error("Only image files are allowed!"), false);
  }
  callback(null, true);
};

export const editFileName = (req, file, callback) => {
  const name = req.user.id;
  callback(null, name);
};
