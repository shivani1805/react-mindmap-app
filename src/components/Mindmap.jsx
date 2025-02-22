import React, { useEffect, useState } from 'react';
import { Tree } from 'react-d3-tree';
import './Mindmap.css';
import { StepEdge } from 'reactflow';

const convertData = (data) => {
    return {
        name: data.topic,
        children: data.subtopics.slice(0, 4).map(subtopic => ({
            name: subtopic.name,
            children: subtopic.children && subtopic.children.length > 0 
                ? subtopic.children.slice(0, 4).map(child => ({ name: child }))
                : []
        }))
    };
};

const Mindmap = () => {
    const [treeData, setTreeData] = useState(null);
    const [dimensions, setDimensions] = useState({
        width: window.innerWidth,
        height: window.innerHeight
    });

    useEffect(() => {
        fetch('/data.json')
            .then((response) => response.json())
            .then((data) => {
                const formattedData = convertData(data);
                setTreeData(formattedData);
            })
            .catch((error) => console.error('Error fetching data:', error));

        const handleResize = () => {
            setDimensions({
                width: window.innerWidth,
                height: window.innerHeight
            });
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const renderSquareNode = ({ nodeDatum }) => (
        <g>
            <foreignObject width="200" height="100" x="-100" y="-50">
                <div className="square-node">{nodeDatum.name}</div>
            </foreignObject>
        </g>
    );

    return (
        <div id="map-div">
            {treeData ? (
                <Tree
                    data={treeData}
                    orientation="horizontal"
                    nodeSize={{ x: 550, y: 50 }} // Adjust size for spacing
                    translate={{ x: 150, y: dimensions.height / 2 }}
                    separation={{ siblings: 1.5, nonSiblings: 1.5 }}
                    renderCustomNodeElement={renderSquareNode}
                />
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default Mindmap;
