export default app => {
  const { mongoose } = app;
  const { Schema } = mongoose;

  const documentSchema = new Schema({
    name: {
      type: String,
      required: true
    },
    mime: {
      type: String,
    },
    dir: {
      type: Boolean,
      default: false
    },
    path: {
      type: String,
      set: function(val) {
        if(val.indexOf('http') === 0) {
          return val;
        }
        return '/public/upload/' + val;
      }
    },
    create: {
      type: Date,
      default: Date.now()
    },
    del: {
      type: Boolean,
      default: false,
    }
  });

  return mongoose.model('Document', documentSchema)
}
