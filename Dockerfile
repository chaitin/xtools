FROM node:18.20.3-alpine

WORKDIR "/app"

COPY "./" "/app/"

# 暴露端口
EXPOSE 3000

RUN ["npm", "install"]
CMD ["npm", "run", "dev"]