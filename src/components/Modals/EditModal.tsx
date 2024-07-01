/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { TaskT } from "../../types";

interface Tag {
  title: string;
  bg: string;
  text: string;
}

interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;

  task: TaskT;
}

const EditModal = ({ isOpen, onClose, setOpen, task }: EditModalProps) => {
  const [taskData, setTaskData] = useState(task);
  const [tagTitle, setTagTitle] = useState("");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setTaskData({ ...taskData, [name]: value });
  };

  const handleAddTag = () => {
    if (tagTitle.trim() !== "") {
      const { bg, text } = getRandomColors();
      const newTag: Tag = { title: tagTitle.trim(), bg, text };
      setTaskData({ ...taskData, tags: [...taskData.tags, newTag] });
      setTagTitle("");
    }
  };

  const closeModal = () => {
    setOpen(false);
    onClose();
    setTaskData(taskData);
  };

  const handleSubmit = () => {
    closeModal();
  };

  return (
    <div
      className={`w-screen h-screen z-30 place-items-center fixed top-0 left-0 ${
        isOpen ? "grid" : "hidden"
      }`}
    >
      <div
        className="w-full h-full bg-black opacity-70 absolute left-0 top-0 z-20"
        onClick={closeModal}
      ></div>
      <div className="md:w-[50vw] w-[90%] bg-white rounded-lg shadow-md z-50 flex flex-col items-center gap-3 px-5 py-6">
        <input
          type="text"
          name="title"
          value={taskData.title}
          onChange={handleChange}
          placeholder="Title"
          className="w-full h-12 px-3 outline-none rounded-md bg-slate-100 border border-slate-300 text-sm font-medium"
        />
        <input
          type="text"
          name="description"
          value={taskData.description}
          onChange={handleChange}
          placeholder="Description"
          className="w-full h-12 px-3 outline-none rounded-md bg-slate-100 border border-slate-300 text-sm font-medium"
        />
        <select
          name="priority"
          onChange={handleChange}
          value={taskData.priority}
          className="w-full h-12 px-2 outline-none rounded-md bg-slate-100 border border-slate-300 text-sm"
        >
          <option value="">Priority</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <div className="w-full flex flex-col gap-1">
          <input
            type="number"
            name="deadline"
            value={taskData.deadline}
            onChange={handleChange}
            placeholder="Deadline"
            className="w-full h-12 px-3 outline-none rounded-md bg-slate-100 border border-slate-300 text-sm"
          />
          <label htmlFor="" className="text-sm px-1">
            Duration in minutes
          </label>
        </div>
        <input
          type="text"
          value={tagTitle}
          onChange={(e) => setTagTitle(e.target.value)}
          placeholder="Tag Title"
          className="w-full h-12 px-3 outline-none rounded-md bg-slate-100 border border-slate-300 text-sm"
        />
        <button
          className="w-full rounded-md h-9 bg-slate-500 text-amber-50 font-medium"
          onClick={handleAddTag}
        >
          Add Tag
        </button>
        <div className="w-full">
          {taskData.tags && <span>Tags:</span>}
          {taskData.tags.map((tag, index) => (
            <div
              key={index}
              className="inline-block mx-1 px-[10px] py-[2px] text-[13px] font-medium rounded-md"
              style={{ backgroundColor: tag.bg, color: tag.text }}
            >
              {tag.title}
            </div>
          ))}
        </div>

        <button
          className="w-full mt-3 rounded-md h-9 bg-orange-400 text-blue-50 font-medium"
          onClick={handleSubmit}
        >
          Edit Task
        </button>
      </div>
    </div>
  );
};

export default EditModal;
