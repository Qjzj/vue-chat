import {Controller} from 'egg';

export default class ActivityController extends Controller {
  public async create() {
    const {ctx, service} = this;
    const data = ctx.request.body || {};

    await service.activity.save(data);
  }

  public async get() {
    const {ctx, service} = this;
    const {id} = ctx.params;

    await service.activity.getById(id);
  }

  public async list() {
    const {ctx, service} = this;
    const data = ctx.request.body || {};

    await service.activity.list(data);
  }
}
