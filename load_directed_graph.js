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
  console.log('grapth:', graph.G.length, graph.R.length);
  console.log(graph);
}

exports.loadGraphData = function (fileName, cb) {
  var G = [];
  var R = []; //reverse graph

  var regSplit = /\s+/;

  lineReader.eachLine(fileName, function(line) {
    var arc = line.split(regSplit)
      .filter(notEmpty)
      .map(toI);

    if(arc.length !== 2) {
      console.log('invalid arc', arc);
      return;
    }


    if(G[arc[0]] === undefined) {
      G[arc[0]] = {
        arcs: []
      };
    }
    if(G[arc[1]] === undefined) {
      G[arc[1]] = {
        arcs: []
      };
    }
    if(R[arc[0]] === undefined) {
      R[arc[0]] = {
        arcs: []
      };
    }
    if(R[arc[1]] === undefined) {
      R[arc[1]] = {
        arcs: []
      };
    }

    G[arc[0]].arcs.push(arc[1]);
    R[arc[1]].arcs.push(arc[0]);

  }).then(function () {
    cb({
      G: G,
      R: R
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
