FROM nginx:alpine
LABEL MAINTAINER="UST Global"

RUN apk --no-cache upgrade && apk --no-cache add gettext bash

COPY ./dist/demo /usr/share/nginx/html
ARG BUILD_NUMBER
RUN echo "export BUILD_NUMBER=$BUILD_NUMBER" > /.release &&\
    chown -R nginx:nginx /etc/nginx/conf.d /var/cache/nginx &&\
    chmod -R 777 /var/run && sed -Ei 's/^(user\s+)/#\1/g' /etc/nginx/nginx.conf

USER nginx
CMD ["nginx", "-g", "daemon off;"]
