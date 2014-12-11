/**
 * instrument branch condition
 * @author yiminghe@gmail.com
 */
var branchStatementBuilder = require('./branch-statement-builder');
var escodegen = require('escodegen');
var util = require('modulex-util');
var estraverse = require('estraverse');

var functionId = 1;

function removeChildFromParent(child, parent) {
    var body = parent.body;
    if (util.isArray(body)) {
        body.splice(body.indexOf(child), 1);
    }
}

function replaceChild(parent, child, newChild) {
    for (var c in parent) {
        if (parent.hasOwnProperty(c)) {
            if (parent[c] === child) {
                parent[c] = newChild;
            }
        }
    }
}

function getNodeOriginalSource(node) {
    var newNode = util.clone(node);
    estraverse.replace(newNode, {
        enter: function (n, parent) {
            // remove coverage statement
            if (n.coverage) {
                removeChildFromParent(n, parent);
                this.skip();
            }
        }
    });
    return escodegen.generate(newNode, {
        format: {
            indent: {
                style: '  '
            }
        }
    });
    //var source = escodegen.generate(newNode);
    //return source;
}

function BranchProcessor(fileName) {
    this.fileName = fileName;
    this.lineConditionMap = {};
    this.newNodes = [];
}

BranchProcessor.reset = function () {
    functionId = 1;
};

BranchProcessor.prototype = {
    buildBranchRecordingFunction: function (lineNo, conditionNo) {
        return branchStatementBuilder.buildBranchRecordingFunction(this.fileName,
            functionId++, lineNo, conditionNo);
    },

    buildLineAndConditionInitialisation: function (line, conditionId, position, source) {
        return branchStatementBuilder.buildLineAndConditionInitialisation(this.fileName, line,
            conditionId, position, source);
    },

    processNode: function (node, parent) {
        if (!node.loc) {
            return;
        }
        var children;
        var newNodes = this.newNodes;
        var parentType = parent.type;
        var lineConditionMap = this.lineConditionMap;
        var conditionId = 1;
        var line = node.loc.start.line;
        var conditions = lineConditionMap[line];
        if (conditions) {
            conditionId = conditions[conditions.length - 1] + 1;
        } else {
            conditions = [];
            lineConditionMap[line] = conditions;
        }
        conditions.push(conditionId);
        var functionNode = this.buildBranchRecordingFunction(line, conditionId);
        newNodes.push(functionNode);
        // bug var y = (x || function(){});
        // already augmented
        var source = getNodeOriginalSource(node);
        var conditionArrayDeclaration = this
            .buildLineAndConditionInitialisation(line, conditionId,
                node.loc.start.column + 1, source);
        newNodes.push(conditionArrayDeclaration);
        var functionCall = {
            type: 'CallExpression',
            callee: {
                type: 'Identifier',
                name: functionNode.id.name
            },
            'arguments': [node]
        };
        // WhileStatement IfStatement ConditionalExpression DoWhileStatement ForStatement
        if (node === parent.test) {
            parent.test = functionCall;
        } else if (parentType === 'ConditionalExpression') {
            // x = x>y?x||y:1;
            if (parent.alternate === node) {
                parent.alternate = functionCall;
            } else if (parent.consequent === node) {
                parent.consequent = functionCall;
            }
        }
        else if (parent.operator || util.inArray(parentType, ['ReturnStatement',
            'VariableDeclarator',
            'SwitchStatement',
            'MemberExpression',
            'ExpressionStatement',
            'Property'])
            ) {
            // a[x||y]
            // (x||[1,1])[1]
            replaceChild(parent, node, functionCall);
        } else if (parentType === 'ArrayExpression') {
            var elements = parent.elements;
            elements.forEach(function (e, i) {
                if (e === node) {
                    elements[i] = functionCall;
                }
            });
        } else if (parentType === 'SequenceExpression') {
            var expressions = parent.expressions;
            expressions.forEach(function (e, i) {
                if (e === node) {
                    expressions[i] = functionCall;
                }
            });
        } else if (parentType === 'CallExpression' || parentType === 'NewExpression') {
            var args = parent['arguments'];
            args.forEach(function (e, i) {
                if (e === node) {
                    args[i] = functionCall;
                }
            });
        } else if (parentType === 'ForStatement') {
            children = ['init', 'test', 'update'];
            children.forEach(function (c) {
                if (parent[c] === node) {
                    parent[c] = functionCall;
                }
            });
        } else if (parentType === 'ForInStatement') {
            children = ['left', 'right'];
            children.forEach(function (c) {
                if (parent[c] === node) {
                    parent[c] = functionCall;
                }
            });
        } else {
            throw new Error(util.substitute(['Could not insert wrapper for parent {parent}, node {node} ' +
                'file: {file}, line: {line} ',
                    'source: ' + escodegen.generate(node),
                    'ast: ' + JSON.stringify(node, null, 2)
            ].join('\n'), {
                parent: parentType,
                node: node.type,
                file: this.fileName,
                line: line
            }));
        }
    }
};

module.exports = BranchProcessor;