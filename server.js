// Required modules
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const path = require('path');
const sequelize = require('./config/connection');
// express app
const app = express();
const PORT = process.env.PORT || 3001;
// routing
app.use(require('./controllers')); 
// handlebars
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
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
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
  })
);

// Start Server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
  });
});
