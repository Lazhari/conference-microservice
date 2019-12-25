class FeedbackService {
  constructor(FeedbackEntity) {
    this.FeedbackEntity = FeedbackEntity;
  }

  async addEntry(name, title, message) {
    return this.FeedbackEntity.create({ name, title, message });
  }

  async getList() {
    const data = await this.FeedbackEntity.findAll({
      order: [['createdAt', 'DESC']],
    });
    return data;
  }
}

module.exports = FeedbackService;
