(function (jasmine) {
    var g = typeof window !== 'undefined' ? window : global;
    var DEFAULT_COV_OUT = 'N/A';

    function padding(content, width, align) {
        var left;
        var right;
        content += '';
        if (align === 'right') {
            left = parseInt((width - content.length), 10);
            right = 0;
        } else if (align === 'left') {
            right = parseInt((width - content.length), 10);
            left = 0;

        } else {
            left = parseInt((width - content.length) / 2, 10);
            right = width - content.length - left;
        }
        var paddingLeft = new Array(left + 1).join(' ');
        var paddingRight = new Array(right + 1).join(' ');
        return paddingLeft + content + paddingRight;
    }

    function output(arr, align) {
        console.log('|' +
            padding(arr[0], 50, align[0]) + '|' +
            padding(arr[1], 20, align[1]) + '|' +
            padding(arr[2], 20, align[2]) + '|' +
            padding(arr[3], 20, align[3]) +
            '|');
    }

    function outputTh(arr) {
        output(arr, ['center', 'center', 'center', 'center']);
    }

    function outputTr(arr) {
        if (arr[1] !== DEFAULT_COV_OUT) {
            arr[1] += '%';
        }
        if (arr[2] !== DEFAULT_COV_OUT) {
            arr[2] += '%';
        }
        if (arr[3] !== DEFAULT_COV_OUT) {
            arr[3] += '%';
        }
        output(arr, ['left', 'right', 'right', 'right']);
    }

    var isArray = Array.isArray || function (obj) {
        return Object.prototype.toString.call(obj) === '[object Array]';
    };

    function each(obj, fn) {
        var i = 0,
            myKeys, l;
        if (isArray(obj)) {
            l = obj.length;
            for (; i < l; i++) {
                if (fn(obj[i], i, obj) === false) {
                    break;
                }
            }
        } else {
            myKeys = keys(obj);
            l = myKeys.length;
            for (; i < l; i++) {
                if (fn(obj[myKeys[i]], myKeys[i], obj) === false) {
                    break;
                }
            }
        }
    }

    function keys(obj) {
        var ret = [];
        for (var key in obj) {
            ret.push(key);
        }
        return ret;
    }

    function printCoverageInfo() {
        var totals = {
            files: 0,
            statements: 0,
            executed: 0,
            branches: 0,
            branches_covered: 0,
            functions: 0,
            functions_covered: 0
        };
        var cc = window._$jscoverage;
        var file;
        var lineNumber;
        var files = [];
        for (file in cc) {
            files.push(file);
        }
        if (files.length === 0) {
            return;
        }

        var printInfo = [];

        for (var f = 0; f < files.length; f++) {
            file = files[f];
            var num_statements = 0;
            var num_executed = 0;
            var missing = [];
            var fileCC = cc[file].lineData;
            var length = fileCC.length;
            var currentConditionalEnd = 0;
            var conditionals = null;
            var percentageBranch = DEFAULT_COV_OUT;
            if (fileCC.conditionals) {
                conditionals = fileCC.conditionals;
            }
            for (lineNumber = 0; lineNumber < length; lineNumber++) {
                var n = fileCC[lineNumber];

                if (lineNumber === currentConditionalEnd) {
                    currentConditionalEnd = 0;
                }
                else if (currentConditionalEnd === 0 && conditionals && conditionals[lineNumber]) {
                    currentConditionalEnd = conditionals[lineNumber];
                }

                if (currentConditionalEnd !== 0) {
                    continue;
                }

                if (n === undefined || n === null) {
                    continue;
                }

                if (n === 0) {
                    missing.push(lineNumber);
                }
                else {
                    num_executed++;
                }
                num_statements++;
            }

            var percentage = ( num_statements === 0 ? DEFAULT_COV_OUT : parseInt(100 * num_executed / num_statements, 10) );

            var num_functions = 0;
            var num_executed_functions = 0;
            var fileFunctionCC = cc[file].functionData;
            if (fileFunctionCC) {
                num_functions += fileFunctionCC.length;
                for (var fnNumber = 0; fnNumber < fileFunctionCC.length; fnNumber++) {
                    var fnHits = fileFunctionCC[fnNumber];
                    if (fnHits !== undefined && fnHits !== null && fnHits > 0) {
                        num_executed_functions++;
                    }
                }
            }
            var percentageFn = ( num_functions === 0 ? DEFAULT_COV_OUT : parseInt(100 * num_executed_functions / num_functions, 10));

            var num_branches = 0;
            var num_executed_branches = 0;
            var fileBranchCC = cc[file].branchData;
            if (fileBranchCC) {
                for (lineNumber in fileBranchCC) {
                    var conditions = fileBranchCC[lineNumber];
                    if (conditions !== undefined && conditions !== null && conditions.length) {
                        for (var conditionIndex = 0; conditionIndex < conditions.length; conditionIndex++) {
                            var branchData = fileBranchCC[lineNumber][conditionIndex];
                            if (branchData === undefined || branchData === null) {
                                continue;
                            }
                            num_branches += 2;
                            num_executed_branches += branchData.pathsCovered();
                        }
                    }
                }
                percentageBranch = ( num_branches === 0 ? DEFAULT_COV_OUT : parseInt(100 * num_executed_branches / num_branches, 10));
            }

            totals.files++;
            totals.statements += num_statements;
            totals.executed += num_executed;
            totals.branches += num_branches;
            totals.branches_covered += num_executed_branches;
            totals.functions += num_functions;
            totals.functions_covered += num_executed_functions;

            printInfo.push({
                file: file,
                percentage: percentage,
                percentageFn: percentageFn,
                percentageBranch: percentageBranch
            });
        }

        console.log(new Array(116).join('-'));
        console.log('|' +
            padding('coverage info', 113, 'center') +
            '|');
        outputTh(['File', 'Coverage', 'Branch', 'Function']);
        outputTr(['Total: ' + totals.files, parseInt(totals.executed * 100 / totals.statements, 10),
            parseInt(totals.branches_covered * 100 / totals.branches, 10), parseInt(totals.functions_covered * 100 / totals.functions, 10)]);
        each(printInfo, function (info) {
            outputTr([info.file, info.percentage, info.percentageBranch, info.percentageFn]);
        });
        console.log(new Array(116).join('-'));
    }

    var JscoverReporter = function () {
    };

    JscoverReporter.prototype.reportRunnerResults = function (runner) {
        if (g._$jscoverage && g.jscoverage_serializeCoverageToJSON) {
            printCoverageInfo();
            if (g.opener && g.opener.document.getElementById('summaryTab')) {
                g.opener.document.getElementById('summaryTab').click();
                g.close();
            }
        }
    };

    jasmine.getEnv().addReporter(new JscoverReporter());
})(jasmine);