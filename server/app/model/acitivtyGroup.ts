export default app => {
  const mongoose = app.mongoose;
  const {Schema, model} = mongoose;

  const activityGroupSchema = new Schema({
    activity_id: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    colonel: {
      type: Schema.Types.ObjectId,
      require: true
    },
    group: {
      type: [Schema.Types.ObjectId],
      default: []
    }
  });

  return model('ActivityGroup', activityGroupSchema);

}
