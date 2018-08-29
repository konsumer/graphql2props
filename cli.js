#!/usr/bin/env node

const graphql2props = require('./index')
const { readFileSync } = require('fs')
const { resolve } = require('path')

if (process.argv.length !== 3) {
  console.error('Usage: graphql2props <FILE.graphql>')
  process.exit(1)
}

console.log(graphql2props(readFileSync(resolve(process.cwd(), process.argv[2])).toString()))
