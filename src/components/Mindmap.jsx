import React, { useEffect, useState } from 'react';
import { Tree } from 'react-d3-tree';
import './Mindmap.css';
import Flashcard from './Flashcard';
import Modal from './Modal';
 
const convertData = (data) => ({
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
});
 
const Mindmap = ({ isDyslexiaMode,topic }) => {
    const [treeData, setTreeData] = useState(null);
    const [selectedNodes, setSelectedNodes] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSpeakingAllowed, setIsSpeakingAllowed] = useState(false);
 
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
    
    
 
    const renderSquareNode = ({ nodeDatum }) => (
        <g onClick={() => handleNodeClick(nodeDatum)}>
            <foreignObject width="200" height="100" x="-100" y="-50">
                <div className={`square-node ${isDyslexiaMode ? 'dyslexia-font' : ''}`}>
                    {nodeDatum.name}
                </div>
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

    const speakQuestionsOnce = () => {
        setIsSpeakingAllowed(true);
        window.speechSynthesis.cancel(); // Ensure no ongoing speech

        selectedNodes.forEach((card, index) => {
            setTimeout(() => {
                if (!isSpeakingAllowed) return; // Stop if speech is disabled
                const msg = new SpeechSynthesisUtterance(`Question: ${card.question}`);
                msg.lang = 'en-US';
                msg.rate = 1;
                msg.pitch = 1;
                window.speechSynthesis.speak(msg);

                // After all questions are spoken, disable speaking to avoid looping
                if (index === selectedNodes.length - 1) {
                    setTimeout(() => setIsSpeakingAllowed(false), 3000);
                }
            }, index * 3000); // Delay for better narration
        });
    };
 
    return (
        <div id="map-div" className={isDyslexiaMode ? 'dyslexia-mode' : ''}>
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
            <Modal isOpen={isModalOpen} onClose={handleCloseModal} onSpeak={speakQuestionsOnce}>
                <div className="flashcard-container">
                    {selectedNodes.map((node, index) => (
                        <Flashcard key={index} question={node.question} answer={node.answer} isSpeakingAllowed={isSpeakingAllowed} />
                    ))}
                </div>
            </Modal>
        </div>
    );
};
 
export default Mindmap;
 