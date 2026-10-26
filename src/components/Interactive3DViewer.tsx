import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RotateCw, Box, Eye, Sparkles, RefreshCcw, SunMedium, Layers, Car } from 'lucide-react';

interface Interactive3DViewerProps {
  className?: string;
  compact?: boolean;
}

export const Interactive3DViewer: React.FC<Interactive3DViewerProps> = ({
  className = '',
  compact = false,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const fallbackCanvasRef = useRef<HTMLCanvasElement>(null);

  const [useFallback, setUseFallback] = useState(false);
  const [isRotating, setIsRotating] = useState(true);
  const [wireframe, setWireframe] = useState(false);
  const [colorTheme, setColorTheme] = useState<'blue' | 'emerald' | 'amber' | 'slate'>('blue');
  const [polyStats, setPolyStats] = useState({ vertices: 948, faces: 780 });
  const [activePreset, setActivePreset] = useState<'car' | 'prism' | 'terminal' | 'cube'>('car');

  // Interactive rotation state for fallback canvas
  const rotationRef = useRef({ x: 0.25, y: 0.6 });
  const isDraggingRef = useRef(false);
  const previousMousePositionRef = useRef({ x: 0, y: 0 });

  // Three.js internal references
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const groupRef = useRef<THREE.Group | null>(null);
  const wheelsRef = useRef<THREE.Mesh[]>([]);
  const requestAnimRef = useRef<number | null>(null);

  const colors = {
    blue: { primary: '#3B82F6', secondary: '#1D4ED8', accent: '#60A5FA', glow: '#93C5FD' },
    emerald: { primary: '#10B981', secondary: '#047857', accent: '#34D399', glow: '#A7F3D0' },
    amber: { primary: '#F59E0B', secondary: '#B45309', accent: '#FBBF24', glow: '#FDE68A' },
    slate: { primary: '#64748B', secondary: '#334155', accent: '#94A3B8', glow: '#E2E8F0' },
  };

  const hexColors = {
    blue: { primary: 0x3b82f6, secondary: 0x1d4ed8, accent: 0x60a5fa, glow: 0x93c5fd },
    emerald: { primary: 0x10b981, secondary: 0x047857, accent: 0x34d399, glow: 0xa7f3d0 },
    amber: { primary: 0xf59e0b, secondary: 0xb45309, accent: 0xfbbf24, glow: 0xfde68a },
    slate: { primary: 0x64748b, secondary: 0x334155, accent: 0x94a3b8, glow: 0xe2e8f0 },
  };

  // Check WebGL availability safely
  const isWebGLAvailable = () => {
    try {
      const canvas = document.createElement('canvas');
      return !!(
        window.WebGLRenderingContext &&
        (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
      );
    } catch {
      return false;
    }
  };

  // Attempt Three.js WebGL initialization
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    if (!isWebGLAvailable()) {
      setUseFallback(true);
      return;
    }

    let renderer: THREE.WebGLRenderer | null = null;
    let scene: THREE.Scene | null = null;
    let camera: THREE.PerspectiveCamera | null = null;
    let assetGroup: THREE.Group | null = null;

    try {
      scene = new THREE.Scene();
      sceneRef.current = scene;

      const width = container.clientWidth || 400;
      const height = container.clientHeight || 320;
      camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
      camera.position.set(0, 2.5, 5.8);
      camera.lookAt(0, 0.1, 0);

      // Create WebGL Renderer with fail-safe error handling
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: 'default',
        failIfMajorPerformanceCaveat: false,
      });

      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      rendererRef.current = renderer;

      const domElem = renderer.domElement;

      // Handle context lost without crashing
      const handleContextLost = (e: Event) => {
        e.preventDefault();
        setUseFallback(true);
      };
      domElem.addEventListener('webglcontextlost', handleContextLost, false);

      container.appendChild(domElem);

      // Studio Lighting
      const ambientLight = new THREE.AmbientLight(0xffffff, 1.0);
      scene.add(ambientLight);

      const keyLight = new THREE.DirectionalLight(0xffffff, 2.2);
      keyLight.position.set(5, 8, 5);
      scene.add(keyLight);

      const fillLight = new THREE.DirectionalLight(0x93c5fd, 1.4);
      fillLight.position.set(-5, 4, -3);
      scene.add(fillLight);

      const rimLight = new THREE.DirectionalLight(0x60a5fa, 1.2);
      rimLight.position.set(0, -3, -5);
      scene.add(rimLight);

      assetGroup = new THREE.Group();
      groupRef.current = assetGroup;
      scene.add(assetGroup);

      buildModelGeometry(assetGroup, activePreset, colorTheme, wireframe);

      // Mouse & Touch events for WebGL view
      const handleMouseDown = (e: MouseEvent) => {
        isDraggingRef.current = true;
        previousMousePositionRef.current = { x: e.clientX, y: e.clientY };
      };

      const handleMouseMove = (e: MouseEvent) => {
        if (!isDraggingRef.current || !assetGroup) return;
        const deltaX = e.clientX - previousMousePositionRef.current.x;
        const deltaY = e.clientY - previousMousePositionRef.current.y;

        assetGroup.rotation.y += deltaX * 0.008;
        assetGroup.rotation.x += deltaY * 0.008;
        assetGroup.rotation.x = Math.max(-Math.PI / 4, Math.min(Math.PI / 4, assetGroup.rotation.x));

        previousMousePositionRef.current = { x: e.clientX, y: e.clientY };
      };

      const handleMouseUp = () => {
        isDraggingRef.current = false;
      };

      const handleTouchStart = (e: TouchEvent) => {
        if (e.touches.length === 1) {
          isDraggingRef.current = true;
          previousMousePositionRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
        }
      };

      const handleTouchMove = (e: TouchEvent) => {
        if (!isDraggingRef.current || !assetGroup || e.touches.length !== 1) return;
        const deltaX = e.touches[0].clientX - previousMousePositionRef.current.x;
        const deltaY = e.touches[0].clientY - previousMousePositionRef.current.y;

        assetGroup.rotation.y += deltaX * 0.01;
        assetGroup.rotation.x += deltaY * 0.01;
        assetGroup.rotation.x = Math.max(-Math.PI / 4, Math.min(Math.PI / 4, assetGroup.rotation.x));

        previousMousePositionRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      };

      const handleTouchEnd = () => {
        isDraggingRef.current = false;
      };

      domElem.addEventListener('mousedown', handleMouseDown);
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      domElem.addEventListener('touchstart', handleTouchStart, { passive: true });
      window.addEventListener('touchmove', handleTouchMove, { passive: true });
      window.addEventListener('touchend', handleTouchEnd);

      // Resize Observer
      const resizeObserver = new ResizeObserver((entries) => {
        for (const entry of entries) {
          const { width: newW, height: newH } = entry.contentRect;
          if (newW > 0 && newH > 0 && camera && renderer) {
            camera.aspect = newW / newH;
            camera.updateProjectionMatrix();
            renderer.setSize(newW, newH);
          }
        }
      });
      resizeObserver.observe(container);

      // Animation loop
      let clock = new THREE.Clock();
      const animate = () => {
        const delta = clock.getDelta();
        if (isRotating && !isDraggingRef.current && assetGroup) {
          assetGroup.rotation.y += delta * 0.55;
        }

        // Animate spinning wheels for the car!
        if (wheelsRef.current.length > 0) {
          wheelsRef.current.forEach((wheel) => {
            wheel.rotation.z += delta * 8;
          });
        }

        const elapsedTime = clock.getElapsedTime();
        if (assetGroup) {
          assetGroup.position.y = Math.sin(elapsedTime * 1.5) * 0.06;
        }

        if (renderer && scene && camera) {
          renderer.render(scene, camera);
        }
        requestAnimRef.current = requestAnimationFrame(animate);
      };
      animate();

      return () => {
        if (requestAnimRef.current) cancelAnimationFrame(requestAnimRef.current);
        resizeObserver.disconnect();
        domElem.removeEventListener('webglcontextlost', handleContextLost);
        domElem.removeEventListener('mousedown', handleMouseDown);
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
        domElem.removeEventListener('touchstart', handleTouchStart);
        window.removeEventListener('touchmove', handleTouchMove);
        window.removeEventListener('touchend', handleTouchEnd);
        if (container.contains(domElem)) {
          container.removeChild(domElem);
        }
        if (renderer) {
          renderer.dispose();
        }
      };
    } catch (err) {
      console.warn('WebGL initialization failed or context blocked, falling back to 2D engine:', err);
      setUseFallback(true);
    }
  }, []);

  // Three.js geometry builder
  const buildModelGeometry = (
    group: THREE.Group,
    preset: 'car' | 'prism' | 'terminal' | 'cube',
    colorKey: 'blue' | 'emerald' | 'amber' | 'slate',
    isWire: boolean
  ) => {
    wheelsRef.current = [];

    while (group.children.length > 0) {
      const obj = group.children[0];
      group.remove(obj);
      if (obj instanceof THREE.Mesh) {
        obj.geometry.dispose();
        if (Array.isArray(obj.material)) {
          obj.material.forEach((m) => m.dispose());
        } else {
          obj.material.dispose();
        }
      }
    }

    const currentColors = hexColors[colorKey];
    const matBase = new THREE.MeshStandardMaterial({
      color: currentColors.primary,
      roughness: 0.2,
      metalness: 0.35,
      wireframe: isWire,
      flatShading: true,
    });
    const matSecondary = new THREE.MeshStandardMaterial({
      color: currentColors.secondary,
      roughness: 0.4,
      metalness: 0.3,
      wireframe: isWire,
      flatShading: true,
    });
    const matAccent = new THREE.MeshStandardMaterial({
      color: currentColors.accent,
      roughness: 0.1,
      metalness: 0.7,
      wireframe: isWire,
      flatShading: true,
    });
    const matDark = new THREE.MeshStandardMaterial({
      color: 0x111827,
      roughness: 0.8,
      metalness: 0.2,
      wireframe: isWire,
    });
    const matGlass = new THREE.MeshStandardMaterial({
      color: 0x93c5fd,
      emissive: currentColors.accent,
      emissiveIntensity: isWire ? 0.2 : 0.4,
      roughness: 0.1,
      metalness: 0.9,
      wireframe: isWire,
    });
    const matHeadlight = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      emissive: 0xfef08a,
      emissiveIntensity: isWire ? 0.2 : 1.2,
      roughness: 0.1,
    });
    const matTaillight = new THREE.MeshStandardMaterial({
      color: 0xff0000,
      emissive: 0xef4444,
      emissiveIntensity: isWire ? 0.2 : 1.0,
      roughness: 0.1,
    });

    let totalVerts = 0;
    let totalFaces = 0;

    const countGeometry = (geo: THREE.BufferGeometry) => {
      const pos = geo.getAttribute('position');
      if (pos) totalVerts += pos.count;
      if (geo.index) {
        totalFaces += geo.index.count / 3;
      } else if (pos) {
        totalFaces += pos.count / 3;
      }
    };

    if (preset === 'car') {
      // 3D Sports Car Geometry (mobil.blend project inspired)
      // 1. Lower Chassis
      const chassisGeo = new THREE.BoxGeometry(2.5, 0.4, 1.25);
      countGeometry(chassisGeo);
      const chassis = new THREE.Mesh(chassisGeo, matBase);
      chassis.position.y = 0.05;
      group.add(chassis);

      // 2. Front Hood
      const hoodGeo = new THREE.BoxGeometry(0.7, 0.3, 1.2);
      countGeometry(hoodGeo);
      const hood = new THREE.Mesh(hoodGeo, matBase);
      hood.position.set(0.95, -0.01, 0);
      group.add(hood);

      // 3. Cabin & Roof
      const cabinGeo = new THREE.BoxGeometry(1.2, 0.5, 1.05);
      countGeometry(cabinGeo);
      const cabin = new THREE.Mesh(cabinGeo, matSecondary);
      cabin.position.set(-0.1, 0.45, 0);
      group.add(cabin);

      // 4. Front Windshield Glass
      const windshieldGeo = new THREE.BoxGeometry(0.08, 0.45, 0.95);
      countGeometry(windshieldGeo);
      const windshield = new THREE.Mesh(windshieldGeo, matGlass);
      windshield.position.set(0.5, 0.43, 0);
      windshield.rotation.z = -Math.PI * 0.14;
      group.add(windshield);

      // 5. Rear Window Glass
      const rearWinGeo = new THREE.BoxGeometry(0.08, 0.45, 0.95);
      countGeometry(rearWinGeo);
      const rearWin = new THREE.Mesh(rearWinGeo, matGlass);
      rearWin.position.set(-0.7, 0.43, 0);
      rearWin.rotation.z = Math.PI * 0.14;
      group.add(rearWin);

      // 6. Rear Spoiler Wing
      const wingGeo = new THREE.BoxGeometry(0.35, 0.08, 1.25);
      countGeometry(wingGeo);
      const wing = new THREE.Mesh(wingGeo, matAccent);
      wing.position.set(-1.18, 0.55, 0);
      group.add(wing);

      const strut1Geo = new THREE.BoxGeometry(0.08, 0.25, 0.08);
      countGeometry(strut1Geo);
      const strut1 = new THREE.Mesh(strut1Geo, matDark);
      strut1.position.set(-1.15, 0.4, 0.35);
      group.add(strut1);

      const strut2Geo = new THREE.BoxGeometry(0.08, 0.25, 0.08);
      countGeometry(strut2Geo);
      const strut2 = new THREE.Mesh(strut2Geo, matDark);
      strut2.position.set(-1.15, 0.4, -0.35);
      group.add(strut2);

      // 7. Headlights
      const hlLeftGeo = new THREE.BoxGeometry(0.12, 0.12, 0.25);
      countGeometry(hlLeftGeo);
      const hlLeft = new THREE.Mesh(hlLeftGeo, matHeadlight);
      hlLeft.position.set(1.3, 0.05, 0.38);
      group.add(hlLeft);

      const hlRightGeo = new THREE.BoxGeometry(0.12, 0.12, 0.25);
      countGeometry(hlRightGeo);
      const hlRight = new THREE.Mesh(hlRightGeo, matHeadlight);
      hlRight.position.set(1.3, 0.05, -0.38);
      group.add(hlRight);

      // 8. Taillights
      const tlLeftGeo = new THREE.BoxGeometry(0.08, 0.12, 0.25);
      countGeometry(tlLeftGeo);
      const tlLeft = new THREE.Mesh(tlLeftGeo, matTaillight);
      tlLeft.position.set(-1.26, 0.05, 0.38);
      group.add(tlLeft);

      const tlRightGeo = new THREE.BoxGeometry(0.08, 0.12, 0.25);
      countGeometry(tlRightGeo);
      const tlRight = new THREE.Mesh(tlRightGeo, matTaillight);
      tlRight.position.set(-1.26, 0.05, -0.38);
      group.add(tlRight);

      // 9. 4 Wheels with animated spinning rotation
      const wheelPositions = [
        { x: 0.75, y: -0.15, z: 0.65 },
        { x: 0.75, y: -0.15, z: -0.65 },
        { x: -0.75, y: -0.15, z: 0.65 },
        { x: -0.75, y: -0.15, z: -0.65 },
      ];

      wheelPositions.forEach((pos) => {
        const tireGeo = new THREE.CylinderGeometry(0.32, 0.32, 0.22, 16);
        tireGeo.rotateX(Math.PI / 2);
        countGeometry(tireGeo);
        const tire = new THREE.Mesh(tireGeo, matDark);

        const rimGeo = new THREE.CylinderGeometry(0.18, 0.18, 0.24, 8);
        rimGeo.rotateX(Math.PI / 2);
        countGeometry(rimGeo);
        const rim = new THREE.Mesh(rimGeo, matAccent);

        const wheelGroup = new THREE.Group();
        wheelGroup.position.set(pos.x, pos.y, pos.z);
        wheelGroup.add(tire);
        wheelGroup.add(rim);

        group.add(wheelGroup);
        wheelsRef.current.push(wheelGroup as any);
      });

      // 10. Display Turntable Pedestal
      const platGeo = new THREE.CylinderGeometry(2.1, 2.3, 0.15, 24);
      countGeometry(platGeo);
      const plat = new THREE.Mesh(platGeo, matSecondary);
      plat.position.y = -0.55;
      group.add(plat);
    } else if (preset === 'prism') {
      const baseGeo = new THREE.CylinderGeometry(1.6, 1.9, 0.4, 6);
      countGeometry(baseGeo);
      const baseMesh = new THREE.Mesh(baseGeo, matSecondary);
      baseMesh.position.y = -0.9;
      group.add(baseMesh);

      const platGeo = new THREE.CylinderGeometry(1.4, 1.4, 0.15, 6);
      countGeometry(platGeo);
      const platMesh = new THREE.Mesh(platGeo, matAccent);
      platMesh.position.y = -0.65;
      group.add(platMesh);

      const octGeo = new THREE.OctahedronGeometry(0.95, 0);
      countGeometry(octGeo);
      const octMesh = new THREE.Mesh(octGeo, matBase);
      octMesh.position.y = 0.5;
      group.add(octMesh);

      const coreGeo = new THREE.IcosahedronGeometry(0.4, 0);
      countGeometry(coreGeo);
      const coreMesh = new THREE.Mesh(coreGeo, matGlass);
      coreMesh.position.y = 0.5;
      group.add(coreMesh);

      for (let i = 0; i < 4; i++) {
        const satGeo = new THREE.ConeGeometry(0.2, 0.5, 4);
        countGeometry(satGeo);
        const satMesh = new THREE.Mesh(satGeo, matAccent);
        const angle = (i * Math.PI) / 2;
        satMesh.position.set(Math.cos(angle) * 1.3, 0.2 + (i % 2) * 0.2, Math.sin(angle) * 1.3);
        group.add(satMesh);
      }
    } else if (preset === 'terminal') {
      const deskGeo = new THREE.BoxGeometry(2.4, 0.2, 1.6);
      countGeometry(deskGeo);
      const deskMesh = new THREE.Mesh(deskGeo, matSecondary);
      deskMesh.position.y = -0.8;
      group.add(deskMesh);

      const screenBaseGeo = new THREE.CylinderGeometry(0.4, 0.5, 0.1, 8);
      countGeometry(screenBaseGeo);
      const screenBase = new THREE.Mesh(screenBaseGeo, matBase);
      screenBase.position.set(0, -0.65, 0);
      group.add(screenBase);

      const standGeo = new THREE.CylinderGeometry(0.08, 0.08, 0.5, 6);
      countGeometry(standGeo);
      const stand = new THREE.Mesh(standGeo, matSecondary);
      stand.position.set(0, -0.4, 0);
      group.add(stand);

      const monitorGeo = new THREE.BoxGeometry(1.8, 1.1, 0.12);
      countGeometry(monitorGeo);
      const monitor = new THREE.Mesh(monitorGeo, matBase);
      monitor.position.set(0, 0.2, 0);
      group.add(monitor);

      const displayGeo = new THREE.PlaneGeometry(1.65, 0.95);
      countGeometry(displayGeo);
      const display = new THREE.Mesh(displayGeo, matGlass);
      display.position.set(0, 0.2, 0.07);
      group.add(display);

      const keyboardGeo = new THREE.BoxGeometry(1.1, 0.06, 0.45);
      countGeometry(keyboardGeo);
      const keyboard = new THREE.Mesh(keyboardGeo, matAccent);
      keyboard.position.set(0, -0.68, 0.4);
      group.add(keyboard);
    } else {
      const camBodyGeo = new THREE.BoxGeometry(1.6, 1.1, 1.0);
      countGeometry(camBodyGeo);
      const camBody = new THREE.Mesh(camBodyGeo, matBase);
      camBody.position.y = 0.1;
      group.add(camBody);

      const lensGeo = new THREE.CylinderGeometry(0.48, 0.48, 0.6, 12);
      countGeometry(lensGeo);
      const lens = new THREE.Mesh(lensGeo, matSecondary);
      lens.rotation.x = Math.PI / 2;
      lens.position.set(0, 0.1, 0.65);
      group.add(lens);

      const lensGlassGeo = new THREE.CircleGeometry(0.38, 12);
      countGeometry(lensGlassGeo);
      const lensGlass = new THREE.Mesh(lensGlassGeo, matGlass);
      lensGlass.position.set(0, 0.1, 0.96);
      group.add(lensGlass);

      const flashGeo = new THREE.BoxGeometry(0.4, 0.25, 0.4);
      countGeometry(flashGeo);
      const flash = new THREE.Mesh(flashGeo, matAccent);
      flash.position.set(0.5, 0.75, 0);
      group.add(flash);
    }

    setPolyStats({ vertices: Math.round(totalVerts), faces: Math.round(totalFaces) });
  };

  useEffect(() => {
    if (!useFallback && groupRef.current) {
      buildModelGeometry(groupRef.current, activePreset, colorTheme, wireframe);
    }
  }, [activePreset, colorTheme, wireframe, useFallback]);

  // Fallback 2D/3D Projection Engine
  useEffect(() => {
    if (!useFallback) return;

    const canvas = fallbackCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let lastTime = performance.now();

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    type Point3D = [number, number, number];
    type Face = { points: Point3D[]; colorType: 'primary' | 'secondary' | 'accent' | 'glow' };

    const getModelFaces = (): Face[] => {
      if (activePreset === 'car') {
        // Car 3D geometry representation for 2D fallback
        const faces: Face[] = [];
        // Chassis top
        faces.push({
          points: [
            [-1.2, 0.2, 0.6],
            [1.2, 0.2, 0.6],
            [1.2, 0.2, -0.6],
            [-1.2, 0.2, -0.6],
          ],
          colorType: 'primary',
        });
        // Chassis front
        faces.push({
          points: [
            [1.2, 0.2, 0.6],
            [1.2, -0.2, 0.6],
            [1.2, -0.2, -0.6],
            [1.2, 0.2, -0.6],
          ],
          colorType: 'primary',
        });
        // Cabin roof
        faces.push({
          points: [
            [-0.7, 0.6, 0.45],
            [0.4, 0.6, 0.45],
            [0.4, 0.6, -0.45],
            [-0.7, 0.6, -0.45],
          ],
          colorType: 'secondary',
        });
        // Front windshield
        faces.push({
          points: [
            [0.4, 0.6, 0.45],
            [0.7, 0.2, 0.55],
            [0.7, 0.2, -0.55],
            [0.4, 0.6, -0.45],
          ],
          colorType: 'glow',
        });
        // Rear spoiler
        faces.push({
          points: [
            [-1.3, 0.6, 0.6],
            [-1.0, 0.6, 0.6],
            [-1.0, 0.6, -0.6],
            [-1.3, 0.6, -0.6],
          ],
          colorType: 'accent',
        });
        return faces;
      } else if (activePreset === 'prism') {
        const topY = 1.3;
        const midY = 0.1;
        const botY = -1.1;
        const rad = 0.9;
        const sides = 6;
        const faces: Face[] = [];

        const basePts: Point3D[] = [];
        for (let i = 0; i < sides; i++) {
          const a = (i * 2 * Math.PI) / sides;
          basePts.push([Math.cos(a) * 1.5, botY, Math.sin(a) * 1.5]);
        }
        faces.push({ points: basePts, colorType: 'secondary' });

        for (let i = 0; i < 4; i++) {
          const a1 = (i * 2 * Math.PI) / 4;
          const a2 = ((i + 1) * 2 * Math.PI) / 4;
          const p1: Point3D = [Math.cos(a1) * rad, midY, Math.sin(a1) * rad];
          const p2: Point3D = [Math.cos(a2) * rad, midY, Math.sin(a2) * rad];
          const apex: Point3D = [0, topY, 0];
          faces.push({ points: [p1, p2, apex], colorType: 'primary' });
        }
        for (let i = 0; i < 4; i++) {
          const a1 = (i * 2 * Math.PI) / 4;
          const a2 = ((i + 1) * 2 * Math.PI) / 4;
          const p1: Point3D = [Math.cos(a1) * rad, midY, Math.sin(a1) * rad];
          const p2: Point3D = [Math.cos(a2) * rad, midY, Math.sin(a2) * rad];
          const apexBot: Point3D = [0, midY - 0.9, 0];
          faces.push({ points: [p2, p1, apexBot], colorType: 'accent' });
        }
        return faces;
      } else if (activePreset === 'terminal') {
        const faces: Face[] = [];
        faces.push({
          points: [
            [-1.0, 0.8, 0],
            [1.0, 0.8, 0],
            [1.0, -0.3, 0],
            [-1.0, -0.3, 0],
          ],
          colorType: 'glow',
        });
        faces.push({
          points: [
            [-1.1, 0.9, -0.08],
            [1.1, 0.9, -0.08],
            [1.1, -0.4, -0.08],
            [-1.1, -0.4, -0.08],
          ],
          colorType: 'primary',
        });
        faces.push({
          points: [
            [-1.4, -0.7, -0.8],
            [1.4, -0.7, -0.8],
            [1.4, -0.7, 0.8],
            [-1.4, -0.7, 0.8],
          ],
          colorType: 'secondary',
        });
        return faces;
      } else {
        const faces: Face[] = [];
        const w = 1.0, h = 0.7, d = 0.6;
        faces.push({
          points: [[-w, -h, d], [w, -h, d], [w, h, d], [-w, h, d]],
          colorType: 'primary',
        });
        faces.push({
          points: [[-w, h, -d], [w, h, -d], [w, -h, -d], [-w, -h, -d]],
          colorType: 'secondary',
        });
        faces.push({
          points: [[-w, h, -d], [-w, h, d], [w, h, d], [w, h, -d]],
          colorType: 'accent',
        });
        return faces;
      }
    };

    const project = (p: Point3D, rotX: number, rotY: number, cx: number, cy: number, scale: number) => {
      const [x, y, z] = p;
      const cosY = Math.cos(rotY);
      const sinY = Math.sin(rotY);
      const x1 = x * cosY + z * sinY;
      const z1 = -x * sinY + z * cosY;

      const cosX = Math.cos(rotX);
      const sinX = Math.sin(rotX);
      const y2 = y * cosX - z1 * sinX;
      const z2 = y * sinX + z1 * cosX;

      const dist = 4.2;
      const fov = scale / (z2 + dist);
      return {
        x: cx + x1 * fov,
        y: cy - y2 * fov,
        z: z2,
      };
    };

    const renderFrame = (now: number) => {
      const dt = (now - lastTime) / 1000;
      lastTime = now;

      if (isRotating && !isDraggingRef.current) {
        rotationRef.current.y += dt * 0.7;
      }

      const rect = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, rect.width, rect.height);

      const cx = rect.width / 2;
      const cy = rect.height / 2;
      const scale = Math.min(rect.width, rect.height) * 0.75;

      const faces = getModelFaces();
      const currentPalette = colors[colorTheme];

      const projectedFaces = faces.map((f) => {
        const projectedPts = f.points.map((pt) =>
          project(pt, rotationRef.current.x, rotationRef.current.y, cx, cy, scale)
        );
        const avgZ = projectedPts.reduce((acc, p) => acc + p.z, 0) / projectedPts.length;
        return {
          points: projectedPts,
          avgZ,
          colorType: f.colorType,
        };
      });

      projectedFaces.sort((a, b) => b.avgZ - a.avgZ);

      projectedFaces.forEach((face) => {
        if (face.points.length < 3) return;

        ctx.beginPath();
        ctx.moveTo(face.points[0].x, face.points[0].y);
        for (let i = 1; i < face.points.length; i++) {
          ctx.lineTo(face.points[i].x, face.points[i].y);
        }
        ctx.closePath();

        const baseColor = currentPalette[face.colorType];
        if (wireframe) {
          ctx.strokeStyle = baseColor;
          ctx.lineWidth = 1.5;
          ctx.stroke();
        } else {
          ctx.fillStyle = baseColor;
          ctx.fill();
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      });

      animId = requestAnimationFrame(renderFrame);
    };

    animId = requestAnimationFrame(renderFrame);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [useFallback, isRotating, colorTheme, activePreset, wireframe]);

  const handleCanvasMouseDown = (e: React.MouseEvent) => {
    isDraggingRef.current = true;
    previousMousePositionRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleCanvasMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current) return;
    const deltaX = e.clientX - previousMousePositionRef.current.x;
    const deltaY = e.clientY - previousMousePositionRef.current.y;

    rotationRef.current.y += deltaX * 0.01;
    rotationRef.current.x += deltaY * 0.01;
    rotationRef.current.x = Math.max(-0.8, Math.min(0.8, rotationRef.current.x));

    previousMousePositionRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleCanvasMouseUp = () => {
    isDraggingRef.current = false;
  };

  const resetView = () => {
    if (groupRef.current) {
      groupRef.current.rotation.set(0, 0, 0);
    }
    rotationRef.current = { x: 0.25, y: 0.6 };
    setIsRotating(true);
  };

  return (
    <div
      className={`relative overflow-hidden rounded-2xl border border-white/[0.12] bg-[#0c0e17]/90 backdrop-blur-xl shadow-2xl flex flex-col ${className}`}
    >
      {/* Header bar of 3D Viewport */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.08] bg-black/40 text-xs">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
          <span className="font-bold text-white">
            {activePreset === 'car' ? 'Animasi 3D Mobil (mobil.blend)' : 'Interactive 3D Viewport'}
          </span>
          <span className="text-neutral-500 hidden sm:inline">
            {activePreset === 'car' ? '· Roda Berputar & Body Shading' : '· Low-Poly Asset Demo'}
          </span>
        </div>

        {/* Live Geometry Badge */}
        <div className="flex items-center gap-3 text-neutral-400 font-mono text-[11px] tabular-nums">
          <span>{polyStats.faces} Polys</span>
          <span>·</span>
          <span>{polyStats.vertices} Verts</span>
          <span>·</span>
          <span className="text-emerald-400 font-semibold">
            {useFallback ? 'Interactive 3D Ready' : 'WebGL Running'}
          </span>
        </div>
      </div>

      {/* Main 3D Canvas Container */}
      <div
        className="relative w-full h-72 sm:h-80 cursor-grab active:cursor-grabbing select-none"
        style={{ touchAction: 'none' }}
      >
        {/* WebGL Mount Element */}
        {!useFallback ? (
          <div ref={mountRef} className="w-full h-full" />
        ) : (
          /* High-Performance 2D Projection Fallback Canvas */
          <canvas
            ref={fallbackCanvasRef}
            className="w-full h-full block"
            onMouseDown={handleCanvasMouseDown}
            onMouseMove={handleCanvasMouseMove}
            onMouseUp={handleCanvasMouseUp}
            onMouseLeave={handleCanvasMouseUp}
            onTouchStart={(e) => {
              if (e.touches.length === 1) {
                isDraggingRef.current = true;
                previousMousePositionRef.current = {
                  x: e.touches[0].clientX,
                  y: e.touches[0].clientY,
                };
              }
            }}
            onTouchMove={(e) => {
              if (!isDraggingRef.current || e.touches.length !== 1) return;
              const deltaX = e.touches[0].clientX - previousMousePositionRef.current.x;
              const deltaY = e.touches[0].clientY - previousMousePositionRef.current.y;
              rotationRef.current.y += deltaX * 0.015;
              rotationRef.current.x += deltaY * 0.015;
              rotationRef.current.x = Math.max(-0.8, Math.min(0.8, rotationRef.current.x));
              previousMousePositionRef.current = {
                x: e.touches[0].clientX,
                y: e.touches[0].clientY,
              };
            }}
            onTouchEnd={() => {
              isDraggingRef.current = false;
            }}
          />
        )}

        {/* Floating guidance hint */}
        <div className="pointer-events-none absolute bottom-3 left-4 text-[11px] text-neutral-300 bg-black/70 backdrop-blur-md px-3 py-1 rounded-lg border border-white/[0.1] flex items-center gap-1.5 shadow-md">
          <RotateCw className="w-3 h-3 text-blue-400" />
          <span>Klik & geser untuk rotasi 360° · Roda berputar aktif</span>
        </div>

        {/* Model Presets Switcher with Mobil as primary */}
        <div className="absolute top-3 right-3 flex items-center gap-1 bg-black/75 backdrop-blur-md p-1 rounded-xl border border-white/[0.1] text-xs shadow-lg max-w-[90%] overflow-x-auto">
          <button
            onClick={() => setActivePreset('car')}
            className={`px-2.5 py-1 rounded-lg transition-all whitespace-nowrap flex items-center gap-1.5 ${
              activePreset === 'car'
                ? 'bg-blue-600 text-white font-semibold shadow-sm'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <Car className="w-3.5 h-3.5 text-cyan-300" />
            <span>3D Mobil</span>
          </button>
          <button
            onClick={() => setActivePreset('prism')}
            className={`px-2.5 py-1 rounded-lg transition-all whitespace-nowrap ${
              activePreset === 'prism'
                ? 'bg-blue-600 text-white font-semibold shadow-sm'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            Kristal Prop
          </button>
          <button
            onClick={() => setActivePreset('terminal')}
            className={`px-2.5 py-1 rounded-lg transition-all whitespace-nowrap ${
              activePreset === 'terminal'
                ? 'bg-blue-600 text-white font-semibold shadow-sm'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            Terminal IT
          </button>
          <button
            onClick={() => setActivePreset('cube')}
            className={`px-2.5 py-1 rounded-lg transition-all whitespace-nowrap ${
              activePreset === 'cube'
                ? 'bg-blue-600 text-white font-semibold shadow-sm'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            Kamera Studio
          </button>
        </div>
      </div>

      {/* Bottom Controls Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 bg-black/60 border-t border-white/[0.08] text-xs">
        {/* Color Palette Presets */}
        <div className="flex items-center gap-2">
          <span className="text-neutral-400 text-[11px]">Warna Cat / Material:</span>
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setColorTheme('blue')}
              title="Cobalt Blue"
              className={`w-5 h-5 rounded-full bg-blue-500 border transition-all ${
                colorTheme === 'blue'
                  ? 'border-white scale-110 shadow-md shadow-blue-500/50'
                  : 'border-transparent opacity-60 hover:opacity-100'
              }`}
            />
            <button
              onClick={() => setColorTheme('emerald')}
              title="Emerald Green"
              className={`w-5 h-5 rounded-full bg-emerald-500 border transition-all ${
                colorTheme === 'emerald'
                  ? 'border-white scale-110 shadow-md shadow-emerald-500/50'
                  : 'border-transparent opacity-60 hover:opacity-100'
              }`}
            />
            <button
              onClick={() => setColorTheme('amber')}
              title="Amber Gold"
              className={`w-5 h-5 rounded-full bg-amber-500 border transition-all ${
                colorTheme === 'amber'
                  ? 'border-white scale-110 shadow-md shadow-amber-500/50'
                  : 'border-transparent opacity-60 hover:opacity-100'
              }`}
            />
            <button
              onClick={() => setColorTheme('slate')}
              title="Titanium Slate"
              className={`w-5 h-5 rounded-full bg-slate-400 border transition-all ${
                colorTheme === 'slate'
                  ? 'border-white scale-110 shadow-md shadow-slate-500/50'
                  : 'border-transparent opacity-60 hover:opacity-100'
              }`}
            />
          </div>
        </div>

        {/* Toggles */}
        <div className="flex items-center gap-2">
          {/* Wireframe toggle */}
          <button
            onClick={() => setWireframe(!wireframe)}
            className={`px-2.5 py-1.5 rounded-lg border text-[11px] font-semibold transition-all flex items-center gap-1.5 whitespace-nowrap ${
              wireframe
                ? 'bg-blue-600/20 text-blue-300 border-blue-500/50 shadow-sm'
                : 'bg-white/[0.04] text-neutral-400 border-white/[0.08] hover:text-white hover:bg-white/[0.08]'
            }`}
          >
            <Box className="w-3 h-3" />
            <span>{wireframe ? 'Mesh: Wireframe' : 'Mesh: Shaded'}</span>
          </button>

          {/* Auto rotate toggle */}
          <button
            onClick={() => setIsRotating(!isRotating)}
            className={`px-2.5 py-1.5 rounded-lg border text-[11px] font-semibold transition-all flex items-center gap-1.5 whitespace-nowrap ${
              isRotating
                ? 'bg-emerald-600/20 text-emerald-300 border-emerald-500/50 shadow-sm'
                : 'bg-white/[0.04] text-neutral-400 border-white/[0.08] hover:text-white hover:bg-white/[0.08]'
            }`}
          >
            <RotateCw className={`w-3 h-3 ${isRotating ? 'animate-spin' : ''}`} />
            <span>{isRotating ? 'Rotasi: Aktif' : 'Rotasi: Diam'}</span>
          </button>

          {/* Reset position button */}
          <button
            onClick={resetView}
            title="Reset Posisi Kamera"
            className="p-1.5 rounded-lg border border-white/[0.08] bg-white/[0.04] text-neutral-400 hover:text-white hover:bg-white/[0.1] transition-colors"
          >
            <RefreshCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
