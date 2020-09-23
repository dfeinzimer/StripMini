require('colors');                                    // https://www.npmjs.com/package/colors
const decomment = require('decomment');               // https://www.npmjs.com/package/decomment
const fs = require('fs');
const compressor = require('node-minify');            // https://www.npmjs.com/package/node-minify
const cleanCSS = require('@node-minify/clean-css');   // https://www.npmjs.com/package/@node-minify/clean-css
const minify = require('@node-minify/core');          // https://www.npmjs.com/package/@node-minify/core

var code = "";

if (process.argv.length < 5) { return console.error("Improper usage.".red, "Syntax: node stripmini.js <js||css> <inputFile> <outputFile>") }

const inputType = process.argv[2];
const inputFile = process.argv[3];
const outputFile = process.argv[4];
const byProductFile = "byproduct";

if (inputType != "js" && inputType != "css") { return console.error("Input filetype of js or css expected".red); }

if (inputType == "js") {
    fs.readFile(inputFile, 'utf8', function (err,data) {
      if (err) { return console.error(err); }
      console.log("Stripping comments and minifying", inputFile);
      code = data;
      const decommentedCode = decomment(code);
      fs.writeFile(byProductFile, decommentedCode, (err) => {
          if (err) throw err;
          compressor.minify({
            compressor: 'gcc',
            input: byProductFile,
            output: outputFile,
            callback: function(err, min) {
              if (err) { return console.error(err); }
              fs.unlinkSync(byProductFile);
              console.log("Success!".green);
            }
          });
        });
    });
} else if (inputType == "css") {
    console.log("Compressing css");
    minify({
        compressor: cleanCSS,
        input: inputFile,
        output: outputFile,
        callback: function(err, min) {}
    });
}

