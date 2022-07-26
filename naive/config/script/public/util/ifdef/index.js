import parse from "./preprocessor.js";
const ifdefParser = class {
  constructor(options) {
    this.options = options;
  }
  Parser(source, filePath, options) {
    let {
      defs,
      verbose,
      tripleSlash,
      fillWithBlanks,
      uncommentPrefixString,
    } = this.options;
    if (options) {
      defs= options.defs
      verbose= options.verbose
      tripleSlash= options.tripleSlash
      fillWithBlanks= options.fillWithBlanks
      uncommentPrefixString= options.uncommentPrefixString
    } 
    
    return parse(
      source,
      defs,
      verbose,
      tripleSlash,
      filePath,
      fillWithBlanks,
      uncommentPrefixString
    );
  }
  async parse(filePath,options) {
    let res = await fetch(filePath);
    let content = await res.text();
    return this.Parser(content,filePath,options);
  }
  async run(filePath) {
    let res = await this.parse(filePath);
    try {
      return new Function(res);
    } catch (e) {
      console.error({ error: e, file: filePath });
    }
  }
  async Babelimport(filePath) {
    let input = await this.parse(filePath);
    if (!window.Babel) {
      const babel = await this.run(
        `${naive.根目录}/script/public/util/ifdef/babel.min.js`
      );
      babel();
    }
    try {
      const AsyncFunction = Object.getPrototypeOf(
        async function () {}
      ).constructor;
      let func = new AsyncFunction(
        Babel.transform(input, { presets: ["es2015"] }).code
      );
      func();
      return func;
    } catch (e) {
      console.error({ error: e, file: filePath });
    }
  }
  async DOMload(filePath, module, attributes) {
    let content = await this.parse(filePath);
    let script = document.createElement("script");
    script.innerHTML = content;
    if (module) {
      script.setAttribute("type", "module");
    }
    for (prop in attributes) {
      script.setAttribute(prop, attributes[prop]);
    }
    document.head.appendChild(script);
    return script;
  }
};
export { ifdefParser };
module.exports = ifdefParser;
