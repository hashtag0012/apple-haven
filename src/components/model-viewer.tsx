"use client";

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { cn } from '@/lib/utils';
import { Loader2, AlertTriangle, Box } from 'lucide-react';

// Enhanced device performance detection
const isLowEndDevice = () => {
  if (typeof window === 'undefined') return false;
  return (
    (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4) ||
    window.innerWidth < 1024 ||
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
  );
};

const isVeryLowEndDevice = () => {
  if (typeof window === 'undefined') return false;
  return (
    (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 2) ||
    window.innerWidth < 500
  );
};

type ModelViewerProps = {
  modelUrls: string[];
  className?: string;
  onLoaded?: () => void;
};

const ModelViewer: React.FC<ModelViewerProps> = ({ modelUrls, className, onLoaded }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [animationsEnabled, setAnimationsEnabled] = useState(true);
  const [showFallback, setShowFallback] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && isVeryLowEndDevice()) {
      setShowFallback(true);
      setIsLoading(false);
      setError(null);
      return;
    }
    if (!modelUrls || modelUrls.length === 0) {
      setIsLoading(false);
      setError(null);
      return;
    }

    const currentMount = mountRef.current;
    if (!currentMount) return;

    setIsLoading(true);
    setError(null);
    
    // Clear previous canvas
    while (currentMount.firstChild) {
      currentMount.removeChild(currentMount.firstChild);
    }
    
    let renderer: THREE.WebGLRenderer;
    let animationFrameId: number;

    try {
      // Enhanced Scene Setup
      const scene = new THREE.Scene();
      
      // Enhanced Lighting System
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
      scene.add(ambientLight);
      
      // Main directional light with enhanced settings
      const directionalLight = new THREE.DirectionalLight(0xfffaf0, 1.2);
      directionalLight.position.set(15, 20, 15);
      directionalLight.castShadow = true;
      directionalLight.shadow.mapSize.width = 2048;
      directionalLight.shadow.mapSize.height = 2048;
      directionalLight.shadow.camera.near = 0.5;
      directionalLight.shadow.camera.far = 100;
      directionalLight.shadow.bias = -0.0001;
      scene.add(directionalLight);

      // Enhanced fill lights
      const fillLight1 = new THREE.DirectionalLight(0x87ceeb, 0.7);
      fillLight1.position.set(-12, 10, -12);
      scene.add(fillLight1);

      const fillLight2 = new THREE.DirectionalLight(0xffe4b5, 0.8);
      fillLight2.position.set(0, 8, -20);
      scene.add(fillLight2);

      // Enhanced point lights for better apple illumination
      const pointLight1 = new THREE.PointLight(0xffd700, 1.0, 30);
      pointLight1.position.set(8, 5, 8);
      scene.add(pointLight1);

      const pointLight2 = new THREE.PointLight(0xff6b6b, 0.8, 25);
      pointLight2.position.set(-8, 5, 8);
      scene.add(pointLight2);

      // Rim light for better definition
      const rimLight = new THREE.DirectionalLight(0xffffff, 0.5);
      rimLight.position.set(0, 10, -25);
      scene.add(rimLight);

      // Enhanced Camera
      const camera = new THREE.PerspectiveCamera(60, currentMount.clientWidth / currentMount.clientHeight, 0.1, 1000);
      camera.position.set(0, 15, 25);

      // Enhanced Renderer
      const lowEnd = isLowEndDevice();
      renderer = new THREE.WebGLRenderer({ 
        antialias: !lowEnd, 
        powerPreference: lowEnd ? "low-power" : "high-performance",
        alpha: true
      });
      renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, lowEnd ? 1.5 : 2));
      renderer.shadowMap.enabled = !lowEnd;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.2;
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.physicallyCorrectLights = true;
      currentMount.appendChild(renderer.domElement);

      // Enhanced Controls
      const controls = new OrbitControls(camera, renderer.domElement);
      controlsRef.current = controls;
      controls.enableDamping = true;
      controls.dampingFactor = 0.03;
      controls.autoRotate = animationsEnabled;
      controls.autoRotateSpeed = 0.8;
      controls.enableZoom = true;
      controls.enablePan = false;
      controls.minDistance = 15;
      controls.maxDistance = 50;
      controls.minPolarAngle = Math.PI / 6;
      controls.maxPolarAngle = Math.PI / 2;

      // Enhanced Model Loader
      const loader = new GLTFLoader();
      const dracoLoader = new DRACOLoader();
      dracoLoader.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/');
      loader.setDRACOLoader(dracoLoader);

      const allModels = new THREE.Group();
      let modelsLoaded = 0;

      if(modelUrls.length === 0) {
        setIsLoading(false);
        return;
      }

      modelUrls.forEach((url, i) => {
          loader.load(
            url,
            (gltf) => {
              const model = gltf.scene;
              
              // Enhanced model processing
              model.traverse(function (node) {
                if (node instanceof THREE.Mesh) {
                  node.castShadow = true;
                  node.receiveShadow = true;
                  
                  // Enhanced material properties for better apple appearance
                  if (node.material) {
                    if (Array.isArray(node.material)) {
                      node.material.forEach(mat => {
                        if (mat instanceof THREE.MeshStandardMaterial) {
                          mat.roughness = 0.3;
                          mat.metalness = 0.1;
                          mat.envMapIntensity = 1.5;
                        }
                      });
                    } else if (node.material instanceof THREE.MeshStandardMaterial) {
                      node.material.roughness = 0.3;
                      node.material.metalness = 0.1;
                      node.material.envMapIntensity = 1.5;
                    }
                  }
                }
              });

              // Enhanced positioning and scaling
              model.scale.set(4, 4, 4);
              model.position.set(0, -2, 0);

              allModels.add(model);
              modelsLoaded++;

              if (modelsLoaded === modelUrls.length) {
                  scene.add(allModels);
                  
                  // Enhanced camera positioning
                  const box = new THREE.Box3().setFromObject(allModels);
                  const size = box.getSize(new THREE.Vector3());
                  const center = box.getCenter(new THREE.Vector3());
                  allModels.position.sub(center);

                  const maxDim = Math.max(size.x, size.y, size.z);
                  const fov = camera.fov * (Math.PI / 180);
                  let cameraZ = Math.abs(maxDim / 2 / Math.tan(fov / 2));
                  cameraZ *= 2.2;
                  camera.position.set(cameraZ * 0.8, cameraZ * 0.6, cameraZ);
                  controls.target.set(0, 0, 0);
                  controls.update();

                  setIsLoading(false);
                  if (onLoaded) onLoaded();
              }
            },
            undefined,
            (error) => {
              console.error(`An error happened while loading the model: ${url}`, error);
              setError(`Failed to load model: ${url}. Check URL and CORS policy.`);
              setIsLoading(false);
            }
          );
      });

      // Enhanced animation loop
      const animate = () => {
        animationFrameId = requestAnimationFrame(animate);

        if (controls) {
          controls.autoRotate = animationsEnabled;
        }
        
        // Enhanced bouncing animation with more natural movement
        if (allModels.children.length > 0 && animationsEnabled) {
          const apple = allModels.children[0];
          const time = Date.now() * 0.0008;
          const bounceHeight = Math.sin(time) * 0.3;
          const rotationY = Math.sin(time * 0.5) * 0.1;
          apple.position.y = bounceHeight;
          apple.rotation.y += rotationY * 0.01;
        }
        
        controls.update();
        renderer.render(scene, camera);
      };
      animate();

      // Enhanced resize handler
      const handleResize = () => {
        if(currentMount) {
          camera.aspect = currentMount.clientWidth / currentMount.clientHeight;
          camera.updateProjectionMatrix();
          renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
        }
      };
      window.addEventListener('resize', handleResize);

      // Cleanup
      return () => {
        window.removeEventListener('resize', handleResize);
        if (currentMount && renderer.domElement) {
          currentMount.removeChild(renderer.domElement);
        }
        cancelAnimationFrame(animationFrameId);
        renderer.dispose();
        controls.dispose();
      };
    } catch(err) {
      console.error(err);
      setError("An unexpected error occurred.");
      setIsLoading(false);
    }
  }, [modelUrls]);

  useEffect(() => {
    if (controlsRef.current) {
      controlsRef.current.autoRotate = animationsEnabled;
    }
  }, [animationsEnabled]);

  return (
    <div className={cn("relative w-full h-full border-2 border-dashed rounded-lg overflow-hidden shadow-inner", className)}>
      {showFallback ? (
        <div className="w-full h-full flex flex-col items-center justify-center bg-background/80">
          <img
            src="/images/1_UjtUj9B7PqGvTWNuRll0Vw.jpg"
            alt="Fallback for 3D model"
            className="w-full h-full object-cover rounded-lg"
            loading="lazy"
          />
          <p className="mt-4 text-lg text-muted-foreground">3D model not supported on this device.</p>
        </div>
      ) : (
        <>
          <div ref={mountRef} className="w-full h-full outline-none gpu-accelerated"></div>
          
          {/* Enhanced Performance Toggle */}
          <button
            onClick={() => setAnimationsEnabled(!animationsEnabled)}
            className="absolute top-4 right-4 z-10 px-4 py-2 text-sm bg-black/60 text-white rounded-lg hover:bg-black/80 transition-all duration-300 backdrop-blur-sm border border-white/20"
          >
            {animationsEnabled ? "🎬 Disable Animations" : "▶️ Enable Animations"}
          </button>
          
          {isLoading && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/90 backdrop-blur-sm transition-opacity">
              <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
              <p className="text-lg text-muted-foreground">Loading 3D model...</p>
              <p className="text-sm text-muted-foreground mt-2">Preparing enhanced visuals</p>
            </div>
          )}
          
          {error && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/90 backdrop-blur-sm transition-opacity">
              <AlertTriangle className="h-12 w-12 text-destructive mb-4" />
              <p className="text-lg text-destructive text-center px-4">{error}</p>
            </div>
          )}
          
          {(!modelUrls || modelUrls.length === 0) && !isLoading && !error && (
            <div className="absolute inset-0 flex flex-col items-center justify-center transition-opacity">
              <Box className="h-24 w-24 text-muted-foreground/20 mb-4" />
              <p className="text-xl text-muted-foreground">Enter a model URL to view</p>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default ModelViewer;