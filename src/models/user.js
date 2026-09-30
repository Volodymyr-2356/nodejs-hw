import { model, Schema } from 'mongoose';

const userSchema = new Schema(
  {
    username: { type: String, required: false, trim: true },
    email: { type: String, unique: true, required: true, trim: true },
    password: { type: String, required: true, min: 8 },
  },
  { timestamps: true },
);

userSchema.pre('save', function () {
  if (!this.username) {
    this.username = this.email;
  }
});

// Перевизначаємо метод toJSON щоб видаляти пароль із об'єкта користувача перед відправкою у відповідь.
userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};
export const User = model('User', userSchema);
