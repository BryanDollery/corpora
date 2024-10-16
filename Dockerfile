from oven/bun as base

workdir /app
copy index-generator/* /app/
copy index-generator/src /app/src/
run bun install
copy data /app/data/
run bun src/index.mjs > /index.html

from alpine as staging
copy data /data/
copy --from=base /index.html /data/
copy /index-generator/assets /data/assets/

from nginx:alpine
copy nginx.conf /etc/nginx/nginx.conf
copy --from=staging /data/ /data/
