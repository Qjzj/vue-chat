export default app => {
  const {mongoose} = app;
  const {Schema, model} = mongoose;

  const stairwaySchema = new Schema({
    num: Schema.Types.Number,
    price: Schema.Types.String
  });

  const activitySchema = new Schema({
    back_img: {
      type: Schema.Types.String,
      required: true,

    },
    multiple_head_img: {
      type: Boolean,
      default: false,
    },
    title: {
      type: Schema.Types.String,
      required: true,
    },
    introduce: {
      type: Schema.Types.String,
      require: true,
    },
    head_img: {
      type: [Schema.Types.String],
      require: true,
    },
    cover_img: {
      type: Schema.Types.String,
      require: true,
    },
    start_time: {
      type: Schema.Types.Date,
      required: true,
    },
    end_time: {
      type: Schema.Types.Date,
      required: true,
    },
    original_price: {
      type: Schema.Types.String,
      required: true,
      set: (val) => {
        return Number(val).toFixed(2)
      }
    },
    front_money: {
      type: Schema.Types.String,
      required: true,
      set: val => {
        return Number(val).toFixed(2);
      }
    },
    colonel_discount: {
      type: Schema.Types.String,
      min: 0,
      max: 10,
      default: 0
    },
    stairway_price: {
      type: [stairwaySchema],
      required: true,
    },
    create_user: {
      type: Schema.Types.ObjectId,
      require: true,
    },
    create_time: {
      type: Schema.Types.Date,
      default: Date.now()
    }

  });

  return model('Activity', activitySchema);

}
