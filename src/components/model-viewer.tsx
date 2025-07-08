"use client";

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { cn } from '@/lib/utils';
import { Loader2, AlertTriangle, Box } from 'lucide-react';

const isHighEndDevice = () => {
  if (typeof window === 'undefined') return false;
  const canvas = document.createElement('canvas');
  const isWebGL2 = !!canvas.getContext('webgl2');
  return (
    isWebGL2 &&
    (navigator.hardwareConcurrency || 4) > 4 &&
    (navigator.deviceMemory || 4) >= 4 &&
    window.innerWidth >= 768
  );
};

type ModelViewerProps = {
  modelUrls: string[];
  className?: string;
  onLoaded?: () => void;
  loadingDuration?: number;
  fallbackImage?: string;
  backgroundImage?: string;
};

const ModelViewer: React.FC<ModelViewerProps> = ({ 
  modelUrls, 
  className, 
  onLoaded, 
  loadingDuration = 1000,
  fallbackImage = "/images/fallback.jpg",
  backgroundImage = "/images/unnamed (1).jpg" // Make sure this path is correct
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [animationsEnabled, setAnimationsEnabled] = useState(true);
  const [showFallback, setShowFallback] = useState(false);
  const [modelLoadProgress, setModelLoadProgress] = useState(0);
  const [webGLLost, setWebGLLost] = useState(false);

  useEffect(() => {
    // First verify the background image exists
    const img = new Image();
    img.src = backgroundImage;
    img.onerror = () => {
      console.error(`Background image not found at: ${backgroundImage}`);
      setError('Background image missing');
    };

    // Then handle WebGL initialization
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (!gl) {
      setShowFallback(true);
      setIsLoading(false);
      return;
    }

    if (!modelUrls?.length) {
      setIsLoading(false);
      return;
    }

    const currentMount = mountRef.current;
    if (!currentMount) return;

    setIsLoading(true);
    setError(null);
    setWebGLLost(false);
    
    // Clear previous canvas
    while (currentMount.firstChild) {
      currentMount.removeChild(currentMount.firstChild);
    }
    
    let renderer: THREE.WebGLRenderer | null = null;
    let animationFrameId: number | null = null;
    let scene: THREE.Scene | null = null;
    let camera: THREE.PerspectiveCamera | null = null;
    let controls: OrbitControls | null = null;
    let allModels: THREE.Group | null = null;

    const handleContextLost = (event: Event) => {
      event.preventDefault();
      setWebGLLost(true);
      setError('WebGL context lost. Please refresh the page.');
      setIsLoading(false);
      cleanup();
    };

    const cleanup = () => {
      window.removeEventListener('resize', handleResize);
      
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      
      if (renderer) {
        renderer.domElement.removeEventListener('webglcontextlost', handleContextLost);
        
        if (currentMount && renderer.domElement.parentNode === currentMount) {
          currentMount.removeChild(renderer.domElement);
        }
        renderer.dispose();
      }
      
      if (controls) {
        controls.dispose();
      }
      
      if (scene) {
        scene.traverse(obj => {
          if (obj instanceof THREE.Mesh) {
            obj.geometry?.dispose();
            const materials = Array.isArray(obj.material) 
              ? obj.material 
              : [obj.material];
            materials.forEach(m => m.dispose?.());
          }
        });
      }
    };

    const handleResize = () => {
      if (!currentMount || !camera || !renderer) return;
      camera.aspect = currentMount.clientWidth / currentMount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    };

    try {
      const highEnd = isHighEndDevice();
      scene = new THREE.Scene();
      
      // Set up renderer with transparency
      renderer = new THREE.WebGLRenderer({
        antialias: highEnd,
        powerPreference: highEnd ? "high-performance" : "low-power",
        alpha: true // Critical for background visibility
      });
      renderer.setClearColor(0x000000, 0); // Fully transparent
      renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, highEnd ? 1.5 : 1));
      if (highEnd) {
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      }
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      currentMount.appendChild(renderer.domElement);

      // Add context loss handler
      renderer.domElement.addEventListener('webglcontextlost', handleContextLost, false);

      // Optimized lighting setup
      const ambientLight = new THREE.AmbientLight(0xffffff, highEnd ? 0.8 : 0.9);
      scene.add(ambientLight);
      
      const mainLight = new THREE.DirectionalLight(0xfffaf0, highEnd ? 1.5 : 1.2);
      mainLight.position.set(15, 25, 15);
      if (highEnd) {
        mainLight.castShadow = true;
        mainLight.shadow.mapSize.width = 1024;
        mainLight.shadow.mapSize.height = 1024;
      }
      scene.add(mainLight);

      const fillLight = new THREE.DirectionalLight(0xffd700, highEnd ? 0.9 : 0.7);
      fillLight.position.set(-10, 10, -15);
      scene.add(fillLight);
      
      if (highEnd) {
        const rimLight = new THREE.DirectionalLight(0xffffff, 0.6);
        rimLight.position.set(0, 15, -20);
        scene.add(rimLight);
        
        const accentLight = new THREE.PointLight(0xff6b6b, 0.8, 25);
        accentLight.position.set(10, 5, 10);
        scene.add(accentLight);
      }

      // Camera setup
      camera = new THREE.PerspectiveCamera(
        50,
        currentMount.clientWidth / currentMount.clientHeight,
        0.1,
        100
      );
      camera.position.set(0, 15, 25);

      // Controls setup
      controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.dampingFactor = 0.05;
      controls.autoRotate = animationsEnabled;
      controls.autoRotateSpeed = 1.2;
      controls.enableZoom = true;
      controls.enablePan = false;
      controls.enableTouch = true;
      controls.minDistance = 15;
      controls.maxDistance = 50;

      // Model loading
      const loader = new GLTFLoader();
      const dracoLoader = new DRACOLoader();
      dracoLoader.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/');
      loader.setDRACOLoader(dracoLoader);

      allModels = new THREE.Group();
      const startTime = Date.now();

      loader.load(
        modelUrls[0],
        (gltf) => {
          const model = gltf.scene;
          
          model.traverse((node) => {
            if (node instanceof THREE.Mesh) {
              node.castShadow = highEnd;
              node.receiveShadow = highEnd;
              
              if (node.material) {
                const materials = Array.isArray(node.material) 
                  ? node.material 
                  : [node.material];
                
                materials.forEach(mat => {
                  if (mat instanceof THREE.MeshStandardMaterial) {
                    mat.roughness = highEnd ? 0.2 : 0.3;
                    mat.metalness = 0.05;
                    mat.envMapIntensity = highEnd ? 1.5 : 1.2;
                    if (!highEnd) {
                      mat.clearcoat = 0;
                    }
                  }
                });
              }
            }
          });

          model.scale.set(5, 5, 5);
          model.position.set(0, -2, 0);
          allModels.add(model);
          scene?.add(allModels);

          const elapsedTime = Date.now() - startTime;
          const remainingTime = Math.max(0, loadingDuration - elapsedTime);
          
          setTimeout(() => {
            setIsLoading(false);
            onLoaded?.();
          }, remainingTime);
        },
        (progress) => {
          setModelLoadProgress((progress.loaded / progress.total) * 100);
        },
        (error) => {
          setError(`Model failed to load: ${error.message}`);
          setIsLoading(false);
        }
      );

      // Animation loop
      const animate = () => {
        animationFrameId = requestAnimationFrame(animate);
        
        if (controls) {
          controls.autoRotate = animationsEnabled;
          controls.update();
        }
        
        if (allModels?.children?.[0] && animationsEnabled) {
          const model = allModels.children[0];
          const time = Date.now() * 0.001;
          model.position.y = Math.sin(time * 1.5) * 0.8; // Increased bounce
          model.rotation.y = time * 0.4; // Faster rotation
          model.scale.setScalar(1 + Math.sin(time * 2) * 0.05); // Added scale bounce
        }
        
        if (scene && camera && renderer) {
          renderer.render(scene, camera);
        }
      };
      animate();

      window.addEventListener('resize', handleResize);

      return cleanup;
    } catch (err) {
      console.error('Render error:', err);
      setError("Failed to initialize 3D viewer");
      setIsLoading(false);
      cleanup();
    }
  }, [modelUrls, loadingDuration, backgroundImage]);

  return (
    <div className={cn("relative w-full h-full overflow-hidden", className)}>
      {/* Background image layer */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      />
      
      {/* WebGL container (transparent) */}
      <div ref={mountRef} className="absolute inset-0 z-10" style={{ backgroundColor: 'transparent' }} />
      
      {/* Fallback state */}
      {(showFallback || webGLLost) && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/50">
          <p className="text-lg text-white/80 mb-4">3D model not available</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            Refresh Page
          </button>
        </div>
      )}
      
      {/* Controls and loading states */}
      {!(showFallback || webGLLost) && (
        <>
          <button
            onClick={() => setAnimationsEnabled(!animationsEnabled)}
            className="absolute top-4 right-4 z-30 px-3 py-1.5 text-xs bg-black/70 text-white rounded-md hover:bg-black/90 transition-all backdrop-blur-sm border border-white/10 shadow-sm"
          >
            {animationsEnabled ? "✋ Pause" : "▶️ Play"}
          </button>
          
          {isLoading && (
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/50 backdrop-blur-[1px]">
              <div className="bg-white/90 rounded-lg p-4 shadow-sm">
                <Loader2 className="h-6 w-6 animate-spin text-red-500 mb-2 mx-auto" />
                <p className="text-xs text-gray-700">Loading model...</p>
                <div className="w-24 bg-gray-200 rounded-full h-1.5 mt-1.5">
                  <div 
                    className="bg-red-500 h-1.5 rounded-full"
                    style={{ width: `${modelLoadProgress}%` }}
                  />
                </div>
              </div>
            </div>
          )}
          
          {error && !webGLLost && (
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/70 backdrop-blur-[1px]">
              <AlertTriangle className="h-8 w-8 text-red-400 mb-3" />
              <p className="text-sm text-white/90 text-center px-4 max-w-xs">{error}</p>
              <button 
                onClick={() => window.location.reload()}
                className="mt-3 px-3 py-1 bg-red-500/90 text-white text-xs rounded hover:bg-red-600 transition-colors"
              >
                Try Again
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ModelViewer;
