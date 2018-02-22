var createGraph = require('ngraph.graph');
var pagerank = require('ngraph.pagerank');
var graph = createGraph();

/*
Teams
 */

var pickering = "Pickering";
var brooklin = "Brooklin";
var austinA = "Austin A";
var wilson = "Wilson";
var portPerryA = "Port Perry A";
var anderson = "Anderson";
var allSaints = "All Saints";
var ajaxB = "Ajax B";
var dwyerA = "Dwyer A";
var dwyerB = "Dwyer B";
var sinclair = "Sinclair";
var portPerryB = "Port Perry B";
var stMary = "St Mary";
var maxwellA = "Maxwell A";
var maxwellB = "Maxwell B";
var austinB = "Austin B";
var richardson = "Richardson";
var notreDame = "Notre Dame";
var msgrPereyma = "Msgr Pereyma";
var ajaxA = "Ajax A";


/*
Each time a group loses to another group,
add a link from them to the winner.
 */

/*
Pool A
 */
graph.addLink(ajaxB, pickering);
graph.addLink(brooklin, pickering);
graph.addLink(richardson, pickering);

graph.addLink(brooklin, ajaxB);
graph.addLink(richardson, ajaxB);

graph.addLink(richardson, brooklin);


/*
Pool B
 */
graph.addLink(dwyerA, wilson);
graph.addLink(stMary, wilson);
graph.addLink(msgrPereyma, wilson);

graph.addLink(stMary, dwyerA);
graph.addLink(msgrPereyma, dwyerA);

graph.addLink(msgrPereyma, stMary);

/*
Pool C
 */
graph.addLink(dwyerB, austinA);
graph.addLink(maxwellA, austinA);
graph.addLink(ajaxA, austinA);

graph.addLink(maxwellA, dwyerB);
graph.addLink(ajaxA, dwyerB);

graph.addLink(ajaxA, maxwellA);
/*
Pool D
 */
graph.addLink(sinclair, portPerryA);
graph.addLink(maxwellB, portPerryA);
graph.addLink(notreDame, portPerryA);

graph.addLink(maxwellB, sinclair);
graph.addLink(notreDame, sinclair);

graph.addLink(notreDame, maxwellB);

/*
Pool C
 */
graph.addLink(allSaints, anderson);
graph.addLink(portPerryB, anderson);
graph.addLink(austinB, anderson);

graph.addLink(portPerryB, allSaints);
graph.addLink(austinB, allSaints);

graph.addLink(austinB, portPerryB);


/*
Afternoon A
 */

graph.addLink(ajaxA, anderson);
graph.addLink(austinB, anderson);
graph.addLink(stMary, anderson);

graph.addLink(ajaxA, dwyerA);
graph.addLink(maxwellA, dwyerA);
graph.addLink(richardson, dwyerA);

graph.addLink(austinB, dwyerB);

graph.addLink(ajaxA, maxwellA);

graph.addLink(austinB, pickering);
graph.addLink(dwyerA, pickering);
graph.addLink(stMary, pickering);

graph.addLink(dwyerB, portPerryA);
graph.addLink(maxwellA, portPerryA);
graph.addLink(richardson, portPerryA);

graph.addLink(richardson, stMary);


/*
Pool B
 */

graph.addLink(brooklin, ajaxB);
graph.addLink(notreDame, ajaxB);

graph.addLink(maxwellB, allSaints);

graph.addLink(ajaxB, austinA);
graph.addLink(maxwellB, austinA);
graph.addLink(portPerryB, austinA);

graph.addLink(allSaints, msgrPereyma);
graph.addLink(brooklin, msgrPereyma);
graph.addLink(sinclair, msgrPereyma);

graph.addLink(portPerryB, notreDame);

graph.addLink(allSaints, portPerryB);

graph.addLink(maxwellB, sinclair);

graph.addLink(brooklin, wilson);
graph.addLink(sinclair, wilson);
graph.addLink(notreDame, wilson);

/*
Rank
 */
var rank = pagerank(graph);


/*
Get rank, export into array
 */

var ranks = [];

Object.keys(rank).forEach((teamName, index) => {
    var team = {
        rank: (rank[teamName] * 100).toPrecision(3),
        name: teamName
    }
    ranks.push(team);
})

ranks.sort((a, b) => {
    return b.rank - a.rank;
})
// console.dir(ranks);





function addResult(team1, score1, team2, score2) {
    var winner, loser, winnerScore, loserScore;

    if (score1 > score2) {
        winner = team1;
        winnerScore = score1;
        loser = team2;
        loserScore = score2;
    } else {
        winner = team2;
        winnerScore = score2;
        loser = team1;
        loserScore = score1;
    }

    var multiplier = (winnerScore / loserScore).toPrecision(1) + 1;

    for (var i = 0; i < multiplier; i++) {
        graph.addLink(loser, winner);
    }
}

