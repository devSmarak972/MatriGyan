import {
  faEllipsis,
  faPen,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Menu } from "@mantine/core";
import React from "react";

const CheckboxItem = ({ props }) => {
  return (
    <div class="inline-flex items-center justify-between space-x-2">
      <div className="flex items-center gap-2">
        <input
          class="form-checkbox is-outline h-5 w-5 rounded bg-slate-100 border-slate-400/70 before:!bg-success checked:!border-success hover:!border-success focus:!border-success dark:bg-navy-900 dark:border-navy-500"
          type="checkbox"
          id={"check" + props.id}
          value={props.completed}
          onChange={props.handleCheck}
        />
        <div class="my-0 mx-2 py-1">
          <p class="mb-0 text-black font-medium">{props.title}</p>
          <span class="text-muted text-xs">
            {props.date ? props.date : ""}{" "}
            <span
              className={
                "font-medium " + (props.messagetype ? props.messagetype : "")
              }
            >
              {props.message ? "  |  " + props.message : ""}
            </span>
          </span>
        </div>
      </div>
      <Menu>
        <Menu.Target>
          <FontAwesomeIcon
            icon={faEllipsis}
            size="lg"
            className="cursor-pointer"
          />
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Item
            icon={<FontAwesomeIcon icon={faPen} style={{ color: "#949494" }} />}
          >
            Edit Task
          </Menu.Item>
          <Menu.Item
            icon={<FontAwesomeIcon icon={faTrashCan} />}
            className="text-red-400"
          >
            Delete Task
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </div>
  );
};

export default CheckboxItem;
