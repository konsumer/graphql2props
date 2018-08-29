const gql = require('graphql-tag')

const scalars = {
  Int: 'number',
  Float: 'number',
  String: 'string',
  Boolean: 'bool'
}

const getScalar = thing => Object.keys(scalars).indexOf(thing) === -1 ? `module.exports.${thing}` : `PropTypes.${scalars[thing]}`

const handleField = field => {
  // TODO: this probly needs a bit mroe work
  if (field.type.name) {
    return `${field.name.value}: ${getScalar(field.type.name.value)}`
  }
  if (field.type.kind === 'NonNullType') {
    return `${field.name.value}: ${getScalar(field.type.type.name.value)}.isRequired`
  }
  if (field.type.kind === 'ListType') {
    return `${field.name.value}: PropTypes.arrayOf(${getScalar(field.type.type.type.name.value)})`
  }
}

const handlers = {
  EnumTypeDefinition: d => {
    return `module.exports.${d.name.value} = PropTypes.oneOf(${JSON.stringify(d.values.map(v => v.name.value), null, 2)})`
  },
  ObjectTypeDefinition: d => {
    return `module.exports.${d.name.value} = PropTypes.shape({
${d.fields.map(handleField).map(s => `  ${s}`).join(',\n')}
})`
  }
}

module.exports = (graphqlString) => {
  const { definitions } = gql(graphqlString)
  const out = []
  definitions.forEach(d => {
    if (['Mutation', 'Query'].indexOf(d.name.value) !== -1) {
      return
    }
    if (Object.keys(handlers).indexOf(d.kind) !== -1) {
      out.push(handlers[d.kind](d))
    }
  })
  out.unshift("const PropTypes = require('prop-types')")
  return out.join('\n\n')
}
