import BaseService from './baseService'

export default class ActivityService extends BaseService {
  constructor(ctx) {
    super(ctx, 'Activity')
  }

  public async save(data: any) {
    const {ctx} = this;
    const result = await this.create(data);
    ctx.helper.sendSuccess(ctx, result);
  }

  public async getById(id) {
    const {ctx} = this;
    const result = await this.get(id);
    ctx.helper.sendSuccess(ctx, result);
  }

  public async list(data = {}) {
    const {ctx} = this;
    const result = await this.search(data);
    ctx.helper.sendSuccess(ctx, result);
    
  }

  public async test() {
    return await this.search();
  }
}
