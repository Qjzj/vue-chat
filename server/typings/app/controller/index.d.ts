// This file is created by egg-ts-helper@1.25.8
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportActivity from '../../../app/controller/activity';
import ExportAlipay from '../../../app/controller/alipay';
import ExportCommon from '../../../app/controller/common';
import ExportDocument from '../../../app/controller/document';
import ExportGood from '../../../app/controller/good';
import ExportHome from '../../../app/controller/home';
import ExportOrder from '../../../app/controller/order';
import ExportUser from '../../../app/controller/user';
import ExportUtils from '../../../app/controller/utils';

declare module 'egg' {
  interface IController {
    activity: ExportActivity;
    alipay: ExportAlipay;
    common: ExportCommon;
    document: ExportDocument;
    good: ExportGood;
    home: ExportHome;
    order: ExportOrder;
    user: ExportUser;
    utils: ExportUtils;
  }
}
