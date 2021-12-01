import { useD3 } from "../../../hooks/useD3";
import React from "react";
import * as d3 from "d3";

import "../../../css/visualizers/RadialTree.css";

const SimilarityTree = ({ data }) => {
  const viewBoxWidth = 500;
  const viewBox = `-${viewBoxWidth} -${viewBoxWidth} ${2 * viewBoxWidth} ${
    2 * viewBoxWidth
  }`;

  const ref = useD3((svg) => {
    const width = viewBoxWidth * 1.5;
    const outerRadius = width / 2;
    const innerRadius = outerRadius - 170;
    const setRadius = (d, y0, k) => {
      d.radius = (y0 += d.data.length) * k;
      if (d.children) d.children.forEach((d) => setRadius(d, y0, k));
    };
    const linkConstant = (d) => {
      return linkStep(d.source.x, d.source.y, d.target.x, d.target.y);
    };
    const linkExtensionConstant = (d) => {
      return linkStep(d.target.x, d.target.y, d.target.x, innerRadius);
    };
    const linkStep = (startAngle, startRadius, endAngle, endRadius) => {
      const c0 = Math.cos((startAngle = ((startAngle - 90) / 180) * Math.PI));
      const s0 = Math.sin(startAngle);
      const c1 = Math.cos((endAngle = ((endAngle - 90) / 180) * Math.PI));
      const s1 = Math.sin(endAngle);
      return (
        "M" +
        startRadius * c0 +
        "," +
        startRadius * s0 +
        (endAngle === startAngle
          ? ""
          : "A" +
            startRadius +
            "," +
            startRadius +
            " 0 0 " +
            (endAngle > startAngle ? 1 : 0) +
            " " +
            startRadius * c1 +
            "," +
            startRadius * s1) +
        "L" +
        endRadius * c1 +
        "," +
        endRadius * s1
      );
    };
    const maxLength = (d) => {
      return d.data.length + (d.children ? d3.max(d.children, maxLength) : 0);
    };
    const cluster = d3
      .cluster()
      .size([360, innerRadius])
      .separation((a, b) => 1);

    const root = d3
      .hierarchy(data, (d) => d.branchset)
      .sum((d) => (d.branchset ? 0 : 1))
      .sort(
        (a, b) =>
          a.value - b.value || d3.ascending(a.data.length, b.data.length)
      );

    cluster(root);
    setRadius(root, (root.data.length = 0), innerRadius / maxLength(root));

    const linkExtension = svg
      .select("#linkext")
      .attr("fill", "none")
      .attr("stroke", "#000")
      .attr("stroke-opacity", 0.25)
      .selectAll("path")
      .data(root.links().filter((d) => !d.target.children))
      .join("path")
      .each(function (d) {
        d.target.linkExtensionNode = this;
      })
      .attr("d", linkExtensionConstant);

    const link = svg
      .select("#link")
      .attr("fill", "none")
      .attr("stroke", "#000")
      .selectAll("path")
      .data(root.links())
      .join("path")
      .each(function (d) {
        d.target.linkNode = this;
      })
      .attr("d", linkConstant);

    svg
      .select("#text")
      .selectAll("text")
      .data(root.leaves())
      .join("text")
      .attr("dy", ".31em")
      .attr(
        "transform",
        (d) =>
          `rotate(${d.x - 90}) translate(${innerRadius + 4},0)${
            d.x < 180 ? "" : " rotate(180)"
          }`
      )
      .attr("text-anchor", (d) => (d.x < 180 ? "start" : "end"))
      .text((d) => d.data.name.replace(/_/g, " "))
      .on("mouseover", mouseovered(true))
      .on("mouseout", mouseovered(false));

    function mouseovered(active) {
      return function (event, d) {
        d3.select(this).classed("label--active", active);
        d3.select(d.linkExtensionNode)
          .classed("link-extension--active", active)
          .raise();
        do d3.select(d.linkNode).classed("link--active", active).raise();
        while ((d = d.parent));
      };
    }
  });

  return (
    <>
      <svg
        ref={ref}
        style={{
          maxHeight: "50vh",
          width: "auto",
        }}
        viewBox={viewBox}
      >
        <g id="link"></g>
        <g id="linkext"></g>
        <g id="text"></g>
      </svg>
      <div id="similarity-graph--tooltip"></div>
    </>
  );
};

export default SimilarityTree;
