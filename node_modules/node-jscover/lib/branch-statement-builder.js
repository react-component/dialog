/**
 * build branch instrument
 * @author yiminghe@gmail.com
 */
var util = require('modulex-util');
/*jshint quotmark:false*/

/*
 function visit1_2_1(result) {
 _$jscoverage['/if.js'].branchData['2'][1].ranCondition(result);
 return result;
 }
 */
exports.buildBranchRecordingFunction = function (fileName, functionId, lineNo, conditionNo) {
    return {
        coverage:1,
        "type": "FunctionDeclaration",
        "id": {
            "type": "Identifier",
            "name": util.substitute("visit{id}_{lineNo}_{conditionNo}", {
                id: functionId,
                lineNo: lineNo,
                conditionNo: conditionNo
            })
        },
        "params": [
            {
                "type": "Identifier",
                "name": "result"
            }
        ],
        "defaults": [],
        "body": {
            "type": "BlockStatement",
            "body": [
                {
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "CallExpression",
                        "callee": {
                            "type": "MemberExpression",
                            "computed": false,
                            "object": {
                                "type": "MemberExpression",
                                "computed": true,
                                "object": {
                                    "type": "MemberExpression",
                                    "computed": true,
                                    "object": {
                                        "type": "MemberExpression",
                                        "computed": false,
                                        "object": {
                                            "type": "MemberExpression",
                                            "computed": true,
                                            "object": {
                                                "type": "Identifier",
                                                "name": "_$jscoverage"
                                            },
                                            "property": {
                                                "type": "Literal",
                                                "value": fileName
                                            }
                                        },
                                        "property": {
                                            "type": "Identifier",
                                            "name": "branchData"
                                        }
                                    },
                                    "property": {
                                        "type": "Literal",
                                        "value": lineNo + '',
                                        "raw": "'" + lineNo + "'"
                                    }
                                },
                                "property": {
                                    "type": "Literal",
                                    "value": conditionNo
                                }
                            },
                            "property": {
                                "type": "Identifier",
                                "name": "ranCondition"
                            }
                        },
                        "arguments": [
                            {
                                "type": "Identifier",
                                "name": "result"
                            }
                        ]
                    }
                },
                {
                    "type": "ReturnStatement",
                    "argument": {
                        "type": "Identifier",
                        "name": "result"
                    }
                }
            ]
        },
        "rest": null,
        "generator": false,
        "expression": false
    };
};

// _$jscoverage['/if.js'].branchData['2'][2].init(13, 7, 'x > 11111');
exports.buildLineAndConditionInitialisation = function (fileName, line, conditionId, position, source) {
    return {
        coverage:1,
        "type": "ExpressionStatement",
        "expression": {
            "type": "CallExpression",
            "callee": {
                "type": "MemberExpression",
                "computed": false,
                "object": {
                    "type": "MemberExpression",
                    "computed": true,
                    "object": {
                        "type": "MemberExpression",
                        "computed": true,
                        "object": {
                            "type": "MemberExpression",
                            "computed": false,
                            "object": {
                                "type": "MemberExpression",
                                "computed": true,
                                "object": {
                                    "type": "Identifier",
                                    "name": "_$jscoverage"
                                },
                                "property": {
                                    "type": "Literal",
                                    "value": fileName
                                }
                            },
                            "property": {
                                "type": "Identifier",
                                "name": "branchData"
                            }
                        },
                        "property": {
                            "type": "Literal",
                            "value": line + '',
                            "raw": "'" + line + "'"
                        }
                    },
                    "property": {
                        "type": "Literal",
                        "value": conditionId
                    }
                },
                "property": {
                    "type": "Identifier",
                    "name": "init"
                }
            },
            "arguments": [
                {
                    "type": "Literal",
                    "value": position
                },
                {
                    "type": "Literal",
                    "value": source.length
                },
                {
                    "type": "Literal",
                    "value": source
                }
            ]
        }
    };
};