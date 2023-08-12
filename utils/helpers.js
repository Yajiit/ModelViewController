// helpers.js
const Handlebars = require('handlebars');

Handlebars.registerHelper('formatDate', (date) => {
  return new Handlebars.SafeString(new Date(date).toLocaleDateString());
});
