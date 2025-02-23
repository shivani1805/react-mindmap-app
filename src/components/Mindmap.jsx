import React, { useEffect, useState } from "react";
import { Tree } from "react-d3-tree";
import "./Mindmap.css";
import Flashcard from "./Flashcard";
import Modal from "./Modal"; 

const Mindmap = ({ topic }) => {
    const [treeData, setTreeData] = useState(null);
    const [selectedNodes, setSelectedNodes] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Fetch data from backend API
    useEffect(() => {
        if (!topic) return;

        fetch(`http://localhost:5001/api/mindmap?topic=${encodeURIComponent(topic)}`)
            .then((response) => response.json())
            .then((data) => {
                if (data.mind_map) {
                    setTreeData(convertData(data.mind_map));
                } else {
                    console.error("Invalid data structure:", data);
                }
            })
            .catch((error) => console.error("Error fetching data:", error));
    }, [topic]);

    // Convert API response into a format usable by react-d3-tree
    const convertData = (data) => {
        return {
            name: data.topic,
            children: data.subtopics.map((subtopic) => ({
                name: subtopic.name,
                question: `What is ${subtopic.name}?`,
                answer: `${subtopic.name} is...`,
                children: subtopic.children.map((child) => ({
                    name: child,
                    question: `What is ${child}?`,
                    answer: `${child} is...`,
                })),
            })),
        };
    };

    const renderSquareNode = ({ nodeDatum }) => (
        <g onClick={() => handleNodeClick(nodeDatum)}>
            <foreignObject width="200" height="100" x="-100" y="-50">
                <div className="square-node">{nodeDatum.name}</div>
            </foreignObject>
        </g>
    );

    const handleNodeClick = (node) => {
        if (!treeData || !treeData.children) return;

        const clickedSubtopic = treeData.children.find((subtopic) => subtopic.name === node.name);
        if (clickedSubtopic) {
            let flashcards = [
                {
                    name: clickedSubtopic.name,
                    question: `What is ${clickedSubtopic.name}?`,
                    answer: `${clickedSubtopic.name} is...`,
                },
            ];

            if (clickedSubtopic.children) {
                flashcards.push(
                    ...clickedSubtopic.children.map((child) => ({
                        name: child.name,
                        question: `What is ${child.name}?`,
                        answer: `${child.name} is...`,
                    }))
                );
            }

            setSelectedNodes(flashcards.slice(0, 4)); // Ensure only 4 cards are shown
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
                        <Flashcard key={index} question={node.question} answer={node.answer} />
                    ))}
                </div>
            </Modal>
        </div>
    );
};

export default Mindmap;
