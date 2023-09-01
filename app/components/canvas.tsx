'use client';
import * as THREE from 'three';
import { Box } from '@chakra-ui/react'
import {useRef, useEffect} from 'react';

export default function Canvas() {
    const containerRef = useRef<HTMLDivElement | null>(null)
    useEffect(() => {
        if(typeof window !== 'undefined') {

            // -------------- Scene ------------------
            const scene = new THREE.Scene();

            // -------------- Renderer ------------------
            const renderer = new THREE.WebGLRenderer({antialias: true}); // antialias property is optional. Refer to the docs. 
            renderer.setPixelRatio(2);
            renderer.domElement.style.width = '100%'; // Define canvas width and height here. Defining it in chakra   
            renderer.domElement.style.height = '100%';// would have issues in responsiveness of the canvas.

            // -------------- Camera ------------------
            const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);
            camera.position.z = 15;
            scene.add(camera);

            containerRef.current?.appendChild(renderer.domElement);

            // -------------- Cube ------------------
            const geometry = new THREE.BoxGeometry(1.5, 1.5, 1.5);
            const material = new THREE.MeshStandardMaterial({
                emissive: "#ff00ff",
                emissiveIntensity: 2,
            });
            const cube = new THREE.Mesh(geometry, material);
            scene.add(cube);

            // -------------- Lights ------------------
            const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
            directionalLight.position.set(1, 1, 1);
            scene.add(directionalLight);

            const ambientLight = new THREE.AmbientLight(0x404040);
            scene.add(ambientLight);

            // ---------- Resize function -----------
            const handleResize = () => {
                camera.aspect = window.innerWidth / window.innerHeight;
                camera.updateProjectionMatrix();
            };

            // -------------- infinite animation loop ------------------
            const renderScene = () => {
                cube.rotation.x += 0.01;
                cube.rotation.y += 0.01;
                renderer.render(scene,camera);
                renderer.setAnimationLoop(renderScene); // Javascript's requestAnimationFrame() can also be used here instead. 
            };

            renderScene() // Call renderScene function first time.
            window.addEventListener('resize', handleResize);
            renderer.render(scene, camera);


            return () => {
                renderer.setAnimationLoop(null);
            };
        }    
    },[])
    return (
        <Box height={'100vh'} width={'100vw'} ref={containerRef}></Box>
    );
}