/**
 * node version of jscover
 * @author yiminghe@gmail.com
 */
var esprima = require('esprima');
var estraverse = require('estraverse');
var escodegen = require('escodegen');
var NodeProcessor = require('./node-processor');
var BranchProcessor = require('./branch-processor');
var fs = require('fs');
var path = require('path');
var substitute = require('modulex-util').substitute;
var header = fs.readFileSync(path.join(__dirname, './resource/header.js'), {
    encoding: 'utf-8'
});
//header = '';
var initLine = '  _$jscoverage[\'{fileName}\'].lineData[{line}] = 0;';
// Function Coverage (HA-CA)
var initFunction = [ '  _$jscoverage[\'{fileName}\'].functionData[{num}] = 0;',
    '  _$jscoverage[\'{fileName}\'].functionData.index[{num}] = [\'{functionName}\',{line},{column}];'].join('\n');
/*jshint quotmark:false, loopfunc:true*/
var initBranchLine = "  _$jscoverage['{fileName}'].branchData['{line}'] = [];";
var initBranchCondition = "  _$jscoverage['{fileName}'].branchData['{line}'][{condition}] = new BranchData();";

function isBoolean(node, parent) {
    switch (node.operator) {
        case '===':
        case '==':
        case '!==':
        case '!=':
        case '!':
        case '>':
        case '>=':
        case '<':
        case '<=':
        case '||':
        case '&&':
            return true;
    }
    // switch(x){case 1:}
    if (parent && parent.test && parent.type !== 'SwitchCase') {
        return parent.test === node;
    }
    return false;
}

function escapeFileName(fileName) {
    return fileName.replace(/\\/g, '\\\\').replace(/'/g, /\\'/);
}

function getJsLineInitialization(fileName, validLines) {
    fileName = escapeFileName(fileName);
    var sb = [substitute('if (! _$jscoverage[\'{fileName}\']) {', {
        fileName: fileName
    })];
    sb.push(substitute('  _$jscoverage[\'{fileName}\'] = {};', {
        fileName: fileName
    }));
    sb.push(substitute('  _$jscoverage[\'{fileName}\'].lineData = [];', {
        fileName: fileName
    }));
    for (var line in validLines) {
        if (validLines.hasOwnProperty(line)) {
            sb.push(substitute(initLine, {
                fileName: fileName,
                line: line
            }));
        }
    }
    sb.push('}');
    return sb.join('\n');
}

function getJsFunctionInitialization(fileName, functionNames) {
    fileName = escapeFileName(fileName);
    var sb = [substitute('if (! _$jscoverage[\'{fileName}\'].functionData) {', {
        fileName: fileName
    })];
    sb.push(substitute(['  _$jscoverage[\'{fileName}\'].functionData = [];' ,
        '  _$jscoverage[\'{fileName}\'].functionData.index = [];'].join('\n'), {
        fileName: fileName
    }));

    for (var i = 0; i < functionNames.length; ++i) {
        sb.push(substitute(initFunction, {
            fileName: fileName,
            num: i,
            line: functionNames[i][1],
            column: functionNames[i][2],
            functionName: functionNames[i][0].replace(/'/g, "\\'")
        }));
    }
    sb.push('}');
    return sb.join('\n');
}

function getJsBranchInitialization(fileName, lineConditionMap) {
    fileName = escapeFileName(fileName);
    var sb = [substitute('if (! _$jscoverage[\'{fileName}\'].branchData) {', {
        fileName: fileName
    })];
    sb.push(substitute('  _$jscoverage[\'{fileName}\'].branchData = {};', {
        fileName: fileName
    }));

    for (var line in lineConditionMap) {
        if (lineConditionMap.hasOwnProperty(line)) {
            sb.push(substitute(initBranchLine, {
                fileName: fileName,
                line: line
            }));
            if (lineConditionMap[line]) {
                lineConditionMap[line].forEach(function (condition) {
                    sb.push(substitute(initBranchCondition, {
                        fileName: fileName,
                        line: line,
                        condition: condition
                    }));
                });
            }
        }
    }
    sb.push('}');
    return sb.join('\n');
}

function instrument(code, fileName, option) {
    option = option || {};
    var ast;

    try {
        ast = esprima.parse(code, {
            attachComment: true,
            loc: true
        });
    } catch (e) {
        console.log('parse error at file: ' + fileName);
        throw e;
    }

    var nodeProcess = new NodeProcessor(fileName);

    estraverse.traverse(ast, {
        enter: function (node, parent) {
            if (node.coverage) {
                this.skip();
                return;
            }
            if (parent) {
                nodeProcess.processNode(node, parent, this);
            }
        }
    });

    var branchProcess = new BranchProcessor(fileName, ast);

    estraverse.traverse(ast, {
        enter: function (node, parent) {
            if (node.coverage) {
                this.skip();
                return;
            }
            if (parent && isBoolean(node, parent)) {
                branchProcess.processNode(node, parent, this);
            }
        }
    });

    branchProcess.newNodes.forEach(function (n) {
        ast.body.unshift(n);
    });

    var jsInitializer = [getJsLineInitialization(fileName, nodeProcess.validLines)];
    jsInitializer.push(getJsFunctionInitialization(fileName, nodeProcess.functionNames));
    jsInitializer.push(getJsBranchInitialization(fileName, branchProcess.lineConditionMap));

    jsInitializer = jsInitializer.join('\n');

    var myHeader = header;

    if (option.excludeInitializer) {
        jsInitializer = '';
    }

    if (option.excludeHeader) {
        myHeader = '';
    }

    var out = [];
    if (myHeader) {
        out.push(myHeader);
    }
    if (jsInitializer) {
        out.push(jsInitializer);
    }
    // console.log(JSON.stringify(ast,null,2));
    out.push(escodegen.generate(ast, {
        format: {
            indent: {
                style: '  '
            }
        }
    }));
    return out.join('\n');
}

exports.instrument = instrument;
exports.reset = function () {
    BranchProcessor.reset();
};