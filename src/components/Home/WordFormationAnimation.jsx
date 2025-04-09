import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';

const WordFormationAnimation = () => {
  const canvasRef = useRef(null);
  const textCanvasRef = useRef(null);
  const particles = useRef([]);

  useEffect(() => {
    const width = 800;
    const height = 200;
    const particleSize = 2.5;
    const gap = 3;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = width;
    canvas.height = height;

    const textCanvas = textCanvasRef.current;
    const textCtx = textCanvas.getContext('2d');
    textCanvas.width = width;
    textCanvas.height = height;

    const getCoords = (text, offsetX = 0) => {
      textCtx.clearRect(0, 0, width, height);
      textCtx.fillStyle = '#fff';
      textCtx.font = 'bold 60px Segoe UI';
      textCtx.textAlign = 'left';
      textCtx.textBaseline = 'middle';
      textCtx.fillText(text, offsetX, height / 2);

      const imageData = textCtx.getImageData(0, 0, width, height).data;
      const coords = [];

      for (let y = 0; y < height; y += gap) {
        for (let x = 0; x < width; x += gap) {
          const i = (y * width + x) * 4;
          if (imageData[i + 3] > 128) {
            coords.push({ x, y });
          }
        }
      }

      return coords;
    };

    const offsetStart = 100;
    const miCoords = getCoords('Mi', offsetStart);
    const infoCoords = getCoords('Información', offsetStart + 100);
    const personalCoords = getCoords('Personal', offsetStart + 430);

    const totalCoords = [...miCoords, ...infoCoords, ...personalCoords];

    // Inicializa todas las partículas desde el principio
    particles.current = totalCoords.map(({ x, y }) => ({
      x: (Math.random() - 0.5) * width,
      y: (Math.random() - 0.5) * height,
      tx: x,
      ty: y,
      visible: false,
    }));

    // Mostrar por grupos
    const animateGroup = (start, end, delayOffset = 0) => {
      particles.current.slice(start, end).forEach((p) => {
        p.visible = true;
        gsap.to(p, {
          x: p.tx - width / 2,
          y: p.ty - height / 2,
          duration: 1.5,
          delay: Math.random() * 0.5 + delayOffset,
          ease: 'power3.out',
        });
      });
    };

    // Animar en secuencia
    setTimeout(() => animateGroup(0, miCoords.length), 500); // "Mi"
    setTimeout(() => animateGroup(miCoords.length, miCoords.length + infoCoords.length), 2500); // "Información"
    setTimeout(() => animateGroup(miCoords.length + infoCoords.length, totalCoords.length), 4500); // "Personal"

    // Loop de render
    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.save();
      ctx.translate(width / 2, height / 2);
      particles.current.forEach((p) => {
        if (p.visible) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, particleSize, 0, Math.PI * 2);
          ctx.fillStyle = '#f5d76e';
          ctx.fill();
        }
      });
      ctx.restore();
      requestAnimationFrame(draw);
    };

    draw();
  }, []);

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '200px',
        margin: '2rem 0',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <canvas ref={canvasRef} style={{ maxWidth: '100%' }} />
      <canvas ref={textCanvasRef} style={{ display: 'none' }} />
    </div>
  );
};

export default WordFormationAnimation;
