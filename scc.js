var S;
var t;

function dfsFirst(rg, i) {
	rg[i]['passed'] = true;
	rg[i]['leader'] = S;

	rg[i].arcs.forEach(function (j) {
		if(!rg[j].passed) {
			dfsFirst(rg, j);
		}
	});
	t++;

	rg[i]['ft'] = t;
}

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

	for(var i=n; i>=1; i--) {
		var tmp_i = order[i];
		if(!g[tmp_i].passed) {
			S = tmp_i;
			dfsFirst(g, tmp_i);
		}
	}

	// top 5
	var scc = [];
	g.forEach(function (item) {
		var leader = item.leader;
		scc[leader] = scc[leader] ? scc[leader]+1 : 1;
	});

	scc.sort(function (a, b) {
		return a < b;
	});

console.log(g);
console.log(scc);

	return scc;
};