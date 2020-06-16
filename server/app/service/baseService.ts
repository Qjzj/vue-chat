import {Service, Context} from 'egg'

export default class BaseService extends Service{
  private readonly model: any;
  constructor(ctx: Context, modelName: string) {
    super(ctx);
    this.model = ctx.model[modelName];
  }
  public async create(data: any) {
    let model = new this.model();
    for(const key in data) {
      if(data.hasOwnProperty(key)) model[key] = data[key];
    }
    return await model.save()
  }

  public async update(id: string, data: any) {
    return await this.model.findOneAndUpdate({_id: id}, data);
  }
  // 根据id获取数据
  public async get(id: string) {
    return await this.model.findById(id)
  }
  // 根据条件获取数据
  public async find(data: any) {
    return await this.model.findOne(data);
  }
  // 获取列表
  public async search(data : any = {}) {
    return await this.model.find(data);
  }
}
