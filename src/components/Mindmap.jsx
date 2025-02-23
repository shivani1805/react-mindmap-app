import React, { useEffect, useState } from 'react';
import { Tree } from 'react-d3-tree';
import './Mindmap.css';
import Flashcard from './Flashcard';
import Modal from './Modal'; // Import the modal component

const convertData = (data) => {
    return {
        name: data.topic,
        children: data.subtopics.slice(0, 4).map(subtopic => ({
            name: subtopic.name,
            question: `What is ${subtopic.name}?`, 
            answer: `${subtopic.name} is...`,
            children: subtopic.children && subtopic.children.length > 0 
                ? subtopic.children.slice(0, 2).map(child => ({ 
                    name: child,
                    question: `What is ${child}?`, 
                    answer: `${child} is...` 
                }))
                : []
        }))
    };
};

const Mindmap = () => {
    const [treeData, setTreeData] = useState(null);
    const [selectedNodes, setSelectedNodes] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        fetch('/data.json')
            .then((response) => response.json())
            .then((data) => {
                const formattedData = convertData(data);
                setTreeData(formattedData);
            })
            .catch((error) => console.error('Error fetching data:', error));
    }, []);

    const renderSquareNode = ({ nodeDatum }) => (
        <g onClick={() => handleNodeClick(nodeDatum)}>
            <foreignObject width="200" height="100" x="-100" y="-50">
                <div className="square-node">{nodeDatum.name}</div>
            </foreignObject>
        </g>
    );

    const handleNodeClick = (node) => {
        if (!treeData || !treeData.children) return;

        const clickedSubtopic = treeData.children.find(subtopic => subtopic.name === node.name);

        if (clickedSubtopic) {
            let flashcards = [];

            flashcards.push({
                name: clickedSubtopic.name,
                question: `What is ${clickedSubtopic.name}?`,
                answer: `${clickedSubtopic.name} is...`
            });

            if (clickedSubtopic.children) {
                flashcards.push(...clickedSubtopic.children.map(child => ({
                    name: child.name,
                    question: `What is ${child.name}?`,
                    answer: `${child.name} is...`
                })));
            }

            while (flashcards.length < 4) {
                flashcards.push({
                    name: `Placeholder ${flashcards.length + 1}`,
                    question: `Placeholder question ${flashcards.length + 1}`,
                    answer: `Placeholder answer ${flashcards.length + 1}`
                });
            }

            setSelectedNodes(flashcards.slice(0, 4));
            setIsModalOpen(true);
        }
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedNodes([]);
    };

    return (
        <div id="map-div">
            {treeData ? (
                <Tree
                    data={treeData}
                    orientation="horizontal"
                    nodeSize={{ x: 550, y: 50 }}
                    translate={{ x: 150, y: 350 }}
                    separation={{ siblings: 1.5, nonSiblings: 1.5 }}
                    renderCustomNodeElement={renderSquareNode}
                />
            ) : (
                <p>Loading...</p>
            )}
            <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
                <div className="flashcard-container">
                    {selectedNodes.map((node, index) => (
                        <Flashcard
                            key={index}
                            question={node.question}
                            answer={node.answer}
                        />
                    ))}
                </div>
            </Modal>
        </div>
    );
};

export default Mindmap;
