import Dropdown from "../components/Dropdown";
import { Meta, StoryObj } from "@storybook/react";


const metaDropdown: Meta<typeof Dropdown> = {
  title: "Example/Dropdown",
  component: Dropdown,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    label: { control: "text" },
    labelVisibility: { control: "radio", options: ["Visible", "Hidden"] },
    status: {
      control: "radio",
      options: ["Unfilled", "Filled", "Disabled", "Error"],
    },
    labelIconVisibility: { control: "radio", options: ["Visible", "Hidden"] },
    helperText: { control: "text" },
    required: { control: "radio", options: ["Yes", "No"] },
    text: { control: "text" },
    type: {
      control: "radio",
      options: ["SingleNoIcon", "SingleRadio", "Multi"],
    },
    activeItemIndex: { control: "number" },
    items: { control: "object" },
  },
};

type Story = StoryObj<typeof metaDropdown>;

export default metaDropdown;

export const DropdownStory: Story = {
  args: {
    label: "Dropdown",
    labelVisibility: "Visible",
    status: "Unfilled",
    labelIconVisibility: "Hidden",
    helperText: "Helper Text",
    required: "Yes",
    text: "Select an option",
    type: "Multi",
    activeItemIndex: 3,
    items: ["Item 1", "Item 2", "Item 3", "Item 4", "Item 5", "Item 6", "Item 7"],
  },
  parameters: {
    actions: {
      handles: ["click", "item-selected"],
    },
  },
};
