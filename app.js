const express = require('express');
const bodyparser = require('body-parser');
const path = require('path');
// import passport and passport-jwt modules
const cookieParser = require('cookie-parser');
const multer = require('multer');
const sequelize = require('./utils/database');
//========================================Model=========================
const User = require('./models/User');
//========================================Routes=========================
const userRoutes = require('./routes/User');




const app = express();

app.use(cookieParser());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});
//======================================================================

//======================================================================

// basic configuration for fileupload

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images');
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString() + '-' + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/jpeg'
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

app.use(bodyparser.json({ limit: '150mb' }));
app.use(multer({ storage: fileStorage, fileFilter: fileFilter }).single('url'));
app.use(bodyparser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// file upload configuration end

//  ====================== Routes ======================
app.use(userRoutes);

//If Page not found
app.use((req, res, next) => {
  res.status(404).json('404 api not found');
});

sequelize
  //.sync({ force: true })
  .sync()
  .then(result => {

    console.log('Connection has been established successfully port 3200.');
    const server = app.listen(process.env.PORT || 3200);

    const io = require('./socket').init(server);
    io.on('connected', socket => {
      console.log('User Connected');
      socket.on('disconnected', () => console.log('User Disconnected'));
    });

  })
  .catch(err => console.log(err));
