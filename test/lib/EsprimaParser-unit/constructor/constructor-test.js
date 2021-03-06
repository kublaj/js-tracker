const proxyquire = require('proxyquire')

describe('constructor tests', () => {
  const context = {}

  it('should set context to given context with \'this\' points to context', () => {
    const esprimaParser = new EsprimaParser(context)

    expect(esprimaParser.context).to.be.equal(context)
    expect(esprimaParser.context.this).to.be.equal(context)
  })

  it('should set scriptUrl to null', () => {
    const esprimaParser = new EsprimaParser(context)

    expect(esprimaParser.scriptUrl).to.be.null
  })

  it('should set checkFlag to false', () => {
    const esprimaParser = new EsprimaParser(context)

    expect(esprimaParser.checkFlag).to.be.false
  })

  it('should set static imported modules properly', () => {
    /* import libs */
    const escodegen = require('escodegen')
    const arity = require('util-arity')
    /* import structures */
    const Callee = require(libDir + '/structures/Callee')
    const Collection = require(libDir + '/structures/Collection')

    /* import operators */
    const binaryOperators = require(libDir + '/operators/binaryOperators')
    const updateOperators = require(libDir + '/operators/updateOperators')
    /* for variables init */
    const checkerDispatcher = require(libDir + '/dispatchers/checkerDispatcher')

    const esprimaParser = new EsprimaParser(context)

    expect(esprimaParser.escodegen).to.be.equal(escodegen)
    expect(esprimaParser.arity).to.be.equal(arity)
    expect(esprimaParser.Callee).to.be.equal(Callee)
    expect(esprimaParser.Collection).to.be.equal(Collection)
    expect(esprimaParser.binaryOperators).to.be.equal(binaryOperators)
    expect(esprimaParser.updateOperators).to.be.equal(updateOperators)
    expect(esprimaParser.checkerDispatcher).to.be.equal(checkerDispatcher)
  })

  it('should set unaryOperators to the result from initUnaryOperators called with unaryOperators modules', () => {
    const unaryOperatorsStub = {}
    const EsprimaParserStub = proxyquire(libDir, {
      './operators/unaryOperators': unaryOperatorsStub
    })
    sandbox.stub(EsprimaParserStub.prototype, 'initUnaryOperators')
      .withArgs(unaryOperatorsStub)
        .returns('resultFromInitUnaryOperators')

    const esprimaParser = new EsprimaParserStub(context)

    expect(
      esprimaParser.initUnaryOperators
        .calledWithExactly(unaryOperatorsStub)
    ).to.be.true
    expect(esprimaParser.unaryOperators).to.be.equal('resultFromInitUnaryOperators')
  })

  it('should set logicalOperators to the result from initLogicalOperators', () => {
    sandbox.stub(EsprimaParser.prototype, 'initLogicalOperators')
      .returns('resultFromInitLogicalOperators')

    const esprimaParser = new EsprimaParser(context)

    expect(esprimaParser.logicalOperators).to.be.equal('resultFromInitLogicalOperators')
  })

  it('should set assignmentOperators to the result from initAssignmentOperators', () => {
    sandbox.stub(EsprimaParser.prototype, 'initAssignmentOperators')
      .returns('resultFromInitAssignmentOperators')

    const esprimaParser = new EsprimaParser(context)

    expect(esprimaParser.assignmentOperators).to.be.equal('resultFromInitAssignmentOperators')
  })

  it('should set collection to a new instance of Collection', () => {
    const CollectionSpy = sandbox.spy()
    const EsprimaParserStub = proxyquire(libDir, {
      './structures/Collection': CollectionSpy
    })
    const esprimaParser = new EsprimaParserStub(context)

    expect(CollectionSpy.calledOnce).to.be.true
    expect(CollectionSpy.calledWithNew()).to.be.true
    expect(CollectionSpy.calledWithExactly()).to.be.true
    expect(esprimaParser.collection).to.be.instanceof(CollectionSpy)
  })

  it('should set flowState to a new instance of FlowState', () => {
    const FlowStateSpy = sandbox.spy()
    const EsprimaParserStub = proxyquire(libDir, {
      './structures/FlowState': FlowStateSpy
    })
    const esprimaParser = new EsprimaParserStub(context)

    expect(FlowStateSpy.calledOnce).to.be.true
    expect(FlowStateSpy.calledWithNew()).to.be.true
    expect(FlowStateSpy.calledWithExactly()).to.be.true
    expect(esprimaParser.flowState).to.be.instanceof(FlowStateSpy)
  })

  it('should set closureStack to a new instance of ClosureStack init with context', () => {
    const ClosureStackSpy = sandbox.spy()
    const EsprimaParserStub = proxyquire(libDir, {
      './structures/ClosureStack': ClosureStackSpy
    })
    const esprimaParser = new EsprimaParserStub(context)

    expect(ClosureStackSpy.calledOnce).to.be.true
    expect(ClosureStackSpy.calledWithNew()).to.be.true
    expect(ClosureStackSpy.calledWithExactly(context)).to.be.true
    expect(esprimaParser.closureStack).to.be.instanceof(ClosureStackSpy)
  })
})
