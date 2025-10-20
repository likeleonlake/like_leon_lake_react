import React from "react";
import "./Button.module.css";

export default function Button({
  children,
  variant = "primary",  // primary, secondary, ghost
  size = "md",           // sm
  // , md, lg
  disabled = false,
  selected = false,
  iconLeft: IconLeft = null,
  iconRight: IconRight = null,
  onClick,
  style = {},
}) {
  const classNames = [
    "btn",
    variant,
    size,
    selected ? "selected" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      className={classNames}
      disabled={disabled}
      onClick={onClick}
      style={style}
    >
      {IconLeft && <IconLeft className="icon-left" style={{ width: "20px", height: "20px" }} />}
      {children}
      {IconRight && <IconRight className="icon-right" style={{ width: "20px", height: "20px" }} />}
    </button>
  );
}