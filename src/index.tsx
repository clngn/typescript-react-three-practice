import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { Size } from './config';
import * as THREE from 'three';

const createRenderer = (canvas: HTMLCanvasElement | null) => {
  if (canvas === null) {
    throw new Error('canvas not found.');
  }

  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
  });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(Size.Width, Size.Height);

  return renderer;
};

const createScene = () => {
  return new THREE.Scene();
};

const createCamera = () => {
  const camera = new THREE.PerspectiveCamera(
    70,
    Size.Width / Size.Height,
    1,
    1000,
  );
  camera.position.set(0, 0, 400);

  return camera;
};

const createLight = () => {
  const light = new THREE.HemisphereLight(0xbbbbff, 0x444422);
  light.position.set(0, 1000, 0);

  return light;
};

const createCube = () => {
  const geometry = new THREE.BoxGeometry(200, 200, 200);
  const material = new THREE.MeshStandardMaterial({
    color: 0x00ff00,
  });
  const cube = new THREE.Mesh(geometry, material);

  return cube;
};

const creatAnimation = ({
  scene,
  camera,
  renderer,
  mesh,
}: {
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  renderer: THREE.WebGLRenderer;
  mesh: THREE.Mesh;
}) =>
  function animate() {
    mesh.rotation.x += 0.005;
    mesh.rotation.y += 0.01;
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  };

const App: React.SFC<{}> = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const renderer = createRenderer(canvasRef.current);
    const camera = createCamera();
    const scene = createScene();
    scene.add(createLight());
    const cube = createCube();
    scene.add(cube);

    requestAnimationFrame(
      creatAnimation({ scene, camera, renderer, mesh: cube }),
    );
  }, []);

  return (
    <>
      <canvas ref={canvasRef} />
    </>
  );
};

ReactDOM.render(<App />, document.getElementById('app'));
