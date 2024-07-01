// eslint-disable-next-line @typescript-eslint/ban-ts-comment
import { useState } from "react";
// @ts-nocheck
import { PencilOutline, TimeOutline, TrashOutline } from "react-ionicons";
import { TaskT } from "../../types";
import EditModal from "../Modals/EditModal";

interface TaskProps {
  task: TaskT;
  provided: any;
  handleDeleteTask: (taskData: any) => void;
}

const Task = ({ task, provided, handleDeleteTask }: TaskProps) => {
  const [modalOpen, setModalOpen] = useState(false);

  const { title, description, priority, deadline, tags } = task;
  const openEditModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      className="w-full cursor-grab bg-[#fff] flex flex-col justify-between gap-3 items-start shadow-sm rounded-xl px-3 py-4"
    >
      <div className="flex w-full items-center justify-between ">
        <div className="flex items-center gap-2 px-2">
          {tags.map((tag) => (
            <span
              key={tag.title}
              className="px-[10px] py-[2px] text-[13px] font-medium rounded-md"
              style={{ backgroundColor: tag.bg, color: tag.text }}
            >
              {tag.title}
            </span>
          ))}
        </div>
        {/* <div className="pr-2 flex items-center gap-2">
          <EditModal
            isOpen={modalOpen}
            onClose={closeModal}
            setOpen={setModalOpen}
            task={task}
          />
          <span
            className="hover:cursor-pointer"
            onClick={() => openEditModal()}
          >
            <PencilOutline color={"#00000"} height="15px" width="15px" />
          </span>
          <span
            className="hover:cursor-pointer"
            onClick={() => handleDeleteTask(task)}
          >
            <TrashOutline color={"#e21212"} height="20px" width="20px" />
          </span>
        </div> */}
      </div>
      <div className="w-full flex items-start flex-col gap-0 px-2">
        <span className="text-[15.5px] font-medium text-[#555]">{title}</span>
        <span className="text-[13.5px] text-gray-500">{description}</span>
      </div>
      <div className="w-full border border-dashed"></div>
      <div className="w-full flex items-center justify-between">
        <div className="flex items-center gap-1">
          <TimeOutline color={"#666"} width="20px" height="20px" />
          <span className="text-[13px] text-gray-700">{deadline} mins</span>
        </div>
        <div
          className={`w-[60px] rounded-full h-[5px] ${
            priority === "high"
              ? "bg-red-500"
              : priority === "medium"
              ? "bg-orange-500"
              : "bg-blue-500"
          }`}
        ></div>
      </div>
    </div>
  );
};

export default Task;
