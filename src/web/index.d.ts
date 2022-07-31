declare global {
    namespace Express {
        interface Request {
           userData?: UserDataInterface;
           permissions?: PermissionInterface[],
        }
    }

    namespace fileUpload {
        interface UploadedFile {
            /** file name */
            name: string;
            /** A function to move the file elsewhere on your server */
            mv(path: string, callback: (err: any) => void): void;
            mv(path: string): Promise<void>;
            /** Encoding type of the file */
            encoding: string;
            /** The mimetype of your file */
            mimetype: string;
            /** A buffer representation of your file, returns empty buffer in case useTempFiles option was set to true. */
            data: Buffer;
            /** A path to the temporary file in case useTempFiles option was set to true. */
            tempFilePath: string;
            /** A boolean that represents if the file is over the size limit */
            truncated: boolean;
            /** Uploaded size in bytes */
            size: number;
            /** MD5 checksum of the uploaded file */
            md5: string;
        }
    }
}

export interface UserDataInterface {
    sub: string,
    username: string,
    profile: number,
    space: 'pdv' | 'treasurer' | 'admin' | 'licensed',
    app_id: number,
    grant_type: string,
}

export interface PermissionInterface {
    permission_name: string,
	applying: string,
	allow: string,
    rules?: object
}
