"use strict";
//thanks:https://github.com/nippur72/ifdef-loader#readme

var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
var IfBlock = (function () {
    function IfBlock(line_if, line_endif, elifs, line_else, inner_ifs) {
        if (elifs === void 0) { elifs = []; }
        if (line_else === void 0) { line_else = null; }
        if (inner_ifs === void 0) { inner_ifs = []; }
        this.line_if = line_if;
        this.line_endif = line_endif;
        this.elifs = elifs;
        this.line_else = line_else;
        this.inner_ifs = inner_ifs;
    }
    IfBlock.prototype.getIfRange = function () {
        var to = this.elifs.length > 0 ? this.elifs[0] : this.line_else != null ? this.line_else : this.line_endif;
        return { from: this.line_if, to: to };
    };
    IfBlock.prototype.getElifRange = function (index) {
        if (this.elifs.length > index) {
            var from = this.elifs[index];
            var to = this.elifs.length > index + 1 ? this.elifs[index + 1] : this.line_else != null ? this.line_else : this.line_endif;
            return { from: from, to: to };
        }
        else {
            throw "Invalid elif index '" + index + "', there are only " + this.elifs.length + " elifs";
        }
    };
    IfBlock.prototype.getElseRange = function () {
        if (this.line_else != null) {
            return { from: this.line_else, to: this.line_endif };
        }
        else {
            throw 'Cannot use elseRange when elseIx is null';
        }
    };
    return IfBlock;
}());
var IfType;
(function (IfType) {
    IfType[IfType["If"] = 0] = "If";
    IfType[IfType["Elif"] = 1] = "Elif";
})(IfType || (IfType = {}));
var useTripleSlash;
var fillCharacter;
var uncommentPrefix;
function parse(source,defs, verbose, tripleSlash, filePath, fillWithBlanks, uncommentPrefixString) {
    if (tripleSlash === undefined)
        tripleSlash = true;
    useTripleSlash = tripleSlash;
    if (fillWithBlanks === undefined)
        fillWithBlanks = false;
    fillCharacter = fillWithBlanks ? ' ' : '/';
    uncommentPrefix = uncommentPrefixString;
    if (source.indexOf('#if') === -1)
        return source;
    var lines = source.split(/\r\n|\n|\r/);
    var ifBlocks = find_if_blocks(lines);
    for (var _i = 0, ifBlocks_1 = ifBlocks; _i < ifBlocks_1.length; _i++) {
        var ifBlock = ifBlocks_1[_i];
        apply_if(lines, ifBlock, defs, verbose, filePath);
    }
    return lines.join('\n');
}
export default  parse;
export function find_if_blocks(lines) {
    var blocks = [];
    for (var i = 0; i < lines.length; i++) {
        if (match_if(lines[i])) {
            var ifBlock = parse_if_block(lines, i);
            blocks.push(ifBlock);
            i = ifBlock.line_endif;
        }
    }
    return blocks;
}
export function parse_if_block(lines, ifBlockStart) {
    var foundElifs = [];
    var foundElse = null;
    var foundEnd;
    var innerIfs = [];
    for (var i = ifBlockStart + 1; i < lines.length; i++) {
        var curLine = lines[i];
        var innerIfMatch = match_if(curLine);
        if (innerIfMatch) {
            var innerIf = parse_if_block(lines, i);
            innerIfs.push(innerIf);
            i = innerIf.line_endif;
            continue;
        }
        var elifMatch = match_if(curLine, IfType.Elif);
        if (elifMatch) {
            foundElifs.push(i);
            continue;
        }
        var elseMatch = match_else(curLine);
        if (elseMatch) {
            foundElse = i;
            continue;
        }
        var endMatch = match_endif(curLine);
        if (endMatch) {
            foundEnd = i;
            break;
        }
    }
    if (foundEnd === undefined) {
        throw "#if without #endif on line " + (ifBlockStart + 1);
    }
    return new IfBlock(ifBlockStart, foundEnd, foundElifs, foundElse, innerIfs);
}
var ifRegex = function () { return useTripleSlash ? /^[\s]*\/\/\/([\s]*)#(if|elif)([\s\S]+)$/g : /^[\s]*\/\/([\s]*)#(if|elif)([\s\S]+)$/g; };
export function match_if(line, type) {
    if (type === void 0) { type = IfType.If; }
    var re = ifRegex();
    var match = re.exec(line);
    return match !== null && ((type == IfType.If && match[2] == "if") || (type == IfType.Elif && match[2] == "elif"));
}
export function parse_if(line) {
    var re = ifRegex();
    var match = re.exec(line);
    if (match) {
        return match[3].trim();
    }
    else {
        throw "Could not parse #if: '" + line + "'";
    }
}
export function match_endif(line) {
    var re = useTripleSlash ? /^[\s]*\/\/\/([\s]*)#(endif)[\s]*$/g : /^[\s]*\/\/([\s]*)#(endif)[\s]*$/g;
    var match = re.exec(line);
    return Boolean(match);
}
export function match_else(line) {
    var re = useTripleSlash ? /^[\s]*\/\/\/([\s]*)#(else)[\s]*$/g : /^[\s]*\/\/([\s]*)#(else)[\s]*$/g;
    var match = re.exec(line);
    return Boolean(match);
}
export function apply_if(lines, ifBlock, defs, verbose, filePath) {
    if (verbose === void 0) { verbose = false; }
    var includeRange = null;
    var ifCond = parse_if(lines[ifBlock.line_if]);
    var ifRes = evaluate(ifCond, defs);
    var log = function (condition, outcome) {
        if (verbose) {
            console.log('-----')

            console.log(ifCond)
            console.log("#if block lines [" + (ifBlock.line_if + 1) + "-" + (ifBlock.line_endif + 1) + "]: Condition '" + condition + "' is " + (outcome ? 'TRUE' : 'FALSE') + ". " + (includeRange != null ? "Including lines [" + (includeRange.from + 1) + "-" + (includeRange.to + 1) + "]" : 'Excluding everything') + " (" + filePath + ")");
            let blockcontent =lines.slice(ifBlock['line_if'],ifBlock['line_endif']+1)
            blockcontent = blockcontent.map(function(item,index,array){
                return  (ifBlock['line_if']+1)+index +item;
            })
            console.log("ifBlockContent:",blockcontent)
            console.log('-----')
        }
    };
    if (ifRes) {
        includeRange = ifBlock.getIfRange();
        log(ifCond, true);
    }
    else {
        for (var elifIx = 0; elifIx < ifBlock.elifs.length; elifIx++) {
            var elifLine = lines[ifBlock.elifs[elifIx]];
            var elifCond = parse_if(elifLine);
            var elifRes = evaluate(elifCond, defs);
            if (elifRes) {
                includeRange = ifBlock.getElifRange(elifIx);
                log(elifCond, true);
                break;
            }
        }
        if (includeRange == null) {
            if (ifBlock.line_else != null) {
                includeRange = ifBlock.getElseRange();
            }
            log(ifCond, false);
        }
    }
    if (includeRange != null) {
        blank_code(lines, ifBlock.line_if, includeRange.from);
        blank_code(lines, includeRange.to, ifBlock.line_endif);
        reveal_code(lines, includeRange.from, includeRange.to);
    }
    else {
        blank_code(lines, ifBlock.line_if, ifBlock.line_endif);
    }
    for (var _i = 0, _a = ifBlock.inner_ifs; _i < _a.length; _i++) {
        var innerIf = _a[_i];
        if (includeRange != null && innerIf.line_if >= includeRange.from && innerIf.line_if <= includeRange.to) {
            apply_if(lines, innerIf, defs, verbose);
        }
    }
}
export function evaluate(condition, defs) {
    var code = "return (" + condition + ") ? true : false;";
    var args = Object.keys(defs);
    var result;
    try {
        var f = new (Function.bind.apply(Function, __spreadArray(__spreadArray([void 0], args), [code])))();
        result = f.apply(void 0, args.map(function (k) { return defs[k]; }));
    }
    catch (error) {
        throw "error evaluation #if condition(" + condition + "): " + error;
    }
    return result;
}
export function blank_code(lines, start, end) {
    for (var t = start; t <= end; t++) {
        var len = lines[t].length;
        var lastChar = lines[t].charAt(len - 1);
        var windowsTermination = lastChar === '\r';
        if (len === 0) {
            lines[t] = '';
        }
        else if (len === 1) {
            lines[t] = windowsTermination ? '\r' : ' ';
        }
        else if (len === 2) {
            lines[t] = windowsTermination ? ' \r' : fillCharacter.repeat(2);
        }
        else {
            lines[t] = windowsTermination ? fillCharacter.repeat(len - 1) + '\r' : fillCharacter.repeat(len);
        }
    }
}
export function reveal_code(lines, start, end) {
    if (uncommentPrefix == undefined)
        return;
    var regex = new RegExp("^(?<before>\\s*" + uncommentPrefix + ")(?<line>.*)$");
    for (var t = start; t <= end; t++) {
        var r = regex.exec(lines[t]);
        if (r !== null && r.groups !== undefined) {
            lines[t] = " ".repeat(r.groups.before.length) + r.groups.line;
        }
    }
}
