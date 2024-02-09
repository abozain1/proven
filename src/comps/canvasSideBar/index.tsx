import React from "react";
import { Box } from "@/types";

interface SidebarProps {
  boxes: Box[];
  openModal: (box: Box) => void;
}

const Sidebar: React.FC<SidebarProps> = (props) => {
  const groupBoxesByClass = (boxes: Box[]) => {
    return boxes.reduce((acc, box) => {
      acc[box.class] = acc[box.class] ? [...acc[box.class], box] : [box];
      return acc;
    }, {} as Record<string, Box[]>);
  };

  const groupedBoxes = groupBoxesByClass(props.boxes);

  return (
    <div style={{ backgroundColor: "wheat", overflow: "hidden" }}>
      {Object.entries(groupedBoxes).map(([className, boxes]) => (
        <div key={className}>
          <h3>{className}</h3>
          <ul>
            {boxes.map((box) => (
              <li onClick={() => props.openModal(box)} key={box.id}>
                {box.text}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
