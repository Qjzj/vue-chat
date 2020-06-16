// This file is created by egg-ts-helper@1.25.8
// Do not modify this file!!!!!!!!!

import 'egg';
type AnyClass = new (...args: any[]) => any;
type AnyFunc<T = any> = (...args: any[]) => T;
type CanExportFunc = AnyFunc<Promise<any>> | AnyFunc<IterableIterator<any>>;
type AutoInstanceType<T, U = T extends CanExportFunc ? T : T extends AnyFunc ? ReturnType<T> : T> = U extends AnyClass ? InstanceType<U> : U;
import ExportActivity from '../../../app/service/activity';
import ExportBaseService from '../../../app/service/baseService';
import ExportDocument from '../../../app/service/document';
import ExportTest from '../../../app/service/Test';
import ExportUser from '../../../app/service/user';
import ExportUtils from '../../../app/service/utils';

declare module 'egg' {
  interface IService {
    activity: AutoInstanceType<typeof ExportActivity>;
    baseService: AutoInstanceType<typeof ExportBaseService>;
    document: AutoInstanceType<typeof ExportDocument>;
    test: AutoInstanceType<typeof ExportTest>;
    user: AutoInstanceType<typeof ExportUser>;
    utils: AutoInstanceType<typeof ExportUtils>;
  }
}
