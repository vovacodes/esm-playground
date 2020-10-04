import React, { useRef, useState } from "react";
import ReactDOM from "react-dom";
import { Canvas, ReactThreeFiber, useFrame } from "react-three-fiber";
import { Mesh } from "three";
import { Button } from "./Button.js";

function Box(props: { position: ReactThreeFiber.Vector3 }) {
  // This reference will give us direct access to the mesh
  const mesh = useRef<Mesh>(null);

  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);

  // Rotate mesh every frame, this is outside of React without overhead
  useFrame(() => {
    if (!mesh.current) return;
    mesh.current.rotation.x = mesh.current.rotation.y += 0.02;
  });

  return (
    <mesh
      {...props}
      ref={mesh}
      scale={active ? [1.5, 1.5, 1.5] : [1, 1, 1]}
      onClick={() => setActive(!active)}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
    >
      <boxBufferGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? "hotpink" : "orange"} />
    </mesh>
  );
}

ReactDOM.render(
  <>
    <Canvas>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <Box position={[-1.2, 0, 0]} />
      <Box position={[1.2, 0, 0]} />
    </Canvas>
    <div style={{ textAlign: "center" }}>
      <Button />
    </div>
  </>,
  document.getElementById("app")
);
