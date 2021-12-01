import { useD3 } from "../../../hooks/useD3";
import React from "react";
import * as d3 from "d3";

import "../../../css/visualizers/ForceGraph.css";
import "../../../css/visualizers/shared.css";

const SimilarityGraph = ({ nodes, links }) => {
  let doUnmount = () => {};

  const viewBoxWidth = 200 + nodes.length / 3;
  const viewBox = `-${viewBoxWidth} -${viewBoxWidth} ${2 * viewBoxWidth} ${
    2 * viewBoxWidth
  }`;

  React.useEffect(() => {
    return () => {
      console.log("Stopping...");
      doUnmount();
    };
  }, [nodes, links]);

  const ref = useD3((svg) => {
    const nodeIds = d3.map(nodes, (d) => d.id);

    const nodeRadius = 5;

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

    const widths = d3.map(links, (l) => lLerp(l.value, 0.5, 2));

    // Construct the forces.
    const forceNode = d3.forceManyBody();
    const forceLink = d3.forceLink(links).id(({ index: i }) => nodeIds[i]);
    forceNode.strength(-25);
    forceLink.strength((l) => lLerp(l.value, 0.025, 0.1));

    const simulation = d3
      .forceSimulation(nodes)
      .force("link", forceLink)
      .force("charge", forceNode)
      // .force("center", d3.forceCenter())
      .force("x", d3.forceX())
      .force("y", d3.forceY())
      .on("tick", ticked);

    doUnmount = () => {
      simulation.stop();
    };

    const link = svg
      .select("#link")
      .selectAll("line")
      .data(links)
      .join("line")
      .on("mouseover", () => {
        active = true;
      })
      .on("mousemove", (e, d) => {
        if (active) {
          tooltip
            .html(
              `<strong>${d.source.id} ↔ ${d.target.id}</strong><br />${d.value} common properties`
            )
            .style("left", e.pageX + 5 + "px")
            .style("top", e.pageY + 5 + "px")
            .style("opacity", 0.9);
        }
      })
      .on("mouseout", () => {
        tooltip.style("opacity", 0);
        active = false;
      });

    const tooltip = d3.select("#similarity-graph--tooltip");

    let active = false;

    const node = svg
      .select("#node")
      .selectAll("circle")
      .data(nodes)
      .join("circle")
      .attr("r", nodeRadius)
      .call(drag(simulation))
      .on("mouseover", () => {
        active = true;
      })
      .on("mousemove", (e, d) => {
        if (active) {
          tooltip
            .html(`<strong>${d.id}</strong>`)
            .style("left", e.pageX + 5 + "px")
            .style("top", e.pageY + 5 + "px")
            .style("opacity", 0.9);
        }
      })
      .on("mouseout", () => {
        tooltip.style("opacity", 0);
        active = false;
      });

    link.attr("stroke-width", ({ index: i }) => widths[i]);

    function ticked() {
      link
        .attr("x1", (d) =>
          Math.min(viewBoxWidth, Math.max(d.source.x, -1 * viewBoxWidth))
        )
        .attr("y1", (d) =>
          Math.min(viewBoxWidth, Math.max(d.source.y, -1 * viewBoxWidth))
        )
        .attr("x2", (d) =>
          Math.min(viewBoxWidth, Math.max(d.target.x, -1 * viewBoxWidth))
        )
        .attr("y2", (d) =>
          Math.min(viewBoxWidth, Math.max(d.target.y, -1 * viewBoxWidth))
        );

      node
        .attr("cx", (d) =>
          Math.min(viewBoxWidth, Math.max(d.x, -1 * viewBoxWidth))
        )
        .attr("cy", (d) =>
          Math.min(viewBoxWidth, Math.max(d.y, -1 * viewBoxWidth))
        );
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

  return (
    <>
      <svg id="visualization" ref={ref} viewBox={viewBox}>
        <g id="link"></g>
        <g id="node"></g>
      </svg>
      <div id="similarity-graph--tooltip"></div>
    </>
  );
};

export default SimilarityGraph;
