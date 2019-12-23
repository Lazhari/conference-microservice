const fs = require('fs');
const util = require('util');

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

class FeedbackService {
  constructor(dataFile) {
    this.dataFile = dataFile;
  }

  async addEntry(name, title, message) {
    const data = await this.getData();
    data.unshift({ name, title, message });
    return writeFile(this.dataFile, JSON.stringify(data));
  }

  async getList() {
    const data = await this.getData();
    return data;
  }

  async getData() {
    const data = await readFile(this.dataFile, 'utf8');
    if (!data) return [];
    return JSON.parse(data);
  }
}

module.exports = FeedbackService;
