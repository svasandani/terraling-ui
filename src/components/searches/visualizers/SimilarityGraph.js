import { useD3 } from "../../../hooks/useD3";
import React from "react";
import * as d3 from "d3";

import "../../../css/visualizers/ForceGraph.css";

const SimilarityGraph = ({ nodes, links }) => {
  let doUnmount = () => {};

  React.useEffect(() => {
    return () => {
      doUnmount();
    };
  }, []);

  const ref = useD3((svg) => {
    const nodeIds = d3.map(nodes, (d) => d.id);

    const nodeFill = "currentColor";
    const nodeStroke = "#fff";
    const nodeStrokeWidth = 1.5;
    const nodeStrokeOpacity = 1;
    const nodeRadius = 5;

    const linkStroke = "#999";
    const linkStrokeOpacity = 0.6;
    const linkStrokeLinecap = "round";

    const lMin = links.reduce(
      (acc, curr) => (acc < curr.value ? acc : curr.value),
      Number.POSITIVE_INFINITY
    );
    const lMax = links.reduce(
      (acc, curr) => (acc > curr.value ? acc : curr.value),
      Number.NEGATIVE_INFINITY
    );

    const lLerp = (value, adjustedMin, adjustedMax) =>
      adjustedMin +
      (adjustedMax - adjustedMin) * ((value - lMin) / (lMax - lMin));

    const widths = d3.map(links, (l) => lLerp(l.value, 1, 10));

    // Construct the forces.
    const forceNode = d3.forceManyBody();
    const forceLink = d3.forceLink(links).id(({ index: i }) => nodeIds[i]);

    const simulation = d3
      .forceSimulation(nodes)
      .force("link", forceLink)
      .force("charge", forceNode)
      .force("x", d3.forceX())
      .force("y", d3.forceY())
      .on("tick", ticked);

    doUnmount = () => {
      simulation.stop();
    };

    const link = svg
      .select("#link")
      .attr("stroke", linkStroke)
      .attr("stroke-opacity", linkStrokeOpacity)
      .attr("stroke-linecap", linkStrokeLinecap)
      .selectAll("line")
      .data(links)
      .join("line");

    const tooltip = d3.select("#similarity-graph--tooltip");

    let active = false;

    const node = svg
      .select("#node")
      .attr("fill", nodeFill)
      .attr("stroke", nodeStroke)
      .attr("stroke-opacity", nodeStrokeOpacity)
      .attr("stroke-width", nodeStrokeWidth)
      .selectAll("g")
      .data(nodes)
      .join("g");

    node.append("circle").attr("r", nodeRadius).call(drag(simulation));
    // .on("mouseover", () => {
    //   active = true;
    // })
    // .on("mousemove", (e, d) => {
    //   if (active) {
    //     tooltip
    //       .html(d.id)
    //       .style("left", e.pageX + "px")
    //       .style("top", e.pageY - 28 + "px")
    //       .style("opacity", 0.9);
    //   }
    // })
    // .on("mouseout", () => {
    //   tooltip.style("opacity", 0);
    //   active = false;
    // });

    link.attr("stroke-width", ({ index: i }) => widths[i]);

    function ticked() {
      console.count("tick");
      link
        .attr("x1", (d) => d.source.x)
        .attr("y1", (d) => d.source.y)
        .attr("x2", (d) => d.target.x)
        .attr("y2", (d) => d.target.y);

      node.attr("transform", (d) => `translate(${d.x},${d.y})`);
    }

    function drag(simulation) {
      function dragstarted(event) {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        event.subject.fx = event.subject.x;
        event.subject.fy = event.subject.y;
      }

      function dragged(event) {
        event.subject.fx = event.x;
        event.subject.fy = event.y;
      }

      function dragended(event) {
        if (!event.active) simulation.alphaTarget(0);
        event.subject.fx = null;
        event.subject.fy = null;
      }

      return d3
        .drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended);
    }
  });

  const viewBoxWidth = 200 + nodes.length / 3;
  const viewBox = `-${viewBoxWidth} -${viewBoxWidth} ${2 * viewBoxWidth} ${
    2 * viewBoxWidth
  }`;

  return (
    <>
      <svg
        ref={ref}
        style={{
          height: "500px",
          width: "100%",
        }}
        viewBox={viewBox}
      >
        <g id="link"></g>
        <g id="node"></g>
      </svg>
      <div id="similarity-graph--tooltip"></div>
    </>
  );
};

export default SimilarityGraph;
