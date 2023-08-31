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

            // -------------- infinite animation loop ------------------
            const renderScene = () => {
                renderer.render(scene,camera);
                renderer.setAnimationLoop(renderScene); // Javascript's requestAnimationFrame() can also be used here instead. 
            };
            renderScene() // Call renderScene function first time.

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