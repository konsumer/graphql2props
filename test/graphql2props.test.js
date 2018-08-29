/* global describe, it, expect */
const graphql2props = require('../index')
const { readFileSync } = require('fs')

describe('graphql2props', () => {
  it('should be able to parse SWAPI', () => {
    expect(graphql2props(readFileSync(`${__dirname}/swapi.graphql`).toString())).toMatchSnapshot()
  })
})
