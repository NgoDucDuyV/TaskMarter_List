export function applyBase(schema, { remove = [] } = {}) {
  schema.set("toJSON", {
    transform: (_doc, ret) => {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
      for (const k of remove) delete ret[k];
      return ret;
    },
  });

  schema.set("toObject", {
    transform: (_doc, ret) => {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
      for (const k of remove) delete ret[k];
      return ret;
    },
  });

  // Thêm timestamps mặc định cho tất cả các schema
  schema.set("timestamps", true);
}
