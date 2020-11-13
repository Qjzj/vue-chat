// This file is created by egg-ts-helper@1.25.8
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportAcitivtyGroup from '../../../app/model/acitivtyGroup';
import ExportActivity from '../../../app/model/activity';
import ExportDocument from '../../../app/model/document';
import ExportOrder from '../../../app/model/order';
import ExportUser from '../../../app/model/user';

declare module 'egg' {
  interface IModel {
    AcitivtyGroup: ReturnType<typeof ExportAcitivtyGroup>;
    Activity: ReturnType<typeof ExportActivity>;
    Document: ReturnType<typeof ExportDocument>;
    Order: ReturnType<typeof ExportOrder>;
    User: ReturnType<typeof ExportUser>;
  }
}
