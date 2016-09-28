import mongoose, { Schema } from 'mongoose';

const SnipetSchema = new Schema({
  userId: { type: Schema.Types.ObjectId },
  title: { type: String },
  content: Schema.Types.Mixed,
  updatedAt: { type: Date, default: Date.now },
  createdAt: { type: Date, default: Date.now },
});

SnipetSchema.method({});

SnipetSchema.static({
  /**
   * Serach for snipets and return a list
   *
   * @param {number} userId
   * @param {object} filter
   *
   */
  async getList(userId, filter = {}) {
    let itemsPerPage = parseInt(filter.itemsPerPage) || 5;
    let currentPage = parseInt(filter.currentPage) || 0;

    let items = await this.find({});
      // .skip(itemsPerPage * currentPage)
      // .limit(itemsPerPage);

    let pagination = {
      itemsPerPage,
      currentPage,
    };

    return {
      items,
      pagination,
    };
  }

});

export default mongoose.model('Snippet', SnipetSchema);
