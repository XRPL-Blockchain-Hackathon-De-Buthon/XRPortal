const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Blockchain Blog API",
      version: "1.0.0",
      description: "블록체인과 결합한 블로그 서비스 API 문서"
    },
    servers: [
      {
        url: "http://localhost/api",
      },
    ],
  },
  apis: ["./routes/*.js"], // 라우터 파일에 작성한 swagger 주석 사용
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
