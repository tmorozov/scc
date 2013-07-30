var S;
var t;

function dfsFirst(rg, node_i) {
	var stack = [];
	stack.push(node_i);
	rg[node_i]['passed'] = true;

	while(stack.length) {
		var i = stack.pop();
		stack.push(i);
		var tmp = rg[i];

		var child_i = false;
		for(var j= tmp.arcs.length-1; j>=0; j--) {
			var arc_i = tmp.arcs[j];
			if (!rg[arc_i].passed) {
				child_i = arc_i;
				break;
			}
		}

		if (child_i) {
			stack.push(child_i);
			rg[child_i]['passed'] = true;
		} else {
			stack.pop();
			t++;
			tmp['ft'] = t;
			tmp['leader'] = S;
		}
	}
}


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

	var ft = [];
	rg.forEach(function (item, index) {
		ft[item.ft] = index;
	});

	return ft;
};

exports.calcSCC = function (g, order) {
	var n = g.length -1;
	t = 0;
	S = null;

	var scc = [];

	for(var i=n; i>=1; i--) {
		var tmp_i = order[i];
		if(!g[tmp_i].passed) {
			S = tmp_i;
			dfsFirst(g, tmp_i);
		}
		scc[i] = 0;
	}

	// collect & sort
	g.forEach(function (item) {
		var leader = item.leader;
		scc[leader] = 1+scc[leader];
	});

	scc.sort(function (a, b) {
		return b - a;
	});

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
