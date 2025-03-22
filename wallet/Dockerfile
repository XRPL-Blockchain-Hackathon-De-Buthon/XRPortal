FROM python:3.12
WORKDIR /app

# 가상환경 생성 및 활성화
RUN python3 -m venv venv
ENV PATH="/app/venv/bin:$PATH"

# 의존성 설치
COPY wallet/requirements.txt /app/
RUN pip install --no-cache-dir --upgrade pip
RUN pip install --no-cache-dir -r requirements.txt

# Flask 앱 복사
COPY wallet/app /app/app
COPY wallet/utils /app/utils
COPY wallet/keystore /app/keystore
COPY wallet/run.py /app/run.py
COPY wallet/config.py /app/config.py