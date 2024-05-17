"use client";
import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Model } from '../components/Model';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

function CameraAnimation({ hasAnimated, setHasAnimated, targetPosition, setTargetPosition }) {
  useFrame(({ camera }) => {
    if (!hasAnimated && camera.position.y > 4) {
      camera.position.y -= 1; // Adjust the speed here
      camera.lookAt(0, 0, 0);
    } else if (!hasAnimated) {
      setHasAnimated(true); // Mark animation as done
    }

    if (targetPosition) {
      const { x, y, z } = targetPosition;

      // Smoothly interpolate camera position towards target
      const targetVector = new THREE.Vector3(x, y, z);
      camera.position.lerp(targetVector, 0.1);

      // Check if the camera is close to the target position
      if (camera.position.distanceTo(targetVector) < 0.1) {
        camera.position.copy(targetVector); // Snap to the target position
        setTargetPosition(null); // Stop the camera animation
      }

      // Make the camera look at the center of the scene
      camera.lookAt(0, 0, 0);
    }
  });

  return null;
}

export default function Home() {
  const [hasAnimated, setHasAnimated] = useState(false);
  const [targetRotation, setTargetRotation] = useState(null);

  useEffect(() => {
    setHasAnimated(false); // Reset animation state on mount
  }, []);

  const handleContactClick = () => {
    setTargetRotation({ x: 10, y: 2 * Math.PI, z: 10 });// Set your desired camera position here
  };

  return (
    <div style={{ position: 'relative', height: '100vh', width: '100vw' }}>
      <Canvas camera={{ position: [15, 30, 5] }}>
        <ambientLight intensity={1.5} />
        <directionalLight position={[0, 10, 10]} intensity={2} />
        <pointLight position={[10, 10, 10]} intensity={1.5} />
        <pointLight position={[-10, -10, -10]} intensity={1.5} />
        <Model />
        <CameraAnimation hasAnimated={hasAnimated} setHasAnimated={setHasAnimated} targetPosition={targetRotation} setTargetPosition={setTargetRotation} />
        <OrbitControls />
      </Canvas>
      <button style={buttonStyle} onClick={handleContactClick}>
        Contact
      </button>
    </div>
  );
}

const buttonStyle = {
  position: 'absolute',
  bottom: '100px',
  left: '50%',
  transform: 'translateX(-50%)',
  padding: '10px 20px',
  fontSize: '16px',
  backgroundColor: 'rgba(255, 255, 255, 0.8)',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  zIndex: 10, // Ensure the button is on top of the canvas
};
