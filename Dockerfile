FROM node:latest

COPY . .

WORKDIR /app

RUN apt-get update && apt-get install -y libnss3-tools
RUN npm install i
# RUN wget https://github.com/FiloSottile/mkcert/releases/download/v1.4.3/mkcert-v1.4.3-linux-amd64 && \
#     mv mkcert-v1.4.3-linux-amd64 mkcert && \
#     chmod +x mkcert && \
#     mv mkcert /usr/local/bin/

# RUN mkcert -install
# RUN mkcert localhost

EXPOSE 8001

COPY wait-for-it.sh ./wait-for-it.sh
# RUN mv localhost.pem ../
# RUN mv localhost-key.pem ../

RUN chmod +x wait-for-it.sh

CMD ["npm", "run", "start"]
