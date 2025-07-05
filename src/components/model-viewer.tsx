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
  loadingDuration?: number; // New prop to sync with loading screen
};

const ModelViewer: React.FC<ModelViewerProps> = ({ 
  modelUrls, 
  className, 
  onLoaded, 
  loadingDuration = 3000 
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [animationsEnabled, setAnimationsEnabled] = useState(true);
  const [showFallback, setShowFallback] = useState(false);
  const [modelLoadProgress, setModelLoadProgress] = useState(0);

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
      
      // Enhanced Lighting System for better apple appearance
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
      scene.add(ambientLight);
      
      // Main directional light with enhanced settings
      const directionalLight = new THREE.DirectionalLight(0xfffaf0, 1.5);
      directionalLight.position.set(20, 25, 20);
      directionalLight.castShadow = true;
      directionalLight.shadow.mapSize.width = 4096;
      directionalLight.shadow.mapSize.height = 4096;
      directionalLight.shadow.camera.near = 0.5;
      directionalLight.shadow.camera.far = 150;
      directionalLight.shadow.bias = -0.0001;
      scene.add(directionalLight);

      // Enhanced fill lights for better apple illumination
      const fillLight1 = new THREE.DirectionalLight(0xff6b6b, 0.9);
      fillLight1.position.set(-15, 12, -15);
      scene.add(fillLight1);

      const fillLight2 = new THREE.DirectionalLight(0xffd700, 1.0);
      fillLight2.position.set(0, 10, -25);
      scene.add(fillLight2);

      // Enhanced point lights for apple glow
      const pointLight1 = new THREE.PointLight(0xff4757, 1.2, 40);
      pointLight1.position.set(10, 8, 10);
      scene.add(pointLight1);

      const pointLight2 = new THREE.PointLight(0xffa500, 1.0, 35);
      pointLight2.position.set(-10, 8, 10);
      scene.add(pointLight2);

      // Rim light for better definition
      const rimLight = new THREE.DirectionalLight(0xffffff, 0.7);
      rimLight.position.set(0, 15, -30);
      scene.add(rimLight);

      // Enhanced Camera
      const camera = new THREE.PerspectiveCamera(50, currentMount.clientWidth / currentMount.clientHeight, 0.1, 1000);
      camera.position.set(0, 18, 30);

      // Enhanced Renderer with better quality
      const lowEnd = isLowEndDevice();
      renderer = new THREE.WebGLRenderer({ 
        antialias: true, 
        powerPreference: lowEnd ? "low-power" : "high-performance",
        alpha: true
      });
      renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, lowEnd ? 1.5 : 2.5));
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.4;
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.physicallyCorrectLights = true;
      currentMount.appendChild(renderer.domElement);

      // Enhanced Controls
      const controls = new OrbitControls(camera, renderer.domElement);
      controlsRef.current = controls;
      controls.enableDamping = true;
      controls.dampingFactor = 0.02;
      controls.autoRotate = animationsEnabled;
      controls.autoRotateSpeed = 1.2;
      controls.enableZoom = true;
      controls.enablePan = false;
      controls.minDistance = 20;
      controls.maxDistance = 60;
      controls.minPolarAngle = Math.PI / 8;
      controls.maxPolarAngle = Math.PI / 1.8;

      // Enhanced Model Loader with progress tracking
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

      // Sync model loading with loading screen duration
      const startTime = Date.now();

      modelUrls.forEach((url, i) => {
          loader.load(
            url,
            (gltf) => {
              const model = gltf.scene;
              
              // Enhanced model processing for better apple appearance
              model.traverse(function (node) {
                if (node instanceof THREE.Mesh) {
                  node.castShadow = true;
                  node.receiveShadow = true;
                  
                  // Enhanced material properties for realistic apple look
                  if (node.material) {
                    if (Array.isArray(node.material)) {
                      node.material.forEach(mat => {
                        if (mat instanceof THREE.MeshStandardMaterial) {
                          mat.roughness = 0.2;
                          mat.metalness = 0.05;
                          mat.envMapIntensity = 2.0;
                          mat.clearcoat = 0.3;
                          mat.clearcoatRoughness = 0.1;
                        }
                      });
                    } else if (node.material instanceof THREE.MeshStandardMaterial) {
                      node.material.roughness = 0.2;
                      node.material.metalness = 0.05;
                      node.material.envMapIntensity = 2.0;
                      node.material.clearcoat = 0.3;
                      node.material.clearcoatRoughness = 0.1;
                    }
                  }
                }
              });

              // Enhanced positioning and scaling for better presentation
              model.scale.set(5, 5, 5);
              model.position.set(0, -3, 0);

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
                  cameraZ *= 2.0;
                  camera.position.set(cameraZ * 0.9, cameraZ * 0.7, cameraZ);
                  controls.target.set(0, 0, 0);
                  controls.update();

                  // Ensure model loads within loading screen duration
                  const elapsedTime = Date.now() - startTime;
                  const remainingTime = Math.max(0, loadingDuration - elapsedTime);
                  
                  setTimeout(() => {
                    setIsLoading(false);
                    if (onLoaded) onLoaded();
                  }, remainingTime);
              }
            },
            (progress) => {
              // Track loading progress
              const progressPercent = (progress.loaded / progress.total) * 100;
              setModelLoadProgress(progressPercent);
            },
            (error) => {
              console.error(`An error happened while loading the model: ${url}`, error);
              setError(`Failed to load model: ${url}. Check URL and CORS policy.`);
              setIsLoading(false);
            }
          );
      });

      // Enhanced animation loop with more natural movement
      const animate = () => {
        animationFrameId = requestAnimationFrame(animate);

        if (controls) {
          controls.autoRotate = animationsEnabled;
        }
        
        // Enhanced bouncing animation with more realistic physics
        if (allModels.children.length > 0 && animationsEnabled) {
          const apple = allModels.children[0];
          const time = Date.now() * 0.001;
          const bounceHeight = Math.sin(time * 0.8) * 0.4;
          const rotationY = Math.sin(time * 0.3) * 0.05;
          const rotationX = Math.sin(time * 0.4) * 0.02;
          
          apple.position.y = bounceHeight;
          apple.rotation.y += rotationY * 0.01;
          apple.rotation.x += rotationX * 0.01;
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
  }, [modelUrls, loadingDuration]);

  useEffect(() => {
    if (controlsRef.current) {
      controlsRef.current.autoRotate = animationsEnabled;
    }
  }, [animationsEnabled]);

  return (
    <div className={cn("relative w-full h-full overflow-hidden", className)}>
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
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/20 backdrop-blur-sm transition-opacity">
              <div className="bg-white/90 rounded-lg p-6 shadow-xl">
                <Loader2 className="h-8 w-8 animate-spin text-red-600 mb-3 mx-auto" />
                <p className="text-sm text-gray-700 text-center">Loading 3D Apple...</p>
                <div className="w-32 bg-gray-200 rounded-full h-2 mt-2">
                  <div 
                    className="bg-red-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${modelLoadProgress}%` }}
                  ></div>
                </div>
              </div>
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