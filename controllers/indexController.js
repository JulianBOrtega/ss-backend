const path = require('path');

const HomePage = (req, res) => {
  res.sendFile(path.join(__dirname, '../html', 'index.html'));
};

module.exports = { HomePage };
