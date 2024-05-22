"use client";
import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Model } from './Model';
import { OrbitControls, Text } from '@react-three/drei';
import * as THREE from 'three';
import ContactButton from './ContactButton';
import AboutUsButton from './AboutUsButton';
import ProjectsButton from './ProjectsButton';

function sphericalToCartesian(radius, latitude, longitude) {
  const phi = latitude * (Math.PI / 180); // Convert latitude to radians
  const theta = longitude * (Math.PI / 180); // Convert longitude to radians
  const x = radius * Math.cos(phi) * Math.cos(theta);
  const y = radius * Math.cos(phi) * Math.sin(theta);
  const z = radius * Math.sin(phi);
  return { x, y, z };
}

function CameraAnimation({ hasAnimated, setHasAnimated, targetPosition, setTargetPosition }) {
  useFrame(({ camera }) => {
    console.log('Camera Position:', camera.position);
    if (!hasAnimated && camera.position.y > 4) {
      camera.position.y -= 0.3; // Adjust the speed here
      camera.lookAt(0, 0, 0);
    } else if (!hasAnimated) {
      setHasAnimated(true); // Mark animation as done
    }

    if (targetPosition) {
      const { radius, latitude, longitude } = targetPosition;
      const { x, y, z } = sphericalToCartesian(radius, latitude, longitude);

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

export default function Forest3d() {
  const [hasAnimated, setHasAnimated] = useState(false);
  const [targetRotation, setTargetRotation] = useState(null);

  const [scrollCount, setScrollCount] = useState(0);

  useEffect(() => {
    setHasAnimated(false); // Reset animation state on mount

    const handleScroll = (event) => {
      if (event.deltaY !== 0) { // Check if the scroll event has vertical movement
        setScrollCount((prevCount) => prevCount + 1);
      }
    };

    window.addEventListener('wheel', handleScroll);

    return () => {
      window.removeEventListener('wheel', handleScroll); // Clean up event listener on unmount
    };
  }, []);

  useEffect(() => {
    if (scrollCount === 1) {
      handleContactClick();
    } else if (scrollCount === 2) {
      handleAboutUsClick();
    } else if (scrollCount === 3) {
      handleProjectsClick();
      setScrollCount(0);
    }
  }, [scrollCount]);

  const handleContactClick = () => {
    setTargetRotation({ radius: 20, latitude: 60, longitude: 150 });
  };

  const handleAboutUsClick = () => {
    setTargetRotation({ radius: 15, latitude: 320, longitude: 30 });
  };

  const handleProjectsClick = () => {
    setTargetRotation({ radius: -28.5, latitude: 1.13, longitude: -10.92 });
  };

  const textPositionContact = sphericalToCartesian(14, 55, 143);

  const textPositionAboutUs = sphericalToCartesian(8, 315, 35);

  const textPositionProjects = sphericalToCartesian(-22.2, 1, -15);

  return (
    <div style={{ position: 'relative', height: '100vh', width: '100vw' }}>
      <Canvas camera={{ position: [15, 30, 5] }}>
        <ambientLight intensity={1.5} />
        <directionalLight position={[0, 10, 10]} intensity={2} />
        <pointLight position={[10, 10, 10]} intensity={1.5} />
        <pointLight position={[-10, -10, -10]} intensity={1.5} />
        <Model />
        <Text
          position={[textPositionContact.x, textPositionContact.y, textPositionContact.z]} 
          fontSize={0.2}
          rotation={[0, Math.PI / 0.54, 0]}
          maxWidth={2} 
          color="white"
          outlineBlur={0.2}
          fillOpacity={2} 
        >
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
        </Text>
        <Text
          position={[textPositionContact.x - 0.2, textPositionContact.y + 2.1, textPositionContact.z]} 
          fontSize={0.3} 
          rotation={[0, Math.PI / 0.54, 0]}
          maxWidth={2} 
          outlineBlur={0.2}
          lineHeight={6}
          color="white"
        >
          Contact
        </Text>
        <Text
          position={[textPositionAboutUs.x, textPositionAboutUs.y, textPositionAboutUs.z]} 
          fontSize={0.2}
          rotation={[0, Math.PI / 1.4, 0]}
          maxWidth={2} 
          color="white"
          outlineBlur={0.2}
          fillOpacity={2} 
        >
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
        </Text>
        <Text
          position={[textPositionAboutUs.x + 0.4, textPositionAboutUs.y + 2.1, textPositionAboutUs.z]} 
          fontSize={0.3} 
          outlineBlur={0.18}
          rotation={[0, Math.PI / 1.4, 0]}
          maxWidth={2} 
          lineHeight={6}
          color="white"
        >
          About Us
        </Text>
        <Text
          position={[textPositionProjects.x, textPositionProjects.y, textPositionProjects.z]} 
          fontSize={0.2}
          rotation={[0, Math.PI / -2, 0]}
          maxWidth={2} 
          color="white"
          outlineBlur={0.3}
          fillOpacity={2} 
        >
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
        </Text>
        <Text
          position={[textPositionProjects.x, textPositionProjects.y + 2.2, textPositionProjects.z - 0.2]} 
          fontSize={0.3} 
          outlineBlur={0.3}
          rotation={[0, Math.PI / -2, 0]}
          maxWidth={2} 
          lineHeight={6}
          color="white"
        >
          Projects
        </Text>
        <CameraAnimation hasAnimated={hasAnimated} setHasAnimated={setHasAnimated} targetPosition={targetRotation} setTargetPosition={setTargetRotation} />
        <OrbitControls lock/>
      </Canvas>
      <ContactButton handleContactClick={handleContactClick} />
      <AboutUsButton handleAboutUsClick={handleAboutUsClick} />
      <ProjectsButton handleProjectsClick={handleProjectsClick} />
    </div>
  );
}