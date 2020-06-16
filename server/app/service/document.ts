import {Context} from 'egg';
import BaseService from './baseService'
const path = require('path');
const fs = require('fs');

export default class DocumentService extends BaseService {
  constructor(ctx: Context) {
    super(ctx, 'Document')
  }
  public async index(file: any, data: any) {
    const {ctx, app}  = this;
    const hash = data.hash ? data.hash : await ctx.helper.calcFileHash(file.filepath);

    const ext = path.extname(file.filename);
    const name = hash + ext;
    let newPath: string = path.resolve(app.config.uploadDir, name);
    let documentData: object;
    // 检测文件是否存在
    const isExit = fs.existsSync(path.resolve(app.config.uploadDir, name));
    if(isExit) {
      console.log('文件已经存在');
      documentData = await this.find({path: new RegExp(hash)});

      if(!documentData) {
        // 存储数据库
        documentData = await this.create({
          name: file.filename,
          mime: file.mime,
          path: name,
        })
      }
    }else {
      console.log('文件不存在');
      // 修改文件位置
      await ctx.helper.copyFile(file.filepath, newPath);
      await ctx.helper.removeFile(file.filepath);
      // 存储数据库
      documentData = await this.create({
        name: file.filename,
        mime: file.mime,
        path: name,
      })
    }

    return {
      error_code: 0,
      data: documentData,
      message: 'OK'
    };
  }
}
