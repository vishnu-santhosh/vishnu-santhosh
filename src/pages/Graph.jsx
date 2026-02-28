import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as d3 from 'd3';
import { navigation } from '../config';
import Logo from '../components/Logo';
import articles from '../data/articles.json';
import { getGraphData } from '../utils/graph';

export default function Graph({ onSearchClick }) {
  const svgRef = useRef(null);
  const navigate = useNavigate();
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });
  const [hoveredNode, setHoveredNode] = useState(null);
  
  const graphData = getGraphData(articles);

  useEffect(() => {
    const updateDimensions = () => {
      const width = window.innerWidth - 32;
      const height = window.innerHeight - 200;
      setDimensions({ width: Math.max(400, width), height: Math.max(300, height) });
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
    
    const maxLinks = Math.max(...graphData.nodes.map(n => n.linkCount), 1);
    const radiusScale = d3.scaleSqrt()
      .domain([0, maxLinks])
      .range([6, 20]);

    const simulation = d3.forceSimulation(graphData.nodes)
      .force('link', d3.forceLink(graphData.links).id(d => d.id).distance(80))
      .force('charge', d3.forceManyBody().strength(-150))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('collision', d3.forceCollide().radius(d => radiusScale(d.linkCount) + 5));

    const link = svg.append('g')
      .selectAll('line')
      .data(graphData.links)
      .join('line')
      .attr('stroke', '#333')
      .attr('stroke-opacity', 0.6)
      .attr('stroke-width', 1);

    const node = svg.append('g')
      .selectAll('g')
      .data(graphData.nodes)
      .join('g')
      .attr('cursor', 'pointer')
      .call(d3.drag()
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
        }));

    node.append('circle')
      .attr('r', d => radiusScale(d.linkCount))
      .attr('fill', d => d.linkCount > 0 ? '#22c55e' : '#6b7280')
      .attr('stroke', '#0a0a0a')
      .attr('stroke-width', 2);

    node.append('title')
      .text(d => d.title);

    node.on('click', (event, d) => {
      navigate(`/articles/${d.id}`);
    });

    node.on('mouseenter', (event, d) => {
      setHoveredNode(d);
    });

    node.on('mouseleave', () => {
      setHoveredNode(null);
    });

    simulation.on('tick', () => {
      link
        .attr('x1', d => d.source.x)
        .attr('y1', d => d.source.y)
        .attr('x2', d => d.target.x)
        .attr('y2', d => d.target.y);

      node.attr('transform', d => `translate(${d.x},${d.y})`);
    });

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
            Graph View
          </h1>
          <p className="text-gray-500 text-sm">
            {graphData.nodes.length} articles · {graphData.links.length} connections
          </p>
        </div>

        <div className="relative">
          <svg 
            ref={svgRef} 
            width={dimensions.width} 
            height={dimensions.height}
            className="bg-gray-900 rounded-lg border border-gray-800"
          />
          
          {hoveredNode && (
            <div className="absolute top-4 left-4 bg-gray-800 border border-gray-700 rounded px-3 py-2 text-sm">
              <p className="text-terminal-cyan font-medium">{hoveredNode.title}</p>
              <p className="text-gray-500 text-xs">{hoveredNode.linkCount} connection{hoveredNode.linkCount !== 1 ? 's' : ''}</p>
            </div>
          )}
        </div>

        <div className="mt-6 flex gap-6 text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-terminal-green"></span>
            <span>Connected</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-gray-500"></span>
            <span>Isolated</span>
          </div>
        </div>

        <footer className="border-t border-gray-800 pt-6 pb-8 text-sm mt-12">
          <div className="text-gray-500 text-center">
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
