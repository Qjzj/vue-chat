export default app => {
  const mongoose = app.mongoose;
  const {Schema, model} = mongoose;

  const UserSchema = new Schema({
    name: {
      type: String,
      default: '用户_' + Date.now()
    },
    phone: {
      type: String,
      unique: true,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      validate: {
        validator: function(value: string) {
          const regx: RegExp= /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
          return regx.test(value);
        },
        message: props => `${props} is not a valid email`
      }
    },
    password: {
      type: String,
      required: true
    },
    salt: {
      type: String,
      required: true,
      max: 10,
      min: 10,
    },
    sex: {
      type: String,
      enum: ['MALE', 'FEMALE'],
    },
    signature: {
      type: String,
    },
    avatar: {
      type: Schema.Types.ObjectId,
    },
    type: {
      type: Schema.Types.Number,
      default: 1,
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

  return model('User', UserSchema);

};
