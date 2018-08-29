# graphql2props

Generate react proptypes from graphql schema

## installation

```
npm i graphql2props
```

## usage

### in code

```js
import graphql2props from 'graphql2props'
import { readFileSync } from 'fs'

const code = graphql2props(readFileSync('schema.graphql').toString())

```

### in cli

```sh
npx graphql2props schema.graphql > props.js
```

You might have to tune the output a bit (custom scalars aren't supported, for example.) but you can use the pros like this:

```js
import React from 'react'
import { Type1, Type2 } from './props'

const MyThing = ({ propA, propB }) => (<div>COOL</div>)

MyThing.propTypes = {
  propA: Type1,
  propB: Type2
}

```