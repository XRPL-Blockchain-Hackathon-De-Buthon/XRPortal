const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');
const sequelize = require('./db');

const userRoutes = require('./routes/user');
const postRoutes = require('./routes/post');
const commentRoutes = require('./routes/comment');
const adRoutes = require('./routes/ad');
const transactionRoutes = require('./routes/transaction');
const walletRoutes = require('./routes/wallet');
const nftRoutes = require('./routes/nft'); // 추가

app.use(express.json());

// Swagger API 문서 제공 (http://localhost:3000/api-docs)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// 각 라우터 등록
app.use('/users', userRoutes);
app.use('/posts', postRoutes);
app.use('/comments', commentRoutes);
app.use('/ads', adRoutes);
app.use('/transactions', transactionRoutes);
app.use('/wallet', walletRoutes);
app.use('/nfts', nftRoutes); 

// 기본 루트 라우트
app.get('/', (req, res) => {
  res.send('Welcome to the Blockchain Blog API!');
});

// DB 동기화 후 서버 시작
sequelize.sync({ force: true }).then(() => {
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}).catch(err => {
  console.error("Error connecting to the database:", err);
});


module.exports = app;
