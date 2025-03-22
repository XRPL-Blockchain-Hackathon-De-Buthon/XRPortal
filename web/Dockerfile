# Step 1: Node.js를 이용해 프론트엔드 빌드
FROM node:20 AS client-build
WORKDIR /client
COPY client/package*.json ./
RUN npm install
COPY client/ ./
RUN npm run build

# Step 2: Nginx 이미지에서 정적 파일 서빙
FROM nginx:latest
WORKDIR /usr/share/nginx/html
COPY --from=client-build /client/build/ ./

# Nginx 설정
COPY web/default.conf /etc/nginx/conf.d/default.conf