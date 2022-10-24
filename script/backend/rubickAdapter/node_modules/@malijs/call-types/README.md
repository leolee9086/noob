<a name="module_@malijs/call-types"></a>

### @malijs/call-types
**Example**  
```js
const CallType = require('@malijs/call-types')
console.log(CallType.DUPLEX)
```
**Example** *(Within Mali call handler)*  
```js
if(ctx.type === CallType.UNARY) {
  console.log('Unary call')
}
```

* [@malijs/call-types](#module_@malijs/call-types)
    * [.UNARY](#module_@malijs/call-types.UNARY)
    * [.REQUEST_STREAM](#module_@malijs/call-types.REQUEST_STREAM)
    * [.RESPONSE_STREAM](#module_@malijs/call-types.RESPONSE_STREAM)
    * [.DUPLEX](#module_@malijs/call-types.DUPLEX)

<a name="module_@malijs/call-types.UNARY"></a>

#### @malijs/call-types.UNARY
Unary call

**Kind**: static property of [<code>@malijs/call-types</code>](#module_@malijs/call-types)  
<a name="module_@malijs/call-types.REQUEST_STREAM"></a>

#### @malijs/call-types.REQUEST\_STREAM
Request is a stream

**Kind**: static property of [<code>@malijs/call-types</code>](#module_@malijs/call-types)  
<a name="module_@malijs/call-types.RESPONSE_STREAM"></a>

#### @malijs/call-types.RESPONSE\_STREAM
Response is a stream

**Kind**: static property of [<code>@malijs/call-types</code>](#module_@malijs/call-types)  
<a name="module_@malijs/call-types.DUPLEX"></a>

#### @malijs/call-types.DUPLEX
Duplex call where both request and response are streams

**Kind**: static property of [<code>@malijs/call-types</code>](#module_@malijs/call-types)  
