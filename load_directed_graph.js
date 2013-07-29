var fs = require('fs');
var lineReader = require('line-reader');


function notEmpty(str) {
  return !!str.length;
}

function toI(item) {
  // use of ~~ to convert to int
  return ~~item;
}

exports.showStats = function (graph) {
  console.log('grapth:', graph.G.length, graph.revG.length);
}

exports.loadGraphData = function (fileName, cb) {
  var G = [];
  var revG = [];
  var regSplit = /\s+/;

  lineReader.eachLine(fileName, function(line) {
    var arc = line.split(regSplit)
      .filter(notEmpty)
      .map(toI);

    if(G[arc[0]] === undefined) {
      G[arc[0]] = [];
    }
    G[arc[0]].push(arc[1]);

    if(revG[arc[1]] === undefined) {
      revG[arc[1]] = [];
    }
    revG[arc[1]].push(arc[0]);

  }).then(function () {
    cb({
      G: G,
      revG: revG
    });
  });

}

exports.assertFileExists = function(file) {
    var instr = file.toString();
    if(!fs.existsSync(instr)) {
        console.log("%s does not exist. Exiting.", instr);
        process.exit(1); // http://nodejs.org/api/process.html#process_process_exit_code
    }
    return instr;
};

