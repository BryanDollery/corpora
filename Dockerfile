from oven/bun as ig

workdir /app
copy index-generator/* /app/
copy index-generator/src /app/src/
run bun install
copy data /app/data/
run bun src/index.mjs > /index.html

from nginx:alpine
copy data /data/
copy nginx.conf /etc/nginx/nginx.conf
copy --from=ig /index.html /data/
