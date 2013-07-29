#!/usr/bin/env node

var program = require('commander');
var fdgraph = require('./load_directed_graph');

//var INPUT_FILE_DEFAULT = "./samples/kargerMinCut.txt";
var INPUT_FILE_DEFAULT = "./samples/SCC.txt";

function clone(fn) {
    // Workaround for commander.js issue.
    // http://stackoverflow.com/a/6772648
    return fn.bind({});
};

function onGraph(graph) {
	fdgraph.showStats(graph);
}

if(require.main == module) {
  program
    .option('-f, --file <file>', 'Path to file with data', clone(fdgraph.assertFileExists), INPUT_FILE_DEFAULT)
    .parse(process.argv);

  var graph = fdgraph.loadGraphData(program.file, onGraph);
  // fdgraph.showStats(graph);
} else {
//  exports.checkHtmlFile = countInversions;
}
