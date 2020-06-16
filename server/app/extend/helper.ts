import {RandomType} from "../utils/utils";
const Crypto = require('crypto');
const fs = require('fs');


export default {
  /**
   * 获取随机字符
   * @param len 字符长度
   * @param type 字符类型
   */
  getRandomString(len: number, type: RandomType) {
    const charArr: string[] = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'j', 'k', 'm', 'n', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    const numArr: string[] = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];

    let temp: string[];
    let result: string = '';

    if(type === RandomType.STRING) {
      temp = charArr;
    }else if(type === RandomType.NUMBER) {
      temp = numArr
    }else if(type === RandomType.MIXIN) {
      temp = charArr.concat(numArr);
    }else {
      temp = [];
    }
    for(let i=0; i<len; i++) {
      result += temp[Math.floor(Math.random() * temp.length)]
    }

    return result;
  },

  /**
   * 加密字符串
   * @param str 加密的字符串
   * @param salt 盐
   */
  stringEncrypt(str: string, salt: string) {
    console.log('原密码', str);
    let hexStr = str.replace(/(\w{2})/g, '0x$1');
    console.log('处理后的密码', hexStr);
    const hmac = Crypto.createHmac('md5', salt);
    hmac.update(hexStr);
    return hmac.digest("hex")
  },

  /**
   * 计算文件hash
   * @param file
   */
  calcFileHash(file: string) {
    return new Promise((resolve) => {
      let hash = Crypto.createHash('sha256');

      let input = fs.createReadStream(file);

      input.on('readable', () => {
        const data = input.read();
        if(data) {
          hash.update(data);
        }else {
          resolve(hash.digest('hex'))
        }
      })

    })
  },

  /**
   * 复制文件
   * @param src
   * @param dest
   */
  copyFile(src, dest) {
    return new Promise((resolve, reject) => {
      fs.copyFile(src, dest, (err) => {
        if(err) {
          reject(err)
        }
        resolve();
      })
    })
  },

  /**
   * 移除文件
   * @param src
   */
  removeFile(src) {
    return new Promise((resolve, reject) => {
      fs.unlink(src, (err) => {
        if(err) reject(err);
        resolve();
      })
    })
  },

  sendSuccess(ctx, data: any, message='OK') {
    ctx.body = {
      error_code: 0,
      data: data,
      message
    }
  }
};
