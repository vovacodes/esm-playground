import React, { useRef, useState } from "react";
import ReactDOM from "react-dom";
import { Canvas, useFrame } from "react-three-fiber";
import htm from "htm";

const jsx = htm.bind(React.createElement);

function Box(props) {
  // This reference will give us direct access to the mesh
  const mesh = useRef();

  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);

  // Rotate mesh every frame, this is outside of React without overhead
  useFrame(() => (mesh.current.rotation.x = mesh.current.rotation.y += 0.02));

  return jsx`
    <mesh
      ...${props}
      ref=${mesh}
      scale=${active ? [1.5, 1.5, 1.5] : [1, 1, 1]}
      onClick=${(e) => setActive(!active)}
      onPointerOver=${(e) => setHover(true)}
      onPointerOut=${(e) => setHover(false)}
    >
      <boxBufferGeometry args=${[1, 1, 1]} />
      <meshStandardMaterial color=${hovered ? "hotpink" : "orange"} />
    </mesh>
  `;
}

ReactDOM.render(
  jsx`
    <${Canvas}>
      <ambientLight />
      <pointLight position=${[10, 10, 10]} />
      <${Box} position=${[-1.2, 0, 0]} />
      <${Box} position=${[1.2, 0, 0]} />
    <//>
  `,
  document.getElementById("app")
);
