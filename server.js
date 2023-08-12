// Required modules
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const path = require('path');
// required files
const sequelize = require('./config/connection');
const routes = require('./controllers');
const helpers = require('./utils/helpers');
// express app
const app = express();
const PORT = process.env.PORT || 3001;
// handlebars
const hbs = exphbs.create({ helpers });
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
// middle
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
// session
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const sessionStore = new SequelizeStore({ db: sequelize });

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    cookie: {
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    },
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
  })
);
// routing
app.use(routes); 
// Start Server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () =>  console.log(`Server started on http://localhost:${PORT}`));
  });