import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as d3 from 'd3';
import { navigation } from '../config';
import Logo from '../components/Logo';
import articles from '../data/articles.json';
import { getGraphData } from '../utils/graph';

export default function Graph({ onSearchClick }) {
  const svgRef = useRef(null);
  const containerRef = useRef(null);
  const navigate = useNavigate();
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });
  const [hoveredNode, setHoveredNode] = useState(null);
  const simulationRef = useRef(null);
  
  const graphData = getGraphData(articles);

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setDimensions({ 
          width: Math.min(rect.width, 1200), 
          height: Math.min(window.innerHeight - 280, 700) 
        });
      }
    };
    
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  useEffect(() => {
    if (!svgRef.current || graphData.nodes.length === 0) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const { width, height } = dimensions;
    const centerX = width / 2;
    const centerY = height / 2;
    
    const maxLinks = Math.max(...graphData.nodes.map(n => n.linkCount), 1);
    const radiusScale = d3.scaleSqrt()
      .domain([0, maxLinks])
      .range([10, 28]);

    const nodes = graphData.nodes.map(d => ({...d}));
    const links = graphData.links.map(d => ({...d}));

    const simulation = d3.forceSimulation(nodes)
      .alphaDecay(0.05)
      .velocityDecay(0.4)
      .force('link', d3.forceLink(links).id(d => d.id).distance(120).strength(0.3))
      .force('charge', d3.forceManyBody().strength(-200))
      .force('center', d3.forceCenter(centerX, centerY))
      .force('collision', d3.forceCollide().radius(d => radiusScale(d.linkCount) + 15));

    simulationRef.current = simulation;

    const defs = svg.append('defs');
    
    const gradient = defs.append('radialGradient')
      .attr('id', 'node-gradient')
      .attr('cx', '30%')
      .attr('cy', '30%');
    gradient.append('stop').attr('offset', '0%').attr('stop-color', '#4ade80');
    gradient.append('stop').attr('offset', '100%').attr('stop-color', '#15803d');

    const gridGroup = svg.append('g').attr('class', 'grid');
    const gridSize = 50;
    for (let x = 0; x <= width; x += gridSize) {
      gridGroup.append('line').attr('x1', x).attr('y1', 0).attr('x2', x).attr('y2', height).attr('stroke', '#1f2937').attr('stroke-width', 0.5);
    }
    for (let y = 0; y <= height; y += gridSize) {
      gridGroup.append('line').attr('x1', 0).attr('y1', y).attr('x2', width).attr('y2', y).attr('stroke', '#1f2937').attr('stroke-width', 0.5);
    }

    const linkGroup = svg.append('g').attr('class', 'links');
    const link = linkGroup.selectAll('line')
      .data(links)
      .join('line')
      .attr('stroke', '#22c55e')
      .attr('stroke-opacity', 0.3)
      .attr('stroke-width', 1.5);

    const nodeGroup = svg.append('g').attr('class', 'nodes');
    const node = nodeGroup.selectAll('g')
      .data(nodes)
      .join('g')
      .attr('cursor', 'pointer')
      .style('pointer-events', 'all');

    node.append('circle')
      .attr('r', d => radiusScale(d.linkCount))
      .attr('fill', d => d.linkCount > 0 ? 'url(#node-gradient)' : '#4b5563')
      .attr('stroke', d => d.linkCount > 0 ? '#22c55e' : '#6b7280')
      .attr('stroke-width', 2)
      .style('pointer-events', 'all');

    node.append('text')
      .attr('dy', d => radiusScale(d.linkCount) + 16)
      .attr('text-anchor', 'middle')
      .attr('fill', '#9ca3af')
      .attr('font-size', '11px')
      .attr('font-family', 'monospace')
      .style('pointer-events', 'none')
      .text(d => d.title.length > 22 ? d.title.substring(0, 20) + '...' : d.title);

    node.on('click', (event, d) => {
      event.stopPropagation();
      navigate(`/articles/${d.id}`);
    });

    // Remove hover to prevent glitching
    // node.on('mouseenter', (event, d) => {
    //   setHoveredNode(d);
    // });

    // node.on('mouseleave', () => {
    //   setHoveredNode(null);
    // });

    const drag = d3.drag()
      .on('start', (event, d) => {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
      })
      .on('drag', (event, d) => {
        d.fx = event.x;
        d.fy = event.y;
      })
      .on('end', (event, d) => {
        if (!event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
      });

    node.call(drag);

    simulation.on('tick', () => {
      link
        .attr('x1', d => d.source.x)
        .attr('y1', d => d.source.y)
        .attr('x2', d => d.target.x)
        .attr('y2', d => d.target.y);

      node.attr('transform', d => `translate(${d.x},${d.y})`);
    });

    setTimeout(() => {
      simulation.stop();
    }, 3000);

    return () => {
      simulation.stop();
    };
  }, [graphData, dimensions, navigate]);

  return (
    <div className="min-h-screen bg-terminal-bg text-terminal-green p-4 sm:p-8">
      <div className="scanlines" />
      <div className="max-w-6xl mx-auto">
        
        <header className="flex flex-row items-center justify-between mb-8 gap-4">
          <Logo />
          <Nav onSearchClick={onSearchClick} />
        </header>

        <div className="mb-6">
          <h1 className="text-xl sm:text-2xl font-bold text-terminal-green mb-2">
            ## Graph View
          </h1>
          <p className="text-gray-500 text-sm font-mono">
            {graphData.nodes.length} nodes · {graphData.links.length} edges
          </p>
        </div>

        <div 
          ref={containerRef}
          className="relative rounded-lg border border-terminal-green/30 bg-gray-950/50 overflow-hidden"
          style={{ height: dimensions.height }}
        >
          <svg 
            ref={svgRef} 
            width={dimensions.width} 
            height={dimensions.height}
            className="block"
          />
          
          {hoveredNode && (
            <div className="absolute top-4 left-4 bg-gray-900/95 border border-terminal-green/50 rounded px-4 py-3 backdrop-blur-sm z-10">
              <p className="text-terminal-cyan font-medium font-mono">{hoveredNode.title}</p>
              <p className="text-gray-500 text-xs mt-1">
                {hoveredNode.linkCount} connection{hoveredNode.linkCount !== 1 ? 's' : ''}
              </p>
            </div>
          )}

          {graphData.nodes.length === 0 && (
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="text-gray-500">No articles to display</p>
            </div>
          )}
        </div>

        <div className="mt-6 flex flex-wrap gap-6 text-sm text-gray-500 font-mono">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-gradient-to-br from-green-400 to-green-700"></span>
            <span>Connected</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-gray-500"></span>
            <span>Isolated</span>
          </div>
        </div>

        <footer className="border-t border-gray-800 pt-6 pb-8 text-sm mt-12">
          <div className="text-gray-500 text-center font-mono">
            [OK] End of graph.
          </div>
        </footer>

      </div>
    </div>
  );
}

function Nav({ onSearchClick }) {
  return (
    <nav className="flex items-center gap-3 sm:gap-4">
      {navigation.slice(1).map((item) => (
        <NavLink key={item.path} to={item.path}>
          {item.label}
        </NavLink>
      ))}
      <button
        onClick={onSearchClick}
        className="text-sm sm:text-base transition-all duration-200 hover:text-terminal-green hover:underline cursor-pointer"
        title="Search (Ctrl+K)"
      >
        search
      </button>
      <Link
        to="/graph"
        className="text-sm sm:text-base transition-all duration-200 hover:text-terminal-green hover:underline cursor-pointer"
      >
        graph
      </Link>
    </nav>
  );
}

function NavLink({ to, children }) {
  return (
    <Link
      to={to}
      className="text-sm sm:text-base transition-all duration-200 hover:text-terminal-green hover:underline cursor-pointer"
    >
      {children}
    </Link>
  );
}
