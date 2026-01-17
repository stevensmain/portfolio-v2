import { useLayoutEffect, useRef } from 'react';
import * as THREE from 'three';

const Background3D = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!containerRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000,
    );
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current?.appendChild(renderer.domElement);

    const geometry = new THREE.TorusKnotGeometry(10, 3, 50, 8);
    const material = new THREE.MeshPhongMaterial({
      color: 0x1864ab,
      wireframe: true,
      transparent: true,
      opacity: 0.3,
    });
    const torusKnot = new THREE.Mesh(geometry, material);
    scene.add(torusKnot);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(25, 25, 25);
    scene.add(pointLight);

    camera.position.z = 30;

    let time = 0;
    const speed = 0.5;
    const amplitude = 0.5;

    const animate = () => {
      requestAnimationFrame(animate);
      time += 0.01;

      torusKnot.rotation.x = Math.sin(time * speed) * amplitude;
      torusKnot.rotation.y = Math.cos(time * speed * 0.7) * amplitude;
      torusKnot.rotation.z = Math.sin(time * speed * 0.5) * amplitude * 0.5;

      torusKnot.position.x = Math.sin(time * speed * 0.3) * 2;
      torusKnot.position.y = Math.cos(time * speed * 0.2) * 2;

      renderer.render(scene, camera);
    };

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      id="background-3d"
      className="pointer-events-none fixed inset-0 -z-10"
      aria-hidden="true"
    />
  );
};

export default Background3D;
