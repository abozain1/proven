import React from "react";
import { Box } from "@/types";
import styles from "./styles.module.scss";
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
    <div className={styles.wrapper}>
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
