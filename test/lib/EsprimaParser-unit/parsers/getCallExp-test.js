describe('getCallExp tests', () => {
  let callExpression
  // stub results
  const exp = {
    caller: {caller: 'caller'},
    callee: {callee: 'callee'}
  }
  const info = {info: 'info'}
  const calleeArguments = ['arg1', 'arg2']

  beforeEach(() => {
    callExpression = createAstNode('CallExpression', {
      callee: createAstNode('Expression'),
      arguments: [
        createAstNode('Expression'),
        createAstNode('Expression')
      ]
    })
    exp.callee.addArguments = sandbox.spy()
    delete exp.info

    sandbox.stub(esprimaParser, 'parseCallee').returns(exp)
    sandbox.stub(esprimaParser, 'parseArguments').returns(calleeArguments)
    sandbox.stub(esprimaParser, 'getExpInfo').returns(info)
  })

  it('should call parseCallee with callExpression callee', () => {
    esprimaParser.getCallExp(callExpression)

    expect(
      esprimaParser.parseCallee
        .calledWithExactly(callExpression.callee)
    ).to.be.true
  })

  it('should call parseArguments with arguments', () => {
    esprimaParser.getCallExp(callExpression)

    expect(
      esprimaParser.parseArguments
        .calledWithExactly(callExpression.arguments)
    ).to.be.true
  })

  it('should call addArguments of exp.callee (from parseCallee) with calleeArguments (from parseArguments)', () => {
    esprimaParser.getCallExp(callExpression)

    expect(
      exp.callee.addArguments
        .calledWithExactly(calleeArguments)
    ).to.be.true
  })

  it('should return exp (from parseCallee)', () => {
    const result = esprimaParser.getCallExp(callExpression)

    expect(result).to.be.equal(exp)
  })
})
