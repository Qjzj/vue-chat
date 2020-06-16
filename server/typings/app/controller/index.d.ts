// This file is created by egg-ts-helper@1.25.8
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportActivity from '../../../app/controller/activity';
import ExportCommon from '../../../app/controller/common';
import ExportDocument from '../../../app/controller/document';
import ExportHome from '../../../app/controller/home';
import ExportUser from '../../../app/controller/user';
import ExportUtils from '../../../app/controller/utils';

declare module 'egg' {
  interface IController {
    activity: ExportActivity;
    common: ExportCommon;
    document: ExportDocument;
    home: ExportHome;
    user: ExportUser;
    utils: ExportUtils;
  }
}
