import React from "react";
import CustomButton from "./CustomButton";

export default {
  title: "Button",
  component: CustomButton,
  argTypes: {
    children: {
      description: "Содержимое кнопки (обычно текст или иконка)",
      control: { type: "text" },
      defaultValue: "Click me!",
    },
    onClick: {
      description: "Функция, которая вызывается при нажатии на кнопку",
      action: "clicked",
    },
    size: {
      description: "Размер кнопки (small, medium, large)",
      control: {
        type: "radio",
        options: ["small", "medium", "large"],
      },
      defaultValue: "medium",
    },
    className: {
      description: "Дополнительные классы для стилизации кнопки",
      control: { type: "text" },
    },
  },
};

interface Args {
  children: React.ReactNode;
  onClick?: () => void;
  size?: "small" | "medium" | "large";
  className?: string;
}

const Template: React.FC<Args> = (args) => <CustomButton {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: "Click me!",
  onClick: () => {
    console.log("Button clicked!");
  },
};
