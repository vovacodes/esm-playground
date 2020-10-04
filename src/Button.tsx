import React from "react";
import confetti from "canvas-confetti";

export function Button() {
  return (
    <button
      style={{
        background: "deepskyblue",
        border: "2px solid black",
        padding: "10px 20px",
        borderRadius: 4,
      }}
      onClick={() => confetti()}
    >
      Click me
    </button>
  );
}
