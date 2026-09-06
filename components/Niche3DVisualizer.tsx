"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";

interface Niche3DVisualizerProps {
  type: "ecommerce" | "cms" | "neural" | "analytics" | "cloud" | "physics" | "edge" | "kinetic";
  colorHex?: string;
  badge?: string;
}

interface Point3D {
  x: number;
  y: number;
  z: number;
  label?: string;
  isSatellite?: boolean;
}

interface Edge3D {
  from: number;
  to: number;
  accent?: boolean;
}



export const Niche3DVisualizer: React.FC<Niche3DVisualizerProps> = ({
  type,
  colorHex = "#00E599",
  badge = "3D SYSTEM ENGINE",
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Inertial physics and drag state tracked in refs for zero React re-renders
  const isDraggingRef = useRef(false);
  const lastMousePosRef = useRef({ x: 0, y: 0 });
  const velocityRef = useRef({ x: 0, y: 0.003 });
  const rotRef = useRef({ x: 0.28, y: 0.45 });
  const mouseHoverOffsetRef = useRef({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isDraggingState, setIsDraggingState] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;

    // Handle high-DPI scaling
    const updateSize = () => {
      if (!canvas || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const dpr = typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1;
      const w = Math.max(300, Math.floor(rect.width) || 480);
      const h = Math.max(280, Math.floor(rect.height) || 360);

      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
    };

    updateSize();
    window.addEventListener("resize", updateSize);

    let resizeObserver: ResizeObserver | null = null;
    if (typeof ResizeObserver !== "undefined" && containerRef.current) {
      resizeObserver = new ResizeObserver(() => {
        updateSize();
      });
      resizeObserver.observe(containerRef.current);
    }

    // Build 3D Geometric Mesh based on niche type
    const buildGeometry = (): { vertices: Point3D[]; edges: Edge3D[] } => {
      const vertices: Point3D[] = [];
      const edges: Edge3D[] = [];

      if (type === "ecommerce") {
        // 3D Isometric Cube Gateway + Dual Concentric Orbital Rings + Orbiting Commerce Satellites
        const size = 70;
        // 8 cube corners
        for (let x of [-size, size]) {
          for (let y of [-size, size]) {
            for (let z of [-size, size]) {
              vertices.push({ x, y, z });
            }
          }
        }
        // Cube Edges
        const cubeEdges = [
          [0, 1], [1, 3], [3, 2], [2, 0],
          [4, 5], [5, 7], [7, 6], [6, 4],
          [0, 4], [1, 5], [2, 6], [3, 7]
        ];
        cubeEdges.forEach(([from, to]) => edges.push({ from, to }));

        // Concentric Orbital Ring 1 (Horizontal)
        const ring1Start = vertices.length;
        const ring1Radius = size * 1.65;
        const ringPoints = 12;
        for (let i = 0; i < ringPoints; i++) {
          const theta = (i / ringPoints) * Math.PI * 2;
          vertices.push({
            x: Math.cos(theta) * ring1Radius,
            y: Math.sin(theta) * 12,
            z: Math.sin(theta) * ring1Radius,
          });
          edges.push({ from: ring1Start + i, to: ring1Start + ((i + 1) % ringPoints) });
        }

        // Satellites with Telemetry Badges
        vertices.push({ x: 0, y: -size * 1.6, z: 0, label: "HYDROGEN", isSatellite: true });
        vertices.push({ x: size * 1.7, y: 0, z: 0, label: "GRAPHQL", isSatellite: true });
        vertices.push({ x: 0, y: size * 1.6, z: 0, label: "CHECKOUT", isSatellite: true });
        vertices.push({ x: -size * 1.7, y: 0, z: 0, label: "0.00-CLS", isSatellite: true });
        vertices.push({ x: 0, y: 0, z: size * 1.7, label: "CART-EDGE", isSatellite: true });

        const satStart = vertices.length - 5;
        edges.push(
          { from: satStart, to: 0, accent: true },
          { from: satStart + 1, to: 1, accent: true },
          { from: satStart + 2, to: 7, accent: true },
          { from: satStart + 3, to: 6, accent: true },
          { from: satStart + 4, to: 5, accent: true }
        );

      } else if (type === "cms") {
        // Multi-tiered High-Speed Cache Cylinder (WPGraphQL -> Redis -> ISR Edge -> Varnish)
        const tiers = [-75, -25, 25, 75];
        const radius = 68;
        const segments = 8;
        const labels = ["WPGRAPHQL", "REDIS-CACHE", "ISR-EDGE", "VARNISH"];

        tiers.forEach((y, tIdx) => {
          const startIndex = vertices.length;
          for (let i = 0; i < segments; i++) {
            const angle = (i / segments) * Math.PI * 2;
            vertices.push({
              x: Math.cos(angle) * radius,
              y: y,
              z: Math.sin(angle) * radius,
              label: i === 0 ? labels[tIdx] : undefined,
            });
            // Ring edge
            const next = startIndex + ((i + 1) % segments);
            edges.push({ from: startIndex + i, to: next });

            // Vertical conduit
            if (tIdx > 0) {
              edges.push({ from: startIndex + i, to: startIndex + i - segments });
            }
          }
        });

        // Center Core Axis
        vertices.push({ x: 0, y: -95, z: 0, label: "HEADLESS-WP", isSatellite: true });
        vertices.push({ x: 0, y: 95, z: 0, label: "NEXTJS-SSG", isSatellite: true });
        const c1 = vertices.length - 2;
        const c2 = vertices.length - 1;
        edges.push({ from: c1, to: 0, accent: true }, { from: c2, to: 24, accent: true });

      } else if (type === "neural") {
        // AI Neural Synaptic Mesh & Workflow Orchestration
        const count = 18;
        const labels = [
          "N8N-CORE", "LLM-AGENT", "RABBITMQ", "CELERY", 
          "EMBEDDINGS", "VECTOR-DB", "TOOL-CALL", "PROMPT-EVAL"
        ];
        for (let i = 0; i < count; i++) {
          const phi = Math.acos(-1 + (2 * i) / count);
          const theta = Math.sqrt(count * Math.PI) * phi;
          const r = 75 + (i % 4) * 14;
          vertices.push({
            x: r * Math.cos(theta) * Math.sin(phi),
            y: r * Math.sin(theta) * Math.sin(phi),
            z: r * Math.cos(phi),
            label: labels[i] || undefined,
            isSatellite: i < labels.length,
          });
        }
        // Connect nearby synaptic nodes
        for (let i = 0; i < vertices.length; i++) {
          for (let j = i + 1; j < vertices.length; j++) {
            const dx = vertices[i].x - vertices[j].x;
            const dy = vertices[i].y - vertices[j].y;
            const dz = vertices[i].z - vertices[j].z;
            const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
            if (dist < 88) {
              edges.push({ from: i, to: j, accent: dist < 60 });
            }
          }
        }

      } else if (type === "analytics") {
        // Multi-Touch Attribution Globe & Server-Side Event Beacons
        const rings = 5;
        const pointsPerRing = 10;
        const radius = 80;
        const labels = ["META-CAPI", "GA4-EDGE", "BIGQUERY", "SHA256-EMQ", "OFFLINE-SYNC"];

        for (let r = 0; r < rings; r++) {
          const lat = ((r + 1) / (rings + 1) - 0.5) * Math.PI;
          const ringY = Math.sin(lat) * radius;
          const ringRad = Math.cos(lat) * radius;
          const start = vertices.length;

          for (let p = 0; p < pointsPerRing; p++) {
            const lon = (p / pointsPerRing) * Math.PI * 2;
            vertices.push({
              x: Math.cos(lon) * ringRad,
              y: ringY,
              z: Math.sin(lon) * ringRad,
              label: p === 0 ? labels[r] : undefined,
            });
            edges.push({ from: start + p, to: start + ((p + 1) % pointsPerRing) });
            if (r > 0) {
              edges.push({ from: start + p, to: start + p - pointsPerRing });
            }
          }
        }

      } else if (type === "cloud") {
        // Kubernetes Pod Matrix & Ingress Topology
        const s = 68;
        const corners = [
          [-s, -s, -s], [s, -s, -s], [s, s, -s], [-s, s, -s],
          [-s, -s, s], [s, -s, s], [s, s, s], [-s, s, s],
        ];
        const labels = [
          "K8S-INGRESS", "POD-REPLICA-A", "TERRAFORM", "GITOPS", 
          "99.99%-SLA", "AUTO-SCALE", "VAULT-SECRETS", "GRAFANA-LOKI"
        ];
        corners.forEach(([x, y, z], idx) => {
          vertices.push({ x, y, z, label: labels[idx] });
        });
        const cEdges = [
          [0, 1], [1, 2], [2, 3], [3, 0],
          [4, 5], [5, 6], [6, 7], [7, 4],
          [0, 4], [1, 5], [2, 6], [3, 7],
          [0, 6], [1, 7], [2, 4], [3, 5] // Internal Cross conduits
        ];
        cEdges.forEach(([from, to]) => edges.push({ from, to, accent: from + to > 8 }));

      } else if (type === "physics") {
        // High-Precision Geodesic Polyhedron / WebGL 3D Engine
        const t = (1 + Math.sqrt(5)) / 2;
        const scale = 50;
        const raw = [
          [-1, t, 0], [1, t, 0], [-1, -t, 0], [1, -t, 0],
          [0, -1, t], [0, 1, t], [0, -1, -t], [0, 1, -t],
          [t, 0, -1], [t, 0, 1], [-t, 0, -1], [-t, 0, 1]
        ];
        const labels = ["WEBGL-60FPS", "GLSL-SHADER", "DRACO-MESH", "THREE.JS", "PHYSX-CORE", "PBR-TEXTURE"];
        raw.forEach(([x, y, z], idx) => {
          vertices.push({ x: x * scale, y: y * scale, z: z * scale, label: labels[idx] });
        });
        for (let i = 0; i < vertices.length; i++) {
          for (let j = i + 1; j < vertices.length; j++) {
            const dx = vertices[i].x - vertices[j].x;
            const dy = vertices[i].y - vertices[j].y;
            const dz = vertices[i].z - vertices[j].z;
            const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
            if (dist < scale * 2.15) {
              edges.push({ from: i, to: j });
            }
          }
        }

      } else if (type === "edge") {
        // Next.js Distributed Edge Lattice
        const layers = 3;
        const count = 5;
        const labels = [
          "NEXT15-APP", "SERVER-ACTIONS", "EDGE-WORKER", 
          "<45MS-TTFB", "CACHE-TAGS", "POSTGRES-POOL", "TURBOPACK"
        ];
        let idx = 0;
        for (let l = -1; l <= 1; l++) {
          for (let c = 0; c < count; c++) {
            const angle = (c / count) * Math.PI * 2;
            const r = 70;
            vertices.push({
              x: Math.cos(angle) * r,
              y: l * 60,
              z: Math.sin(angle) * r,
              label: labels[idx++] || undefined,
            });
          }
        }
        for (let i = 0; i < vertices.length; i++) {
          for (let j = i + 1; j < vertices.length; j++) {
            const d = Math.hypot(vertices[i].x - vertices[j].x, vertices[i].y - vertices[j].y, vertices[i].z - vertices[j].z);
            if (d < 85) edges.push({ from: i, to: j });
          }
        }

      } else {
        // Kinetic Helix / Design Token Wave
        const count = 18;
        const labels = ["DESIGN-TOKENS", "FIGMA-VARS", "FRAMER-MOTION", "MICRO-UX", "TAILWIND-V4"];
        for (let i = 0; i < count; i++) {
          const t = (i / count) * Math.PI * 4;
          const y = (i / count - 0.5) * 160;
          // First strand
          vertices.push({
            x: Math.cos(t) * 60,
            y: y,
            z: Math.sin(t) * 60,
            label: i % 4 === 0 ? labels[i / 4] : undefined,
          });
          const idx = vertices.length - 1;
          if (idx > 1) edges.push({ from: idx - 2, to: idx });

          // Second strand
          vertices.push({
            x: Math.cos(t + Math.PI) * 60,
            y: y,
            z: Math.sin(t + Math.PI) * 60,
          });
          const curr = vertices.length - 1;
          if (curr > 2) edges.push({ from: curr - 2, to: curr });
          edges.push({ from: curr - 1, to: curr, accent: true }); // Cross rung
        }
      }

      return { vertices, edges };
    };

    const geometry = buildGeometry();



    const render = (time: number) => {
      const dpr = typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1;
      const w = canvas.width / dpr;
      const h = canvas.height / dpr;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.save();
      ctx.scale(dpr, dpr);

      const centerX = w / 2;
      const centerY = h / 2;
      const focalLength = 360;

      // Deep space radial gradient background
      const bgGrad = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, Math.max(w, h) * 0.7);
      bgGrad.addColorStop(0, "rgba(5, 12, 30, 0.85)");
      bgGrad.addColorStop(0.5, "rgba(2, 6, 18, 0.7)");
      bgGrad.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, w, h);

      // Physics: Apply inertia / damping when not actively dragged
      if (!isDraggingRef.current) {
        velocityRef.current.x *= 0.94;
        velocityRef.current.y *= 0.94;

        // Base continuous rotation
        velocityRef.current.y += (0.0022 - velocityRef.current.y) * 0.05;

        rotRef.current.x += velocityRef.current.x;
        rotRef.current.y += velocityRef.current.y;
      }

      // Add gentle harmonic breathing wobble
      const harmonicTiltX = Math.sin(time * 0.0008) * 0.04;
      const harmonicTiltY = Math.cos(time * 0.0006) * 0.04;

      // Smooth mouse hover parallax
      const targetParallaxX = mouseHoverOffsetRef.current.y * 0.25;
      const targetParallaxY = mouseHoverOffsetRef.current.x * 0.25;

      const curAngleX = rotRef.current.x + harmonicTiltX + targetParallaxX;
      const curAngleY = rotRef.current.y + harmonicTiltY + targetParallaxY;

      const cosY = Math.cos(curAngleY);
      const sinY = Math.sin(curAngleY);
      const cosX = Math.cos(curAngleX);
      const sinX = Math.sin(curAngleX);

      // Project 3D point to 2D screen coordinate
      const project = (p: { x: number; y: number; z: number }) => {
        // Rotate around Y
        const x1 = p.x * cosY + p.z * sinY;
        const z1 = -p.x * sinY + p.z * cosY;

        // Rotate around X
        const y2 = p.y * cosX - z1 * sinX;
        const z2 = p.y * sinX + z1 * cosX;

        // Perspective scale with safety clamp
        const scale = focalLength / (focalLength + z2 + 120);
        return {
          x: centerX + x1 * scale,
          y: centerY + y2 * scale,
          z: z2,
          scale,
        };
      };

      // -------------------------------------------------------------
      // 1. Draw 3D Edges / Wireframes
      // -------------------------------------------------------------
      geometry.edges.forEach((edge) => {
        const p1 = geometry.vertices[edge.from];
        const p2 = geometry.vertices[edge.to];
        if (!p1 || !p2) return;

        const proj1 = project(p1);
        const proj2 = project(p2);

        // Depth cueing calculation
        const avgZ = (proj1.z + proj2.z) / 2;
        const edgeAlpha = Math.min(1.0, Math.max(0.35, (avgZ + 150) / 240));

        ctx.beginPath();
        ctx.moveTo(proj1.x, proj1.y);
        ctx.lineTo(proj2.x, proj2.y);
        ctx.strokeStyle = edge.accent ? "#ffffff" : colorHex;
        ctx.lineWidth = edge.accent
          ? Math.max(1.8, 2.8 * ((proj1.scale + proj2.scale) / 2))
          : Math.max(1.2, 2.0 * ((proj1.scale + proj2.scale) / 2));
        ctx.globalAlpha = edge.accent ? Math.min(1, edgeAlpha * 1.2) : edgeAlpha * 0.85;
        ctx.stroke();

        // High-speed data packet photon along edge
        const speedMultiplier = edge.accent ? 0.0018 : 0.0012;
        const packetPhase = (time * speedMultiplier + (edge.from * 0.37)) % 1;
        const packetX = proj1.x + (proj2.x - proj1.x) * packetPhase;
        const packetY = proj1.y + (proj2.y - proj1.y) * packetPhase;

        ctx.beginPath();
        ctx.arc(packetX, packetY, edge.accent ? 2.5 : 2.0, 0, Math.PI * 2);
        ctx.fillStyle = "#ffffff";
        ctx.shadowColor = edge.accent ? "#00F0FF" : colorHex;
        ctx.shadowBlur = 8;
        ctx.globalAlpha = 1.0;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // -------------------------------------------------------------
      // 3. Draw 3D Nodes & Monospace Labels (Depth-sorted)
      // -------------------------------------------------------------
      const projectedNodes = geometry.vertices.map((v, originalIdx) => ({
        ...v,
        originalIdx,
        proj: project(v),
      }));

      // Sort back-to-front
      projectedNodes.sort((a, b) => a.proj.z - b.proj.z);

      projectedNodes.forEach((node) => {
        const { proj, label, isSatellite } = node;
        const nodeAlpha = Math.min(1.0, Math.max(0.4, (proj.z + 140) / 220));

        // Node Glow Halo
        const glowRadius = isSatellite
          ? Math.max(3.0, 5.0 * proj.scale)
          : Math.max(2.0, 3.5 * proj.scale);

        ctx.beginPath();
        ctx.arc(proj.x, proj.y, glowRadius, 0, Math.PI * 2);
        ctx.fillStyle = colorHex;
        ctx.shadowColor = colorHex;
        ctx.shadowBlur = 10 * proj.scale;
        ctx.globalAlpha = Math.max(0.75, nodeAlpha);
        ctx.fill();

        // Node Center Core
        const coreRadius = isSatellite
          ? Math.max(1.4, 2.0 * proj.scale)
          : Math.max(1.0, 1.6 * proj.scale);

        ctx.beginPath();
        ctx.arc(proj.x, proj.y, coreRadius, 0, Math.PI * 2);
        ctx.fillStyle = "#ffffff";
        ctx.shadowBlur = 0;
        ctx.globalAlpha = 1.0;
        ctx.fill();

        // Monospace Telemetry Badge
        if (label && nodeAlpha > 0.35) {
          const fontSize = Math.max(9, Math.floor(10.5 * proj.scale));
          ctx.font = `bold ${fontSize}px 'JetBrains Mono', monospace`;

          const textWidth = ctx.measureText(label).width;
          const padX = 6;
          const padY = 3;
          const bgX = proj.x + 8;
          const bgY = proj.y - 12;

          // Glass backdrop
          ctx.fillStyle = "rgba(10, 15, 25, 0.88)";
          ctx.fillRect(bgX - 2, bgY - 2, textWidth + padX * 2, fontSize + padY * 2);

          // Neon Border
          ctx.strokeStyle = isSatellite ? "#00F0FF" : colorHex;
          ctx.lineWidth = 1.2;
          ctx.strokeRect(bgX - 2, bgY - 2, textWidth + padX * 2, fontSize + padY * 2);

          // Telemetry Text
          ctx.fillStyle = isSatellite ? "#ffffff" : colorHex;
          ctx.globalAlpha = 1.0;
          ctx.fillText(label, bgX + padX - 2, bgY + fontSize);
        }
      });

      ctx.restore();
      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", updateSize);
      if (resizeObserver) resizeObserver.disconnect();
    };
  }, [type, colorHex]);

  // Pointer & Touch Interaction Handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    isDraggingRef.current = true;
    setIsDraggingState(true);
    lastMousePosRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width - 0.5;
    const ny = (e.clientY - rect.top) / rect.height - 0.5;
    mouseHoverOffsetRef.current = { x: nx * 1.5, y: ny * 1.5 };

    if (isDraggingRef.current) {
      const dx = e.clientX - lastMousePosRef.current.x;
      const dy = e.clientY - lastMousePosRef.current.y;
      lastMousePosRef.current = { x: e.clientX, y: e.clientY };

      rotRef.current.y += dx * 0.009;
      rotRef.current.x -= dy * 0.009;

      velocityRef.current = {
        x: -dy * 0.009,
        y: dx * 0.009,
      };
    }
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
    setIsDraggingState(false);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      isDraggingRef.current = true;
      setIsDraggingState(true);
      lastMousePosRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (isDraggingRef.current && e.touches.length === 1) {
      const dx = e.touches[0].clientX - lastMousePosRef.current.x;
      const dy = e.touches[0].clientY - lastMousePosRef.current.y;
      lastMousePosRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };

      rotRef.current.y += dx * 0.01;
      rotRef.current.x -= dy * 0.01;

      velocityRef.current = {
        x: -dy * 0.01,
        y: dx * 0.01,
      };
    }
  };

  const handleTouchEnd = () => {
    isDraggingRef.current = false;
    setIsDraggingState(false);
  };

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        isDraggingRef.current = false;
        setIsDraggingState(false);
        mouseHoverOffsetRef.current = { x: 0, y: 0 };
      }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className={`relative w-full h-80 sm:h-96 rounded-tech-md border border-border-tech bg-slate-950/90 overflow-hidden shadow-2xl backdrop-blur-xl transition-all duration-300 select-none ${
        isDraggingState ? "cursor-grabbing ring-2 ring-volt-cyan/40" : "cursor-grab"
      }`}
    >
      {/* HUD Corner Tech Accents */}
      <div className="absolute top-2.5 left-3 font-mono text-[9px] text-text-muted/70 tracking-wider flex items-center space-x-1.5 z-10 pointer-events-none">
        <span
          className="h-2 w-2 rounded-full animate-ping"
          style={{ backgroundColor: colorHex }}
        />
        <span className="font-bold text-white/90">[{badge}]</span>
      </div>

      <div className="absolute top-2.5 right-3 font-mono text-[9px] text-text-muted/70 tracking-wider z-10 pointer-events-none flex items-center space-x-2">
        <span className="inline-flex items-center px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold border border-emerald-500/30">
          60FPS
        </span>
        <span className="text-white/70 font-semibold">WIRE_3D // REALTIME_RENDER</span>
      </div>

      <div className="absolute bottom-2.5 left-3 font-mono text-[9px] text-text-muted/70 z-10 pointer-events-none">
        {isDraggingState ? (
          <span className="text-volt-cyan font-bold">DRAGGING & ROTATING 3D PERSPECTIVE</span>
        ) : isHovered ? (
          <span className="text-emerald-400 font-medium">CLICK & DRAG TO ROTATE // DATA PACKETS ACTIVE</span>
        ) : (
          <span>INTERACTIVE 3D // DRAG TO EXPLORE</span>
        )}
      </div>

      <div className="absolute bottom-2.5 right-3 font-mono text-[9px] text-emerald-400/80 z-10 pointer-events-none">
        HARDWARE_ACCELERATED // DPR_AWARE
      </div>

      {/* Grid Pattern in Background */}
      <div 
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(${colorHex} 1px, transparent 1px)`,
          backgroundSize: "24px 24px"
        }}
      />

      {/* Main 3D Canvas */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full" 
      />
    </div>
  );
};
