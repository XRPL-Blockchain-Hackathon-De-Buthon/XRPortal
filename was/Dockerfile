# Step 1: Node.js 베이스 이미지
FROM node:20

# Step 2: 작업 디렉토리 설정
WORKDIR /app

# Step 3: package.json, package-lock.json 복사 및 의존성 설치
COPY was/package*.json ./
RUN npm install

# Step 4: 나머지 소스 복사
COPY was/ ./

# Step 5: Express 서버 실행
# CMD ["node", "app.js"]
