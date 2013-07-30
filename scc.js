var S;
var t;

function dfsFirst(rg, node_i) {
	var stack = [];
	stack.push(node_i);

	while(stack.length) {
		var i = stack.pop();
		stack.push(i);
		var tmp = rg[i];

		if(tmp.passed) {
			stack.pop();
			if(!tmp.ft) {
				t++;
				tmp['ft'] = t;
				tmp['leader'] = S;
			}
			continue;
		}

		tmp['passed'] = true;

		var hasChilds = false;
		for(var j=tmp.arcs.length-1; j>=0; j--){
			var arc_i = tmp.arcs[j];
			if(!rg[arc_i].passed) {
				stack.push(arc_i);
				hasChilds = true;
			}
		}

		if(!hasChilds) {
			stack.pop();

			t++;
			tmp['ft'] = t;
			tmp['leader'] = S;
		}

// console.log(stack);
	}
}


// function dfsFirst(rg, node_i) {
// 	var stack = [];
// 	stack.push(node_i);
// 	rg[node_i]['stacked'] = true;

// 	while(stack.length) {
// 		var i = stack.pop();
// 		var tmp = rg[i];
// 		if (tmp.passed) {
// 			t++;
// 			tmp['ft'] = t;
// 		} else {
// 			tmp['passed'] = true;
// 			tmp['leader'] = S;
// 			stack.push(i);
// 		}

// 		for(var j=tmp.arcs.length-1; j>=0; j--){
// 			var arc_i = tmp.arcs[j];
// 			if(!rg[arc_i].passed && !rg[arc_i].stacked) {
// 				stack.push(arc_i);
// 				rg[arc_i]['stacked'] = true;
// 			}
// 		}
// console.log(stack);
// 	}
// }

// // recursive approach:
// function dfsFirst(rg, i) {
// 	rg[i]['passed'] = true;
// 	rg[i]['leader'] = S;

// 	rg[i].arcs.forEach(function (j) {
// 		if(!rg[j].passed) {
// 			dfsFirst(rg, j);
// 		}
// 	});
// 	t++;

// 	rg[i]['ft'] = t;
// }

exports.calcFinishTime = function (rg) {
	var n = rg.length -1;
	t = 0;
	S = null;

	for(var i=n; i>=1; i--) {
		if(!rg[i].passed) {
			S = i;
			dfsFirst(rg, i);
		}
	}

//console.log('1st dfs passed');

	var ft = [];
	rg.forEach(function (item, index) {
		ft[item.ft] = index;
	});

//console.log('ft created');
	return ft;
};

exports.calcSCC = function (g, order) {
	var n = g.length -1;
	t = 0;
	S = null;

	for(var i=n; i>=1; i--) {
		var tmp_i = order[i];
		if(!g[tmp_i].passed) {
			S = tmp_i;
			dfsFirst(g, tmp_i);
		}
	}
//console.log('2nd dfs passed');
	// collect & sort
	var scc = [];
	g.forEach(function (item) {
		var leader = item.leader;
		if(!leader) {
			console.log('invalid leader');
		}
		scc[leader] = scc[leader] ? scc[leader]+1 : 1;
	});
//console.log('scc colected');
	scc.sort(function (a, b) {
		return a < b;
	});
//console.log('scc sorted');
	return scc;
};

exports.showStats = function (scc, depth) {
	var tmp = [];
	for(var i=0; i<depth; i++) {
		tmp[i] = ~~scc[i];
	}
	console.log('scc', scc.filter(function(item){ return !!item;}).length);
	console.log(tmp.join(','));
};
