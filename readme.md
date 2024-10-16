# Corpora REST (read only) service
## Taken from https://github.com/dariusk/corpora

This repo contains a version of Dariusk's Corpora collection that can be deployed and served from kubernetes. I have included an nginx based dockerfile that serves the json files without the `.json` extenstion, and an `index.html` file to document the available collections. The index is generated at build-time, so there's no need for a clever server.

The index-generator folder contains the simple `javasript` code to generate the `index.html` file. I use `Bun` rather than `NodeJS`. It is invoked when the container image is built. I've included a jquery accordian and the assets necessary to make that work too.

The container this builds is used as a sample service with a very simple read-only rest api and web service.

The reason this exists is for a training course I'm running. The corpora bit is unimportant. The important bit is the build, release, test cycle. Corpora is just being used as the example app. However, you might find other uses for it, so I've made it public.
