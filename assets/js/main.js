var svg = d3.select("svg"),
    width = +svg.attr("width"),
    height = +svg.attr("height");
var r = 15;
var color = d3.scaleOrdinal(d3.schemeCategory10);
var colorAptitud = ["#31a354", "#addd8e", "#f7fcb9"];
var colorLink = d3.scaleOrdinal(d3.schemeCategory20);
var seleccion = "sideBySide"; // radioAgricola || radialDepartamento || sideBySide

var simulation = d3.forceSimulation()
    .force("link", d3.forceLink().id(function (d) { return d.departamento; }).strength(0.01))
    .force("charge", d3.forceManyBody().strength(function (d) {
        return (d.group == "Departamento") ? 10 : 100;
    }))
    .force('x', d3.forceX().x(function (d) {
        if (d.group == "Departamento") {
            console.log("d.group", d.group, " depto");
            return width / 3;
        } else {
            console.log("d.group", d.group, "NO depto");
            return 2 * width / 3;
        }
        return xScale(d.value);
    }))
    .force('y', d3.forceY().y(function (d) {
        return height / 2;
    }));


var simulation = d3.forceSimulation()
    .force('x', d3.forceX().x(function (d) {
        return (d.group == "Departamento") ? -width / 4 : width / 4;
    }))
    .force('y', d3.forceY().y(0).strength(0.03))
    .force("link", d3.forceLink().id(function (d) { return d.id; }).strength(-0.001))
    .force("charge", d3.forceManyBody().strength(function (d) {
        // return (d.group == "Departamento") ? -100 : -100;
        return -30;
    }))
    .force("collide", d3.forceCollide(2 * r));

var simulationRadDepto = d3.forceSimulation()
    .force("r", d3.forceRadial(function (d) {
        return (d.group == "Departamento") ? (width / 2) - r : 0;
    }))
    .force("link", d3.forceLink().id(function (d) { return d.id; }).strength(0.005))
    .force("charge", d3.forceManyBody().strength(function (d) {
        return (d.group == "Departamento") ? -80 : 1;
    }))
    .force("collide", d3.forceCollide(r + 1));

var simulationRadAgrigola = d3.forceSimulation()
    .force("r", d3.forceRadial(function (d) {
        return (d.group != "Departamento") ? (width / 2) - r : 0;
    }))
    .force("link", d3.forceLink().id(function (d) { return d.id; }).strength(0.005))
    .force("charge", d3.forceManyBody().strength(function (d) {
        return (d.group != "Departamento") ? -80 : 1;
    }))
    .force("collide", d3.forceCollide(r + 1));

var selSimulation = function (expression) {
    var retorno = null;

    switch (expression) {
        case "radialDepartamento":
            retorno = simulationRadDepto;
            break;
        case "radioAgricola":
            retorno = simulationRadAgrigola;
            break;
        case "sideBySide":
            retorno = simulation;
            break;
        default:
            retorno = simulation;
    }
    return retorno;
}
function update(config) {
    seleccion = config;

    d3.json("assets/data/data.json", function (error, graph) {
        if (error) throw error;

        var link = svg.append("g")
            .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")")
            .attr("class", "links")
            .selectAll("line")
            .data(graph.links)
            .enter().append("line")
            .attr("stroke-width", function (d) { return ((+d.Alta * 10)); })
            .style("stroke", function (d) { return colorAptitud[0]; });

        var linkMedia = svg.append("g")
            .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")")
            .attr("class", "links")
            .selectAll("line")
            .data(graph.links)
            .enter().append("line")
            .attr("stroke-width", function (d) { return ((+d.Media * 10)); })
            .style("stroke", function (d) { return colorAptitud[1]; });

        var linkBaja = svg.append("g")
            .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")")
            .attr("class", "links")
            .selectAll("line")
            .data(graph.links)
            .enter().append("line")
            .attr("stroke-width", function (d) { return ((+d.Baja * 10)); })
            .style("stroke", function (d) { return colorAptitud[2]; });

        var node = svg.append("g")
            .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")")
            .attr("class", "nodes")
            .selectAll("circle")
            .data(graph.nodes)
            .enter().append("circle")
            .attr("r", r)
            .attr("fill", function (d) { return color(d.group); })
            .call(d3.drag()
                .on("start", dragstarted)
                .on("drag", dragged)
                .on("end", dragended));

        node.append("title")
            .text(function (d) { return d.id; });

        selSimulation(seleccion)
            .nodes(graph.nodes)
            .on("tick", ticked);

        selSimulation(seleccion)
            .force("link")
            .links(graph.links);

        function ticked() {
            link
                .attr("x1", function (d) { return d.source.x; })
                .attr("y1", function (d) { return d.source.y; })
                .attr("x2", function (d) { return d.target.x; })
                .attr("y2", function (d) { return d.target.y; });
            linkMedia
                .attr("x1", function (d) { return d.source.x; })
                .attr("y1", function (d) { return d.source.y; })
                .attr("x2", function (d) { return d.target.x; })
                .attr("y2", function (d) { return d.target.y; });
            linkBaja
                .attr("x1", function (d) { return d.source.x; })
                .attr("y1", function (d) { return d.source.y; })
                .attr("x2", function (d) { return d.target.x; })
                .attr("y2", function (d) { return d.target.y; });
            node
                .attr("cx", function (d) { return d.x; })
                .attr("cy", function (d) { return d.y; });
        }
    });

    selSimulation(seleccion).alpha(1).restart();
}

function dragstarted(d) {
    if (!d3.event.active) selSimulation(seleccion).alphaTarget(0.5).restart();
    d.fx = d.x;
    d.fy = d.y;
}

function dragged(d) {
    d.fx = d3.event.x;
    d.fy = d3.event.y;
}

function dragended(d) {
    if (!d3.event.active) selSimulation(seleccion).alphaTarget(0);
    d.fx = null;
    d.fy = null;
}

d3.selectAll("button").on("click", function (d, i, arr) {
    d3.select("svg").selectAll("*").remove();
    update(arr[i].id);
});

update("sideBySide"); // radioAgricola || radialDepartamento || sideBySide

