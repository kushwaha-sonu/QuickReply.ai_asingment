import { Asterisk, CaretDown, CaretUp, Info, User } from "phosphor-react";
import "./Dropdown.css";
import { action } from "@storybook/addon-actions";
import { useState } from "react";

interface DropdownProps {
  label: string;
  labelVisibility: string;
  status: string;
  labelIconVisibility: string;
  helperText: string;
  required: string;
  text: string;
  type: string;
  activeItemIndex: number;
  items: string[];
}

export default function Dropdown({
  label,
  labelVisibility,
  status,
  labelIconVisibility,
  helperText,
  required,
  text,
  type,
  activeItemIndex,
  items,
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState<number[]>(
    type === "Multi" ? [] : [activeItemIndex]
  );
  const [labelText, setLabelText] = useState(text);

  const handleItemClick = (index: number) => {
    if (type === "Multi") {
      let updatedSelectedItems;
      if (selectedItems.includes(index)) {
        updatedSelectedItems = selectedItems.filter((item) => item !== index);
      } else {
        updatedSelectedItems = [...selectedItems, index];
      }
      setSelectedItems(updatedSelectedItems);
      setLabelText(updatedSelectedItems.map((item) => items[item]).join(", "));
    } else {
      setSelectedItems([index]);
      setLabelText(items[index]);
      if (type === "SingleNoIcon") {
        setIsOpen(false);
      }
    }
    action("item-selected")(items[index]);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
    if (status === "Disabled") {
      setIsOpen(false);
    }
  };

  return (
    <div className={`dropdown ${status.toLowerCase()}`}>
      {labelVisibility === "Visible" && (
        <label className="label_text">
          {label}
          {labelIconVisibility === "Visible" && <Info size={12} />}
          {required === "Yes" && (
            <Asterisk style={{ color: "red" }} size={12} />
          )}
        </label>
      )}
      <div
        className="dropdown-container"
        onClick={toggleDropdown}
        style={
          status === "Disabled"
            ? { cursor: "not-allowed", backgroundColor: "#adadad" }
            : {}
        }
      >
        {type !== "SingleNoIcon" && <User className="icon" size={20} />}
        <input type="text" value={labelText} readOnly className="input-field" />
        <div className="icon-div">
          {isOpen ? <CaretUp size={12} /> : <CaretDown size={12} />}
        </div>
      </div>

      {helperText && <div className="helper-text">{helperText}</div>}
      {isOpen && (
        <ul
          style={{
            height: items.length > 4 ? "150px" : "auto",
            overflowY: items.length > 4 ? "auto" : "visible",
          }}
          className="dropdown-list"
        >
          {items.map((item, index) => (
            <li
              key={index}
              className={selectedItems.includes(index) ? "active" : ""}
              onClick={() => handleItemClick(index)}
            >
              <label className="label_check_box">
                {item}
                {type !== "SingleNoIcon" && (
                  <input
                    type={type === "SingleRadio" ? "radio" : "checkbox"}
                    checked={selectedItems.includes(index)}
                    readOnly
                  />
                )}
              </label>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
