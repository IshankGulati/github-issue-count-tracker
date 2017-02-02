# Issues 

This project displays number of open issues of any public repository on github.

## Build & development

Run `grunt` for building and `grunt serve` for preview.

## How it works

Uses github api to fetch the issues of given reposiory and then filters it to remove pull requests and take in account of only open issues.

## Improvements

Server side implementation for storing the retrieved counts in a database and update them regularly using crons.


