# Corpora REST (read only) service
## Taken from https://github.com/dariusk/corpora

This repo contains a deployable version of Dariusk's Corpora collection. I have included an nginx based dockerfile that serves the json files without the `.json` extenstion, and an `index.html` file to document the available collections.

The index-generator folder contains the simple `javasript` code to generate the `index.html` file. I use `Bun` rather than `NodeJS`. It is invoked when the container image is built.
