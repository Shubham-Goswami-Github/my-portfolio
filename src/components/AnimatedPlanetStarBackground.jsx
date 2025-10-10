import { useRef, useEffect } from "react";

/**
 * AnimatedPlanetStarBackground
 * Usage: <AnimatedPlanetStarBackground />
 * Renders a full-screen animated canvas of planets and stars with continuous flow.
 * Place as the first child in your section/component for seamless background.
 */
const AnimatedPlanetStarBackground = () => {
  const canvasRef = useRef(null);
  useEffect(() => {
    // Ball physics config
    const BALLS = [
      { x: 120, y: 180, r: 38, color: "#e16928", vx: 2, vy: 2.5 },
      { x: 420, y: 120, r: 32, color: "#FFD700", vx: -2.2, vy: 1.8 },
      { x: 300, y: 320, r: 26, color: "#e16928", vx: 1.5, vy: -2.2 },
    ];
    function getDistance(x1, y1, x2, y2) {
      return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
    }
    const ballsRef = { current: BALLS.map(ball => ({ ...ball })) };
    const dragRef = { current: { dragging: false, ballIdx: null, offsetX: 0, offsetY: 0 } };
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
    // Planets
    const planets = [
      { x: width * 0.2, y: height * 0.3, r: 60, color: "#e16928", dx: 0.2, dy: 0.1 },
      { x: width * 0.7, y: height * 0.7, r: 40, color: "#fcd34d", dx: -0.15, dy: 0.18 },
      { x: width * 0.5, y: height * 0.15, r: 30, color: "#38bdf8", dx: 0.12, dy: -0.13 },
    ];
    // Stars
    const stars = Array.from({ length: 120 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 1.2 + 0.5,
      twinkle: Math.random() * 0.5 + 0.5,
      speed: Math.random() * 0.2 + 0.05,
    }));
    // Falling stars
    let fallingStars = [];
    function spawnFallingStar() {
      fallingStars.push({
        x: Math.random() * width,
        y: -10,
        r: Math.random() * 2 + 1,
        dx: Math.random() * 2 - 1,
        dy: Math.random() * 3 + 2,
        alpha: 1,
      });
    }
    let lastFallingStar = 0;
    let lastTime = performance.now();
    function animateBg(ts) {
      const dt = Math.min((ts - lastTime) / 16.67, 2); // normalize to ~60fps, max 2x speed
      lastTime = ts;
      ctx.clearRect(0, 0, width, height);
      // Planets
      planets.forEach((p) => {
        ctx.save();
        ctx.globalAlpha = 0.7;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, 2 * Math.PI);
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 40;
        ctx.fill();
        ctx.restore();
        // Move
        p.x += p.dx * dt;
        p.y += p.dy * dt;
        if (p.x < -p.r) p.x = width + p.r;
        if (p.x > width + p.r) p.x = -p.r;
        if (p.y < -p.r) p.y = height + p.r;
        if (p.y > height + p.r) p.y = -p.r;
      });
      // Stars
      stars.forEach((s, i) => {
        ctx.save();
        ctx.globalAlpha = s.twinkle + Math.sin(ts / 500 + i) * 0.3;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, 2 * Math.PI);
        ctx.fillStyle = "#fff";
        ctx.shadowColor = "#fff";
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.restore();
        // Move
        s.x += s.speed * dt;
        if (s.x > width) s.x = 0;
      });
      // Falling stars
      fallingStars.forEach((fs) => {
        ctx.save();
        ctx.globalAlpha = fs.alpha;
        ctx.beginPath();
        ctx.arc(fs.x, fs.y, fs.r, 0, 2 * Math.PI);
        ctx.fillStyle = "#fff";
        ctx.shadowColor = "#fff";
        ctx.shadowBlur = 20;
        ctx.fill();
        ctx.restore();
        // Move
        fs.x += fs.dx * dt;
        fs.y += fs.dy * dt;
        fs.alpha -= 0.008 * dt;
      });
      fallingStars = fallingStars.filter((fs) => fs.y < height && fs.alpha > 0.1);
      // Spawn falling star every 1.5s
      if (ts - lastFallingStar > 1500) {
        spawnFallingStar();
        lastFallingStar = ts;
      }
      // Balls (draggable, bouncing)
      ballsRef.current.forEach((ball, idx) => {
        // If dragging, skip physics
        if (dragRef.current.dragging && dragRef.current.ballIdx === idx) return;
        ball.x += ball.vx * dt;
        ball.y += ball.vy * dt;
        // Bounce on edges
        if (ball.x - ball.r < 0) {
          ball.x = ball.r;
          ball.vx *= -1.2; // more bounce
        }
        if (ball.x + ball.r > width) {
          ball.x = width - ball.r;
          ball.vx *= -1.2;
        }
        if (ball.y - ball.r < 0) {
          ball.y = ball.r;
          ball.vy *= -1.2;
        }
        if (ball.y + ball.r > height) {
          ball.y = height - ball.r;
          ball.vy *= -1.2;
        }
        // Friction (smoother)
        ball.vx *= 0.985;
        ball.vy *= 0.985;
      });
      // Draw balls
      ballsRef.current.forEach(ball => {
        ctx.save();
        ctx.beginPath();
        ctx.arc(ball.x, ball.y, ball.r, 0, 2 * Math.PI);
        ctx.fillStyle = ball.color;
        ctx.shadowColor = ball.color;
        ctx.shadowBlur = 30;
        ctx.globalAlpha = 0.7;
        ctx.fill();
        ctx.restore();
      });
      requestAnimationFrame(animateBg);
    }
    animateBg(performance.now());
    // Mouse/touch events
    function getBallIdx(x, y) {
      return ballsRef.current.findIndex(ball => getDistance(ball.x, ball.y, x, y) < ball.r);
    }
    function onDown(e) {
      const rect = canvas.getBoundingClientRect();
      const x = (e.touches ? e.touches[0].clientX : e.clientX) - rect.left;
      const y = (e.touches ? e.touches[0].clientY : e.clientY) - rect.top;
      const idx = getBallIdx(x, y);
      if (idx !== -1) {
        dragRef.current.dragging = true;
        dragRef.current.ballIdx = idx;
        dragRef.current.offsetX = x - ballsRef.current[idx].x;
        dragRef.current.offsetY = y - ballsRef.current[idx].y;
      }
    }
    function onMove(e) {
      if (!dragRef.current.dragging) return;
      const rect = canvas.getBoundingClientRect();
      const x = (e.touches ? e.touches[0].clientX : e.clientX) - rect.left;
      const y = (e.touches ? e.touches[0].clientY : e.clientY) - rect.top;
      const idx = dragRef.current.ballIdx;
      ballsRef.current[idx].x = x - dragRef.current.offsetX;
      ballsRef.current[idx].y = y - dragRef.current.offsetY;
      // Set velocity to zero while dragging
      ballsRef.current[idx].vx = 0;
      ballsRef.current[idx].vy = 0;
    }
    function onUp(e) {
      if (!dragRef.current.dragging) return;
      dragRef.current.dragging = false;
      dragRef.current.ballIdx = null;
    }
    canvas.addEventListener("mousedown", onDown);
    canvas.addEventListener("mousemove", onMove);
    canvas.addEventListener("mouseup", onUp);
    canvas.addEventListener("touchstart", onDown);
    canvas.addEventListener("touchmove", onMove);
    canvas.addEventListener("touchend", onUp);
    // Resize handler
    function handleResize() {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    }
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      canvas.removeEventListener("mousedown", onDown);
      canvas.removeEventListener("mousemove", onMove);
      canvas.removeEventListener("mouseup", onUp);
      canvas.removeEventListener("touchstart", onDown);
      canvas.removeEventListener("touchmove", onMove);
      canvas.removeEventListener("touchend", onUp);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 0,
        pointerEvents: "auto",
      }}
    ></canvas>
  );
}

export default AnimatedPlanetStarBackground;
