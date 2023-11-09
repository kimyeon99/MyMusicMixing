import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import { usePlayList } from "./usePlayList";
import { color } from "framer-motion";

const MusicVisualizer = ({ width, height }) => {
  const ref = useRef();

  const { soundRef, isPlaying } = usePlayList();

  useEffect(() => {
    if (isPlaying && soundRef.current && soundRef.current.analyserNode) {
      var analyserNode = soundRef.current.analyserNode;
      let animationFrameId;

      function renderChart() {
        animationFrameId = requestAnimationFrame(renderChart);
        var frequencyData = new Uint8Array(analyserNode.frequencyBinCount);

        analyserNode.getByteFrequencyData(frequencyData);
        let normalizedData = Array.from(frequencyData).map(n => n / 255);

        const svg = d3.select(ref.current);

        if (!svg.node()) {
          return;
        }

        // Render bars with D3.js
        svg.selectAll('rect')
          .data(normalizedData)
          .enter()
          .append('rect')
          .merge(svg.selectAll('rect'))
          .attr("x", (d, i) => i * (svg.attr("width") / normalizedData.length))
          .attr("width", svg.attr("width") / normalizedData.length)
          .attr("y", d => svg.attr("height") - d * svg.attr("height"))
          .attr("height", d => d * svg.attr("height"))
          .attr('fill', color);

        // Remove old bars
        svg.selectAll('rect')
          .data(normalizedData)
          .exit()
          .remove();
      }

      renderChart();

      return (() => {
        return () => {
          cancelAnimationFrame(animationFrameId);
        }
      })
    }

  }, [isPlaying]);

  return <svg ref={ref} width={width} height={height} color={color}></svg>;
};

export default MusicVisualizer;
