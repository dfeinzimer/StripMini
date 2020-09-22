require('colors');                          // https://www.npmjs.com/package/colors
const decomment = require('decomment');     // https://www.npmjs.com/package/decomment
const fs = require('fs');
const compressor = require('node-minify');  // https://www.npmjs.com/package/node-minify

var code = "";

if (process.argv.length < 4) { return console.error("Improper usage.".red, "Syntax: node stripmini.js", "<inputFile> <outputFile>") }

const inputFile = process.argv[2];
const outputFile = process.argv[3];

fs.readFile(inputFile, 'utf8', function (err,data) {
    if (err) { return console.error(err); }
    console.log("Stripping comments and minifying", inputFile);
    code = data;
    const decommentedCode = decomment(code);
    fs.writeFile('sampleOutput.js', decommentedCode, (err) => {
        if (err) throw err;
        compressor.minify({
          compressor: 'gcc',
          input: 'sampleOutput.js',
          output: outputFile,
          callback: function(err, min) {
            if (err) { return console.error(err); }
            console.log("Success!".green);
          }
        });
      });
  });