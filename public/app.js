/* Uppfinnarlådan – kombinera delar till något nytt, och använd det.
 *
 * Tänkandet som tränas: A + B blir C, och C behövs för nästa steg. Nivåerna
 * lägger bara till djup i kedjan – samma regel hela tiden:
 *   1–2:  två delar blir en sak
 *   3–6:  det man byggt behövs för nästa steg (beroende)
 *   7:    två grenar som möts
 *   8:    tre steg djupt, med en pinne i hjulet (delar som inte passar)
 *
 * Inget textberoende: delarna ritas, lådan talar, och målet visas som siluett.
 */
(() => {
  "use strict";

  /* ---------- små ritverktyg -------------------------------------------- */
  function rr(c, x, y, w, h, r) {
    const rad = Math.min(r, w / 2, h / 2);
    c.beginPath();
    c.moveTo(x + rad, y);
    c.arcTo(x + w, y, x + w, y + h, rad);
    c.arcTo(x + w, y + h, x, y + h, rad);
    c.arcTo(x, y + h, x, y, rad);
    c.arcTo(x, y, x + w, y, rad);
    c.closePath();
  }

  function cirkel(c, x, y, r) {
    c.beginPath();
    c.arc(x, y, r, 0, 6.2832);
  }

  function linje(c, x1, y1, x2, y2, w, farg) {
    c.strokeStyle = farg;
    c.lineWidth = w;
    c.lineCap = "round";
    c.beginPath();
    c.moveTo(x1, y1);
    c.lineTo(x2, y2);
    c.stroke();
  }

  /* ---------- delarna, ritade i kod ------------------------------------- */
  // Varje del ritas i en ruta som är 2r bred, centrerad i (0,0).
  const DELAR = {
    papper: { namn: "papper", farg: "#8fa9c4" },
    pinne: { namn: "pinne", farg: "#a97c50" },
    drake: { namn: "drake", farg: "#d94a3d" },
    tyg: { namn: "tyg", farg: "#c96f8f" },
    ull: { namn: "ull", farg: "#d8cdbe" },
    kudde: { namn: "kudde", farg: "#c96f8f" },
    segel: { namn: "segel", farg: "#e8e2d6" },
    bräda: { namn: "bräda", farg: "#a97c50" },
    båt: { namn: "båt", farg: "#7fa2b8" },
    hjul: { namn: "hjul", farg: "#4a5560" },
    axel: { namn: "axel", farg: "#8b949e" },
    sparkcykel: { namn: "sparkcykel", farg: "#4a7d9f" },
    glödlampa: { namn: "glödlampa", farg: "#e9b62f" },
    sladd: { namn: "sladd", farg: "#4a5560" },
    lampa: { namn: "lampa", farg: "#e9b62f" },
    batteri: { namn: "batteri", farg: "#6f8f5f" },
    ficklampa: { namn: "ficklampa", farg: "#5a6672" },
    låda: { namn: "låda", farg: "#a97c50" },
    fönster: { namn: "fönster", farg: "#7fa2b8" },
    fågelholk: { namn: "fågelholk", farg: "#a97c50" },
    metall: { namn: "metall", farg: "#8b949e" },
    medar: { namn: "medar", farg: "#8b949e" },
    sits: { namn: "sits", farg: "#c96f8f" },
    spark: { namn: "spark", farg: "#4a7d9f" },
    vinge: { namn: "vinge", farg: "#8fa9c4" },
    snurra: { namn: "snurra", farg: "#d98f3d" },
    spik: { namn: "spik", farg: "#8b949e" },
    vindsnurra: { namn: "vindsnurra", farg: "#d94a3d" },
  };

  const RITA = {
    papper(c, r) {
      c.fillStyle = "#fdfbf7";
      rr(c, -r * 0.72, -r * 0.82, r * 1.44, r * 1.72, r * 0.12);
      c.fill();
      c.fillStyle = "#dfe6ee";
      c.beginPath();
      c.moveTo(r * 0.42, -r * 0.82);
      c.lineTo(r * 0.72, -r * 0.52);
      c.lineTo(r * 0.42, -r * 0.52);
      c.closePath();
      c.fill();
      linje(c, -r * 0.5, -r * 0.2, r * 0.5, -r * 0.2, r * 0.09, "#b9c6d4");
      linje(c, -r * 0.5, r * 0.12, r * 0.28, r * 0.12, r * 0.09, "#b9c6d4");
      linje(c, -r * 0.5, r * 0.44, r * 0.4, r * 0.44, r * 0.09, "#b9c6d4");
    },
    pinne(c, r) {
      c.save();
      c.rotate(-0.6);
      c.fillStyle = "#a97c50";
      rr(c, -r * 0.86, -r * 0.11, r * 1.72, r * 0.22, r * 0.11);
      c.fill();
      c.fillStyle = "#8a6238";
      cirkel(c, r * 0.55, 0, r * 0.055);
      c.fill();
      c.restore();
    },
    drake(c, r) {
      c.save();
      c.rotate(0.25);
      c.fillStyle = "#d94a3d";
      c.beginPath();
      c.moveTo(0, -r * 0.9);
      c.lineTo(r * 0.62, 0);
      c.lineTo(0, r * 0.86);
      c.lineTo(-r * 0.62, 0);
      c.closePath();
      c.fill();
      c.fillStyle = "#e9b62f";
      c.beginPath();
      c.moveTo(0, -r * 0.45);
      c.lineTo(r * 0.3, 0);
      c.lineTo(0, r * 0.42);
      c.lineTo(-r * 0.3, 0);
      c.closePath();
      c.fill();
      c.restore();
      c.strokeStyle = "#8a6238";
      c.lineWidth = r * 0.09;
      c.beginPath();
      c.moveTo(0, r * 0.86);
      c.quadraticCurveTo(r * 0.5, r * 1.1, r * 0.2, r * 0.95);
      c.stroke();
    },
    tyg(c, r) {
      c.fillStyle = "#c96f8f";
      c.beginPath();
      c.moveTo(-r * 0.8, -r * 0.6);
      c.quadraticCurveTo(0, -r * 0.85, r * 0.8, -r * 0.6);
      c.quadraticCurveTo(r * 0.95, 0, r * 0.8, r * 0.6);
      c.quadraticCurveTo(0, r * 0.85, -r * 0.8, r * 0.6);
      c.quadraticCurveTo(-r * 0.95, 0, -r * 0.8, -r * 0.6);
      c.closePath();
      c.fill();
      c.strokeStyle = "rgba(255,255,255,0.5)";
      c.lineWidth = r * 0.08;
      c.beginPath();
      c.moveTo(-r * 0.5, -r * 0.1);
      c.quadraticCurveTo(0, -r * 0.32, r * 0.5, -r * 0.1);
      c.moveTo(-r * 0.5, r * 0.28);
      c.quadraticCurveTo(0, r * 0.06, r * 0.5, r * 0.28);
      c.stroke();
    },
    ull(c, r) {
      const tofsar = [[-0.42, 0.05, 0.44], [0.42, 0.05, 0.44], [0, -0.38, 0.5], [0, 0.36, 0.44]];
      c.fillStyle = "#e7dccb";
      tofsar.forEach(([x, y, s]) => {
        cirkel(c, x * r, y * r, s * r);
        c.fill();
      });
      c.strokeStyle = "#c3b39c";
      c.lineWidth = r * 0.07;
      tofsar.forEach(([x, y, s]) => {
        cirkel(c, x * r, y * r, s * r);
        c.stroke();
      });
      c.fillStyle = "#efe6d7";
      cirkel(c, 0, 0, r * 0.34);
      c.fill();
      c.strokeStyle = "#c3b39c";
      c.lineWidth = r * 0.06;
      c.beginPath();
      c.arc(0, 0, r * 0.2, 0.4, 2.6);
      c.stroke();
    },
    kudde(c, r) {
      c.fillStyle = "#c96f8f";
      c.beginPath();
      c.moveTo(-r * 0.86, -r * 0.66);
      c.quadraticCurveTo(0, -r * 0.92, r * 0.86, -r * 0.66);
      c.quadraticCurveTo(r * 0.98, 0, r * 0.86, r * 0.66);
      c.quadraticCurveTo(0, r * 0.92, -r * 0.86, r * 0.66);
      c.quadraticCurveTo(-r * 0.98, 0, -r * 0.86, -r * 0.66);
      c.closePath();
      c.fill();
      c.strokeStyle = "rgba(255,255,255,0.45)";
      c.lineWidth = r * 0.08;
      c.beginPath();
      c.moveTo(-r * 0.6, r * 0.5);
      c.lineTo(r * 0.6, -r * 0.5);
      c.stroke();
    },
    segel(c, r) {
      c.fillStyle = "#a97c50";
      rr(c, -r * 0.08, -r * 0.86, r * 0.16, r * 1.72, r * 0.08);
      c.fill();
      c.fillStyle = "#f7f2e8";
      c.beginPath();
      c.moveTo(r * 0.08, -r * 0.8);
      c.quadraticCurveTo(r * 0.86, -r * 0.1, r * 0.1, r * 0.6);
      c.closePath();
      c.fill();
      c.strokeStyle = "#d9cfbe";
      c.lineWidth = r * 0.06;
      c.stroke();
    },
    bräda(c, r) {
      c.save();
      c.rotate(-0.16);
      c.fillStyle = "#b98a58";
      rr(c, -r * 0.92, -r * 0.3, r * 1.84, r * 0.6, r * 0.14);
      c.fill();
      c.strokeStyle = "rgba(120,84,48,0.45)";
      c.lineWidth = r * 0.07;
      c.beginPath();
      c.moveTo(-r * 0.6, -r * 0.1);
      c.lineTo(r * 0.2, -r * 0.1);
      c.moveTo(-r * 0.2, r * 0.12);
      c.lineTo(r * 0.6, r * 0.12);
      c.stroke();
      c.restore();
    },
    båt(c, r) {
      c.fillStyle = "#f7f2e8";
      c.beginPath();
      c.moveTo(0, -r * 0.9);
      c.lineTo(r * 0.42, r * 0.1);
      c.lineTo(0, r * 0.1);
      c.closePath();
      c.fill();
      c.fillStyle = "#8a6238";
      c.beginPath();
      c.moveTo(-r * 0.86, r * 0.12);
      c.lineTo(r * 0.86, r * 0.12);
      c.lineTo(r * 0.5, r * 0.62);
      c.lineTo(-r * 0.5, r * 0.62);
      c.closePath();
      c.fill();
      linje(c, -r * 0.9, r * 0.78, r * 0.9, r * 0.78, r * 0.08, "#7fa2b8");
    },
    hjul(c, r) {
      c.fillStyle = "#3d4650";
      cirkel(c, 0, 0, r * 0.82);
      c.fill();
      c.fillStyle = "#8b949e";
      cirkel(c, 0, 0, r * 0.36);
      c.fill();
      c.fillStyle = "#e8eef2";
      cirkel(c, -r * 0.18, -r * 0.2, r * 0.12);
      c.fill();
    },
    axel(c, r) {
      c.fillStyle = "#8b949e";
      rr(c, -r * 0.9, -r * 0.13, r * 1.8, r * 0.26, r * 0.13);
      c.fill();
      c.fillStyle = "#3d4650";
      cirkel(c, -r * 0.78, 0, r * 0.3);
      c.fill();
      cirkel(c, r * 0.78, 0, r * 0.3);
      c.fill();
    },
    sparkcykel(c, r) {
      c.fillStyle = "#4a7d9f";
      rr(c, -r * 0.62, -r * 0.12, r * 1.2, r * 0.2, r * 0.1);
      c.fill();
      linje(c, r * 0.5, -r * 0.1, r * 0.7, -r * 0.72, r * 0.11, "#4a7d9f");
      linje(c, r * 0.38, -r * 0.72, r * 0.86, -r * 0.72, r * 0.11, "#3d4650");
      c.fillStyle = "#3d4650";
      cirkel(c, -r * 0.55, r * 0.42, r * 0.3);
      c.fill();
      cirkel(c, r * 0.55, r * 0.42, r * 0.3);
      c.fill();
    },
    glödlampa(c, r) {
      c.fillStyle = "#f6df9a";
      cirkel(c, 0, -r * 0.16, r * 0.6);
      c.fill();
      c.strokeStyle = "#e9b62f";
      c.lineWidth = r * 0.12;
      cirkel(c, 0, -r * 0.16, r * 0.6);
      c.stroke();
      c.fillStyle = "#9aa4ad";
      rr(c, -r * 0.3, r * 0.34, r * 0.6, r * 0.44, r * 0.1);
      c.fill();
      linje(c, -r * 0.12, r * 0.2, -r * 0.12, r * 0.34, r * 0.06, "#7d868f");
      linje(c, r * 0.12, r * 0.2, r * 0.12, r * 0.34, r * 0.06, "#7d868f");
    },
    sladd(c, r) {
      c.strokeStyle = "#4a5560";
      c.lineWidth = r * 0.16;
      c.lineCap = "round";
      c.beginPath();
      c.moveTo(-r * 0.8, r * 0.4);
      c.bezierCurveTo(-r * 0.3, r * 0.4, -r * 0.4, -r * 0.5, r * 0.1, -r * 0.5);
      c.bezierCurveTo(r * 0.5, -r * 0.5, r * 0.4, r * 0.1, r * 0.7, r * 0.1);
      c.stroke();
      c.fillStyle = "#8b949e";
      rr(c, r * 0.62, -r * 0.12, r * 0.3, r * 0.44, r * 0.08);
      c.fill();
    },
    lampa(c, r) {
      c.fillStyle = "#e9b62f";
      c.beginPath();
      c.moveTo(-r * 0.62, r * 0.1);
      c.lineTo(r * 0.62, r * 0.1);
      c.lineTo(r * 0.34, -r * 0.6);
      c.lineTo(-r * 0.34, -r * 0.6);
      c.closePath();
      c.fill();
      c.fillStyle = "#f6df9a";
      cirkel(c, 0, r * 0.34, r * 0.24);
      c.fill();
      c.strokeStyle = "rgba(233,182,47,0.45)";
      c.lineWidth = r * 0.08;
      c.beginPath();
      c.moveTo(-r * 0.5, r * 0.7);
      c.lineTo(r * 0.5, r * 0.7);
      c.stroke();
    },
    batteri(c, r) {
      c.fillStyle = "#6f8f5f";
      rr(c, -r * 0.44, -r * 0.66, r * 0.88, r * 1.32, r * 0.14);
      c.fill();
      c.fillStyle = "#4f6b44";
      rr(c, -r * 0.16, -r * 0.8, r * 0.32, r * 0.16, r * 0.06);
      c.fill();
      c.fillStyle = "#f2f6ee";
      linje(c, -r * 0.18, 0, r * 0.18, 0, r * 0.1, "#f2f6ee");
      linje(c, 0, -r * 0.18, 0, r * 0.18, r * 0.1, "#f2f6ee");
    },
    ficklampa(c, r) {
      c.fillStyle = "#5a6672";
      rr(c, -r * 0.62, -r * 0.26, r * 0.9, r * 0.52, r * 0.12);
      c.fill();
      c.fillStyle = "#8b949e";
      c.beginPath();
      c.moveTo(r * 0.28, -r * 0.36);
      c.lineTo(r * 0.62, -r * 0.6);
      c.lineTo(r * 0.62, r * 0.6);
      c.lineTo(r * 0.28, r * 0.36);
      c.closePath();
      c.fill();
      c.fillStyle = "rgba(246,223,154,0.75)";
      c.beginPath();
      c.moveTo(r * 0.62, -r * 0.5);
      c.lineTo(r * 0.95, -r * 0.82);
      c.lineTo(r * 0.95, r * 0.82);
      c.lineTo(r * 0.62, r * 0.5);
      c.closePath();
      c.fill();
    },
    låda(c, r) {
      c.fillStyle = "#b98a58";
      c.beginPath();
      c.moveTo(-r * 0.8, -r * 0.24);
      c.lineTo(r * 0.8, -r * 0.24);
      c.lineTo(r * 0.62, r * 0.66);
      c.lineTo(-r * 0.62, r * 0.66);
      c.closePath();
      c.fill();
      c.fillStyle = "#8a6238";
      rr(c, -r * 0.86, -r * 0.38, r * 1.72, r * 0.16, r * 0.08);
      c.fill();
      c.strokeStyle = "rgba(120,84,48,0.5)";
      c.lineWidth = r * 0.06;
      linje(c, -r * 0.2, -r * 0.2, -r * 0.16, r * 0.62, r * 0.06, "rgba(120,84,48,0.45)");
    },
    fönster(c, r) {
      c.fillStyle = "#dbe8f0";
      rr(c, -r * 0.7, -r * 0.7, r * 1.4, r * 1.4, r * 0.1);
      c.fill();
      c.strokeStyle = "#7f9bb0";
      c.lineWidth = r * 0.16;
      c.strokeRect(-r * 0.7, -r * 0.7, r * 1.4, r * 1.4);
      linje(c, 0, -r * 0.7, 0, r * 0.7, r * 0.14, "#7f9bb0");
      linje(c, -r * 0.7, 0, r * 0.7, 0, r * 0.14, "#7f9bb0");
    },
    fågelholk(c, r) {
      c.fillStyle = "#b98a58";
      c.beginPath();
      c.moveTo(-r * 0.7, -r * 0.1);
      c.lineTo(0, -r * 0.8);
      c.lineTo(r * 0.7, -r * 0.1);
      c.closePath();
      c.fill();
      rr(c, -r * 0.58, -r * 0.12, r * 1.16, r * 0.78, r * 0.08);
      c.fill();
      c.fillStyle = "#4a3b2c";
      cirkel(c, 0, r * 0.2, r * 0.2);
      c.fill();
      c.fillStyle = "#8a6238";
      rr(c, -r * 0.06, -r * 0.98, r * 0.12, r * 0.2, r * 0.05);
      c.fill();
    },
    metall(c, r) {
      const g = c.createLinearGradient(-r, 0, r, 0);
      g.addColorStop(0, "#9aa4ad");
      g.addColorStop(0.45, "#e8eef2");
      g.addColorStop(1, "#8b949e");
      c.fillStyle = g;
      rr(c, -r * 0.86, -r * 0.26, r * 1.72, r * 0.52, r * 0.12);
      c.fill();
      c.strokeStyle = "rgba(60,70,80,0.35)";
      c.lineWidth = r * 0.06;
      c.stroke();
    },
    medar(c, r) {
      c.strokeStyle = "#8b949e";
      c.lineWidth = r * 0.16;
      c.lineCap = "round";
      c.beginPath();
      c.moveTo(-r * 0.8, r * 0.32);
      c.quadraticCurveTo(-r * 0.55, r * 0.62, -r * 0.2, r * 0.6);
      c.stroke();
      linje(c, -r * 0.2, r * 0.6, r * 0.82, r * 0.6, r * 0.16, "#8b949e");
      linje(c, -r * 0.2, r * 0.6, -r * 0.2, -r * 0.1, r * 0.12, "#6b757e");
      linje(c, r * 0.56, r * 0.6, r * 0.56, -r * 0.1, r * 0.12, "#6b757e");
      c.fillStyle = "#a97c50";
      rr(c, -r * 0.28, -r * 0.34, r * 0.9, r * 0.26, r * 0.08);
      c.fill();
    },
    sits(c, r) {
      c.fillStyle = "#b98a58";
      rr(c, -r * 0.84, -r * 0.2, r * 1.68, r * 0.34, r * 0.1);
      c.fill();
      c.fillStyle = "#c96f8f";
      rr(c, -r * 0.74, -r * 0.46, r * 1.48, r * 0.28, r * 0.12);
      c.fill();
      linje(c, -r * 0.6, r * 0.14, -r * 0.6, r * 0.6, r * 0.1, "#8a6238");
      linje(c, r * 0.6, r * 0.14, r * 0.6, r * 0.6, r * 0.1, "#8a6238");
    },
    spark(c, r) {
      c.strokeStyle = "#8b949e";
      c.lineWidth = r * 0.14;
      c.beginPath();
      c.moveTo(-r * 0.78, r * 0.5);
      c.quadraticCurveTo(-r * 0.5, r * 0.78, -r * 0.16, r * 0.74);
      c.stroke();
      linje(c, -r * 0.16, r * 0.74, r * 0.78, r * 0.74, r * 0.14, "#8b949e");
      c.fillStyle = "#b98a58";
      rr(c, -r * 0.5, -r * 0.02, r * 1.0, r * 0.22, r * 0.08);
      c.fill();
      c.fillStyle = "#c96f8f";
      rr(c, -r * 0.42, -r * 0.26, r * 0.84, r * 0.24, r * 0.1);
      c.fill();
      linje(c, -r * 0.38, r * 0.18, -r * 0.38, r * 0.72, r * 0.09, "#6b757e");
      linje(c, r * 0.38, r * 0.18, r * 0.38, r * 0.72, r * 0.09, "#6b757e");
    },
    vinge(c, r) {
      c.fillStyle = "#eef3f8";
      c.beginPath();
      c.moveTo(0, -r * 0.1);
      c.quadraticCurveTo(-r * 0.95, -r * 0.85, -r * 0.2, -r * 0.15);
      c.closePath();
      c.fill();
      c.beginPath();
      c.moveTo(0, -r * 0.1);
      c.quadraticCurveTo(r * 0.95, -r * 0.85, r * 0.2, -r * 0.15);
      c.closePath();
      c.fill();
      c.strokeStyle = "#8fa9c4";
      c.lineWidth = r * 0.07;
      c.beginPath();
      c.moveTo(0, -r * 0.1);
      c.quadraticCurveTo(-r * 0.95, -r * 0.85, -r * 0.2, -r * 0.15);
      c.moveTo(0, -r * 0.1);
      c.quadraticCurveTo(r * 0.95, -r * 0.85, r * 0.2, -r * 0.15);
      c.stroke();
    },
    snurra(c, r) {
      const blad = ["#d94a3d", "#e9b62f", "#4a7d9f", "#2f7d6f"];
      blad.forEach((f, i) => {
        c.save();
        c.rotate((i * Math.PI) / 2);
        c.fillStyle = f;
        c.beginPath();
        c.moveTo(0, 0);
        c.lineTo(r * 0.78, -r * 0.34);
        c.lineTo(r * 0.5, r * 0.36);
        c.closePath();
        c.fill();
        c.restore();
      });
      c.fillStyle = "#fdfbf7";
      cirkel(c, 0, 0, r * 0.16);
      c.fill();
    },
    spik(c, r) {
      c.save();
      c.rotate(0.5);
      c.fillStyle = "#8b949e";
      rr(c, -r * 0.1, -r * 0.86, r * 0.2, r * 1.4, r * 0.05);
      c.fill();
      c.beginPath();
      c.moveTo(-r * 0.1, r * 0.54);
      c.lineTo(r * 0.1, r * 0.54);
      c.lineTo(0, r * 0.9);
      c.closePath();
      c.fill();
      c.fillStyle = "#b6c0c8";
      cirkel(c, 0, -r * 0.82, r * 0.3);
      c.fill();
      c.restore();
    },
    vindsnurra(c, r) {
      linje(c, 0, r * 0.1, 0, r * 1.0, r * 0.1, "#8a6238");
      const blad = ["#d94a3d", "#e9b62f", "#4a7d9f", "#2f7d6f"];
      c.save();
      c.translate(0, -r * 0.34);
      blad.forEach((f, i) => {
        c.save();
        c.rotate((i * Math.PI) / 2);
        c.fillStyle = f;
        c.beginPath();
        c.moveTo(0, 0);
        c.lineTo(r * 0.66, -r * 0.3);
        c.lineTo(r * 0.44, r * 0.3);
        c.closePath();
        c.fill();
        c.restore();
      });
      c.fillStyle = "#fdfbf7";
      cirkel(c, 0, 0, r * 0.13);
      c.fill();
      c.restore();
    },
  };

  /* ---------- recepten -------------------------------------------------- */
  // Nyckeln är de två delarnas namn i bokstavsordning.
  const RECEPT = {};
  function recept(a, b, blir) {
    RECEPT[[a, b].sort().join("+")] = blir;
  }
  recept("papper", "pinne", "drake");
  recept("tyg", "ull", "kudde");
  recept("tyg", "pinne", "segel");
  recept("segel", "bräda", "båt");
  recept("hjul", "hjul", "axel");
  recept("axel", "bräda", "sparkcykel");
  recept("glödlampa", "sladd", "lampa");
  recept("lampa", "batteri", "ficklampa");
  recept("bräda", "bräda", "låda");
  recept("låda", "fönster", "fågelholk");
  recept("bräda", "metall", "medar");
  recept("bräda", "tyg", "sits");
  recept("medar", "sits", "spark");
  recept("papper", "papper", "vinge");
  recept("vinge", "pinne", "snurra");
  recept("snurra", "spik", "vindsnurra");

  const GÖR = {
    drake: "En drake! Nu flyger den.",
    kudde: "En kudde! Nu kan vi vila.",
    båt: "En båt! Nu kan vi segla.",
    sparkcykel: "En sparkcykel! Nu kan vi åka.",
    ficklampa: "En ficklampa! Nu ser vi i mörkret.",
    fågelholk: "En fågelholk! Nu flyttar fågeln in.",
    spark: "En spark! Nu kan vi åka utför.",
    vindsnurra: "En vindsnurra! Nu snurrar den.",
  };

  /* ---------- nivåerna -------------------------------------------------- */
  // Fler delar än vad som behövs: några passar inte alls, och det är meningen.
  const NIVÅER = [
    { mål: "drake", delar: ["papper", "pinne", "tyg", "ull"] },
    { mål: "kudde", delar: ["tyg", "ull", "papper", "pinne", "glödlampa"] },
    { mål: "båt", delar: ["papper", "pinne", "bräda", "ull", "tyg"] },
    { mål: "sparkcykel", delar: ["hjul", "hjul", "bräda", "tyg", "ull"] },
    { mål: "ficklampa", delar: ["glödlampa", "sladd", "batteri", "bräda", "spik"] },
    { mål: "fågelholk", delar: ["bräda", "bräda", "fönster", "spik", "tyg", "ull"] },
    { mål: "spark", delar: ["bräda", "bräda", "metall", "tyg", "ull", "spik"] },
    { mål: "vindsnurra", delar: ["papper", "papper", "pinne", "spik", "tyg", "glödlampa", "bräda"] },
  ];

  /* ---------- ljud och röst --------------------------------------------- */
  let ljud = true;
  let röst = true;
  let ak = null;

  function ljudPå() {
    if (!ak) {
      const C = window.AudioContext || window.webkitAudioContext;
      if (!C) return null;
      ak = new C();
    }
    if (ak.state === "suspended") ak.resume();
    return ak;
  }

  function blipp(frek, längd, typ, volym) {
    if (!ljud) return;
    const a = ljudPå();
    if (!a) return;
    const o = a.createOscillator();
    const g = a.createGain();
    o.type = typ || "sine";
    o.frequency.value = frek;
    g.gain.setValueAtTime(0, a.currentTime);
    g.gain.linearRampToValueAtTime(volym || 0.14, a.currentTime + 0.012);
    g.gain.exponentialRampToValueAtTime(0.0001, a.currentTime + längd);
    o.connect(g).connect(a.destination);
    o.start();
    o.stop(a.currentTime + längd + 0.02);
  }

  const LJUD = {
    plock() { blipp(520, 0.09, "triangle"); },
    smält() {
      blipp(420, 0.1, "sine");
      setTimeout(() => blipp(660, 0.14, "sine"), 70);
      setTimeout(() => blipp(880, 0.18, "sine"), 140);
    },
    nej() { blipp(190, 0.14, "sine", 0.1); },
    klar() {
      [523, 659, 784, 1046].forEach((f, i) => setTimeout(() => blipp(f, 0.2, "triangle"), i * 110));
    },
  };

  function säg(text) {
    if (!röst || !("speechSynthesis" in window) || !text) return;
    try {
      const u = new SpeechSynthesisUtterance(text);
      u.lang = "sv-SE";
      u.rate = 0.95;
      u.pitch = 1.05;
      const r = speechSynthesis.getVoices().find((v) => /sv/i.test(v.lang));
      if (r) u.voice = r;
      speechSynthesis.cancel();
      speechSynthesis.speak(u);
    } catch (e) {
      /* tal är en bonus, aldrig ett krav */
    }
  }

  /* ---------- skolappar ------------------------------------------------- */
  // Anonyma räkningar till skolappar.com (kotten.js i index.html); appen fungerar utan.
  function rapport(namn, värde) {
    window.skolappar?.event(namn, värde);
  }

  /* ---------- tillstånd -------------------------------------------------- */
  const S = {
    lage: "vantar", // vantar | spel | klart
    niva: 0,
    mål: null,
    delar: [],
    byggda: [],
    missar: 0,
    vald: null,
    drag: null,
    hintPar: null,
    hintTid: 0,
    pop: 0,
    klarTid: 0,
  };

  const START_NIVA = 0;
  const duk = document.getElementById("duk");
  const ctx = duk.getContext("2d");
  const scen = document.getElementById("scen");

  let w = 0;
  let h = 0;
  let r = 40; // delarnas radie i css-px

  function storlek() {
    const b = scen.getBoundingClientRect();
    if (!b.width || !b.height) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = b.width;
    h = b.height;
    duk.width = Math.floor(w * dpr);
    duk.height = Math.floor(h * dpr);
    duk.style.width = w + "px";
    duk.style.height = h + "px";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    r = Math.max(30, Math.min(56, Math.min(w / 11, h / 7)));
    läggUt();
  }

  /* ---------- nivåbygge ------------------------------------------------- */
  function nyDel(slag, nx, ny) {
    return { slag, nx, ny, px: nx, py: ny, skala: 0, vinkel: (Math.random() - 0.5) * 0.16 };
  }

  function startaNiva(nr) {
    S.niva = Math.min(nr, NIVÅER.length - 1);
    const n = NIVÅER[S.niva];
    S.mål = n.mål;
    S.delar = [];
    S.vald = null;
    S.drag = null;
    S.missar = 0;
    S.hintPar = null;
    S.pop = 0;
    S.klarTid = 0;
    const platser = fördela(n.delar.length);
    n.delar.forEach((slag, i) => {
      const p = platser[i];
      const d = nyDel(slag, p.x, p.y);
      d.skala = 0;
      d.fördröj = i * 60;
      S.delar.push(d);
    });
    S.lage = "spel";
    ritaHUD();
    rapport("round_start");
    rapport("level", S.niva + 1);
    säg("Bygg en " + DELAR[n.mål].namn + "!");
  }

  // Delarna läggs i ett mjukt rutnät med lite ojämnhet – inte rader, det ser
  // ut som en hög med saker.
  function fördela(antal) {
    const kol = antal <= 4 ? 2 : antal <= 6 ? 3 : 4;
    const rad = Math.ceil(antal / kol);
    const ut = [];
    for (let i = 0; i < antal; i++) {
      const k = i % kol;
      const radNr = Math.floor(i / kol);
      const x = (k + 0.5) / kol;
      const y = (radNr + 0.5) / rad;
      ut.push({
        x: 0.12 + x * 0.76 + (Math.random() - 0.5) * 0.05,
        y: 0.16 + y * 0.66 + (Math.random() - 0.5) * 0.05,
      });
    }
    return ut;
  }

  function läggUt() {
    // räknas om vid resize så att delarna stannar inom planen
  }

  /* ---------- smältning ------------------------------------------------- */
  function nyckel(a, b) {
    return [a, b].sort().join("+");
  }

  function smält(a, b) {
    if (a === b) return false;
    const blir = RECEPT[nyckel(a.slag, b.slag)];
    if (!blir) return false;
    const mx = (a.nx + b.nx) / 2;
    const my = (a.ny + b.ny) / 2;
    S.delar = S.delar.filter((d) => d !== a && d !== b);
    const ny = nyDel(blir, mx, my);
    ny.skala = 0;
    S.delar.push(ny);
    S.pop = 1;
    LJUD.smält();
    säg("Ett " + DELAR[blir].namn + "!");
    if (blir === S.mål) {
      S.lage = "klart";
      S.klarTid = performance.now();
      S.byggda.push(blir);
      LJUD.klar();
      rapport("round_done");
      setTimeout(() => säg(GÖR[blir] || "Klart!"), 700);
      ritaHUD();
    }
    return true;
  }

  function felFörsök(a, b) {
    S.missar += 1;
    LJUD.nej();
    rapport("hint");
    [a, b].forEach((d) => {
      d.skak = 0.4;
    });
    if (S.missar % 3 === 0) visaLedtråd();
  }

  function visaLedtråd() {
    // Efter tre missar pulserar ett par som faktiskt passar.
    const par = hittaPar();
    S.hintPar = par;
    S.hintTid = performance.now() + 2600;
  }

  function hittaPar() {
    for (let i = 0; i < S.delar.length; i++) {
      for (let j = i + 1; j < S.delar.length; j++) {
        if (RECEPT[nyckel(S.delar[i].slag, S.delar[j].slag)]) return [S.delar[i], S.delar[j]];
      }
    }
    return null;
  }

  /* ---------- träffytor -------------------------------------------------- */
  function fonster() {
    return { x0: w * 0.08, x1: w * 0.92, y0: h * 0.14, y1: h * 0.9 };
  }

  function pos(d) {
    const f = fonster();
    return {
      x: f.x0 + d.nx * (f.x1 - f.x0),
      y: f.y0 + d.ny * (f.y1 - f.y0),
    };
  }

  function vid(x, y) {
    let bäst = null;
    let bästD = 1e9;
    S.delar.forEach((d) => {
      const p = pos(d);
      const avst = Math.hypot(p.x - x, p.y - y);
      if (avst < r * 1.15 && avst < bästD) {
        bäst = d;
        bästD = avst;
      }
    });
    return bäst;
  }

  let tryck = null;

  function lokal(e) {
    const b = duk.getBoundingClientRect();
    return { x: e.clientX - b.left, y: e.clientY - b.top };
  }

  duk.addEventListener("pointerdown", (e) => {
    if (S.lage !== "spel") return;
    e.preventDefault();
    const p = lokal(e);
    const d = vid(p.x, p.y);
    if (!d) return;
    if (duk.setPointerCapture) duk.setPointerCapture(e.pointerId);
    tryck = { id: e.pointerId, del: d, x0: p.x, y0: p.y, tid: performance.now(), rört: false };
    S.drag = { del: d, x: p.x, y: p.y };
    LJUD.plock();
  });

  duk.addEventListener("pointermove", (e) => {
    if (!tryck || e.pointerId !== tryck.id) return;
    const p = lokal(e);
    if (Math.hypot(p.x - tryck.x0, p.y - tryck.y0) > 8) tryck.rört = true;
    S.drag = { del: tryck.del, x: p.x, y: p.y };
  });

  function släpp(e) {
    if (!tryck || (e && e.pointerId !== tryck.id)) return;
    const t = tryck;
    tryck = null;
    S.drag = null;
    const p = lokal(e);
    const över = vid(p.x, p.y);

    if (t.rört && över && över !== t.del) {
      if (!smält(t.del, över)) felFörsök(t.del, över);
      return;
    }
    if (!t.rört) {
      // tryck utan drag: välj, och smält med nästa tryck
      if (S.vald && S.vald !== t.del && S.delar.includes(S.vald)) {
        const a = S.vald;
        S.vald = null;
        if (!smält(a, t.del)) felFörsök(a, t.del);
      } else {
        S.vald = t.del;
      }
      return;
    }
    // släppt på tom yta: lägg tillbaka på ny plats
    const f = fonster();
    t.del.nx = Math.min(0.94, Math.max(0.06, (p.x - f.x0) / (f.x1 - f.x0)));
    t.del.ny = Math.min(0.94, Math.max(0.06, (p.y - f.y0) / (f.y1 - f.y0)));
  }

  duk.addEventListener("pointerup", släpp);
  duk.addEventListener("pointercancel", släpp);
  duk.addEventListener("contextmenu", (e) => e.preventDefault());

  /* ---------- rita ------------------------------------------------------- */
  let förra = 0;

  function tick(nu) {
    requestAnimationFrame(tick);
    const dt = Math.min(0.05, (nu - (förra || nu)) / 1000);
    förra = nu;
    rita(nu, dt);
  }

  function rita(nu, dt) {
    ctx.clearRect(0, 0, w, h);
    tecknaBänk();
    if (S.lage === "klart") {
      tecknaKlar(nu);
      return;
    }
    tecknaMål();
    S.delar.forEach((d, i) => {
      d.skala = Math.min(1, d.skala + dt * 3.2);
      if (d.skak > 0) d.skak = Math.max(0, d.skak - dt);
      tecknaDel(d, i, nu);
    });
    if (S.drag) tecknaDrag(nu);
    if (S.pop > 0) {
      S.pop = Math.max(0, S.pop - dt * 2);
      tecknaPuff(nu);
    }
    if (S.hintPar && nu < S.hintTid) tecknaHint(nu);
    else if (S.hintPar && nu >= S.hintTid) S.hintPar = null;
  }

  function tecknaBänk() {
    const f = fonster();
    ctx.save();
    ctx.fillStyle = "rgba(20,24,31,0.05)";
    rr(ctx, f.x0 - r * 0.5, f.y0 - r * 0.6, f.x1 - f.x0 + r, f.y1 - f.y0 + r * 1.1, r * 0.6);
    ctx.fill();
    ctx.restore();
  }

  function tecknaDel(d, i, nu) {
    const p = pos(d);
    const drag = S.drag && S.drag.del === d;
    const x = drag ? S.drag.x : p.x;
    const y = drag ? S.drag.y : p.y;
    const gung = Math.sin(nu / 620 + i) * r * 0.035;
    const skak = d.skak > 0 ? Math.sin(nu / 28) * d.skak * r * 0.16 : 0;
    const skala = d.skala * (drag ? 1.12 : 1);

    ctx.save();
    ctx.translate(x + skak, y + gung);
    ctx.scale(skala, skala);
    ctx.rotate(d.vinkel * 0.4);

    // skugga
    ctx.fillStyle = "rgba(20,24,31,0.10)";
    ctx.beginPath();
    ctx.ellipse(0, r * 0.86, r * 0.66, r * 0.16, 0, 0, 6.2832);
    ctx.fill();

    // bricka
    ctx.fillStyle = "#fdfbf7";
    cirkel(ctx, 0, 0, r);
    ctx.fill();
    ctx.strokeStyle = S.vald === d ? "#2f6f9f" : "rgba(20,24,31,0.10)";
    ctx.lineWidth = S.vald === d ? r * 0.1 : r * 0.05;
    ctx.stroke();

    if (RITA[d.slag]) {
      ctx.save();
      ctx.scale(0.78, 0.78);
      RITA[d.slag](ctx, r);
      ctx.restore();
    }
    ctx.restore();
  }

  function tecknaDrag(nu) {
    // en mjuk linje från brickan till tummen gör draget tydligt
    const p = pos(S.drag.del);
    ctx.save();
    ctx.strokeStyle = "rgba(47,111,159,0.35)";
    ctx.lineWidth = 3;
    ctx.setLineDash([6, 8]);
    ctx.beginPath();
    ctx.moveTo(p.x, p.y);
    ctx.lineTo(S.drag.x, S.drag.y);
    ctx.stroke();
    ctx.restore();
  }

  function tecknaPuff(nu) {
    const f = fonster();
    const cx = (f.x0 + f.x1) / 2;
    const cy = (f.y0 + f.y1) / 2;
    ctx.save();
    ctx.globalAlpha = S.pop * 0.5;
    ctx.strokeStyle = "#2f6f9f";
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.arc(cx, cy, (1 - S.pop) * r * 4, 0, 6.2832);
    ctx.stroke();
    ctx.restore();
  }

  function tecknaHint(nu) {
    const puls = 0.5 + 0.5 * Math.sin(nu / 200);
    ctx.save();
    ctx.strokeStyle = "rgba(47,111,159," + (0.25 + puls * 0.45) + ")";
    ctx.lineWidth = 5;
    S.hintPar.forEach((d) => {
      const p = pos(d);
      ctx.beginPath();
      ctx.arc(p.x, p.y, r * (1.2 + puls * 0.12), 0, 6.2832);
      ctx.stroke();
    });
    ctx.restore();
  }

  function tecknaMål() {
    // Målet som ett litet kort längst upp: en siluett, inget namn.
    const cx = w / 2;
    const cy = Math.max(r * 0.95, h * 0.085);
    const rad = r * 0.62;
    const bw = rad * 2.5;
    const bh = rad * 2.15;
    ctx.save();
    ctx.fillStyle = "rgba(47,111,159,0.06)";
    rr(ctx, cx - bw / 2, cy - bh / 2, bw, bh, rad * 0.6);
    ctx.fill();
    ctx.setLineDash([7, 7]);
    ctx.strokeStyle = "rgba(47,111,159,0.35)";
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.save();
    ctx.translate(cx, cy);
    ctx.globalAlpha = 0.55;
    if (RITA[S.mål]) RITA[S.mål](ctx, rad * 0.72);
    ctx.restore();
    ctx.restore();
  }

  /* ---------- klart: uppfinningen används --------------------------------- */
  function tecknaKlar(nu) {
    const t = Math.min(1, (nu - S.klarTid) / 2600);
    const cx = w / 2;
    const cy = h * 0.46;
    const rad = r * 1.6;

    ctx.save();
    if (S.mål === "drake") {
      // draken flyger i en mjuk båge över planen
      const x = w * (0.16 + 0.68 * t);
      const y = cy - Math.sin(t * Math.PI) * h * 0.14 + Math.sin(nu / 220) * 5;
      ctx.translate(x, y);
      ctx.rotate(Math.sin(nu / 300) * 0.12 + 0.1);
      RITA.drake(ctx, rad * 1.05);
      ctx.strokeStyle = "#8a6238";
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.moveTo(-rad * 0.4, rad * 0.2);
      ctx.quadraticCurveTo(-rad * 1.1, rad * 0.5, -rad * 1.6, rad * 0.1);
      ctx.stroke();
    } else if (S.mål === "båt") {
      ctx.translate(cx, cy + Math.sin(nu / 420) * 6);
      ctx.rotate(Math.sin(nu / 500) * 0.06);
      RITA.båt(ctx, rad);
      tecknaVågor(cx, cy + rad * 0.9, nu);
    } else if (S.mål === "sparkcykel") {
      const x = w * (0.06 + 0.88 * t);
      ctx.translate(x, cy + Math.sin(nu / 300) * 3);
      RITA.sparkcykel(ctx, rad);
      tecknaFart(x - rad, cy + rad * 0.4, nu);
    } else if (S.mål === "ficklampa") {
      ctx.translate(cx - rad * 0.4, cy);
      RITA.ficklampa(ctx, rad);
      ctx.save();
      ctx.globalAlpha = 0.25 + Math.sin(nu / 400) * 0.1;
      ctx.fillStyle = "#f6df9a";
      ctx.beginPath();
      ctx.moveTo(rad * 0.5, -rad * 0.3);
      ctx.lineTo(rad * 2.6, -rad * 1.1);
      ctx.lineTo(rad * 2.6, rad * 1.1);
      ctx.lineTo(rad * 0.5, rad * 0.3);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    } else if (S.mål === "fågelholk") {
      ctx.translate(cx, cy);
      RITA.fågelholk(ctx, rad * 1.15);
      // en fågel flyger in i hålet
      const inX = cx + Math.sin(nu / 300) * rad * 0.1;
      const inY = cy + rad * 0.35 + (1 - t) * -rad * 2.2;
      ctx.save();
      ctx.translate(inX, inY);
      ctx.fillStyle = "#4a7d9f";
      cirkel(ctx, 0, 0, rad * 0.22);
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(rad * 0.1, 0);
      ctx.lineTo(rad * 0.55, -rad * 0.22);
      ctx.lineTo(rad * 0.55, rad * 0.22);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    } else if (S.mål === "spark") {
      const x = w * (0.1 + 0.78 * t);
      ctx.translate(x, cy + Math.sin(nu / 350) * 3);
      RITA.spark(ctx, rad);
      tecknaFart(x - rad, cy + rad * 0.5, nu);
    } else if (S.mål === "vindsnurra") {
      const x = w * (0.12 + 0.72 * t);
      ctx.translate(x, cy + Math.sin(nu / 280) * 5);
      ctx.save();
      ctx.rotate(nu / 260);
      RITA.vindsnurra(ctx, rad * 0.9);
      ctx.restore();
    } else {
      ctx.translate(cx, cy + Math.sin(nu / 300) * 5);
      if (RITA[S.mål]) RITA[S.mål](ctx, rad);
    }
    ctx.restore();

    // namn under
    ctx.save();
    ctx.fillStyle = "#14181f";
    ctx.font = "600 " + Math.round(r * 0.78) + "px Fredoka, Nunito, system-ui, sans-serif";
    ctx.textAlign = "center";
    ctx.letterSpacing = "0.04em";
    ctx.fillText(DELAR[S.mål].namn.toUpperCase(), cx, h * 0.82);
    ctx.restore();
  }

  function tecknaVågor(cx, y, nu) {
    ctx.save();
    ctx.strokeStyle = "rgba(77,140,180,0.55)";
    ctx.lineWidth = 3;
    for (let i = 0; i < 3; i++) {
      ctx.beginPath();
      const yy = y + i * 12;
      for (let x = -r * 2; x <= r * 2; x += 6) {
        const gy = yy + Math.sin(x / 22 + nu / 400 + i) * 3;
        if (x === -r * 2) ctx.moveTo(cx + x, gy);
        else ctx.lineTo(cx + x, gy);
      }
      ctx.stroke();
    }
    ctx.restore();
  }

  function tecknaFart(x, y, nu) {
    ctx.save();
    ctx.strokeStyle = "rgba(47,111,159,0.35)";
    ctx.lineWidth = 3;
    for (let i = 0; i < 3; i++) {
      const off = ((nu / 6 + i * 26) % 78) - 39;
      ctx.beginPath();
      ctx.moveTo(x - r * 0.5 + off, y - r * 0.3 + i * 10);
      ctx.lineTo(x - r * 1.2 + off, y - r * 0.3 + i * 10);
      ctx.stroke();
    }
    ctx.restore();
  }

  /* ---------- HUD -------------------------------------------------------- */
  const el = {
    niva: document.querySelector("[data-niva]"),
    steg: document.querySelector("[data-steg]"),
    hylla: document.querySelector("[data-hylla]"),
    nasta: document.querySelector("[data-nasta]"),
    ljud: document.querySelector("[data-ljud]"),
    röst: document.querySelector("[data-rost]"),
  };

  function ritaHUD() {
    if (el.niva) el.niva.textContent = (S.niva + 1) + "/" + NIVÅER.length;
    if (el.steg) {
      const kvar = kvarvarandeSteg(S.mål, S.delar.map((d) => d.slag));
      el.steg.innerHTML = "";
      for (let i = 0; i < kvar; i++) {
        const s = document.createElement("i");
        el.steg.appendChild(s);
      }
    }
    if (el.hylla) {
      el.hylla.innerHTML = "";
      S.byggda.forEach((slag) => {
        const c = document.createElement("canvas");
        c.width = 48;
        c.height = 48;
        c.className = "hyllobjekt";
        const cc = c.getContext("2d");
        cc.translate(24, 24);
        if (RITA[slag]) RITA[slag](cc, 18);
        el.hylla.appendChild(c);
      });
    }
    const klar = S.lage === "klart";
    if (el.nasta) {
      el.nasta.hidden = !klar;
      el.nasta.textContent = S.niva + 1 >= NIVÅER.length ? "Spela igen" : "Nästa uppfinning";
    }
  }

  // Hur många smältningar som återstår: bred sökning över alla högar man kan
  // göra av delarna, så prickarna alltid stämmer med minsta antal steg.
  function kvarvarandeSteg(mål, slag) {
    const memo = new Map();
    function sök(hög) {
      const nyckel = hög.slice().sort().join(",");
      if (memo.has(nyckel)) return memo.get(nyckel);
      if (hög.includes(mål)) {
        memo.set(nyckel, 0);
        return 0;
      }
      let bäst = Infinity;
      memo.set(nyckel, Infinity); // mot oändlig rekursion
      for (let i = 0; i < hög.length; i++) {
        for (let j = i + 1; j < hög.length; j++) {
          const blir = RECEPT[[hög[i], hög[j]].sort().join("+")];
          if (!blir) continue;
          const nästa = hög.filter((_, k) => k !== i && k !== j).concat([blir]);
          const n = sök(nästa);
          if (n + 1 < bäst) bäst = n + 1;
        }
      }
      memo.set(nyckel, bäst);
      return bäst;
    }
    const n = sök(slag.slice());
    return n === Infinity ? 1 : Math.max(1, n);
  }

  if (el.nasta) {
    el.nasta.addEventListener("click", () => {
      if (S.niva + 1 < NIVÅER.length) startaNiva(S.niva + 1);
      else {
        S.byggda = [];
        startaNiva(0);
      }
    });
  }

  function bindLjud(knapp, slag) {
    if (!knapp) return;
    knapp.addEventListener("click", () => {
      const på = knapp.dataset.lage !== "av";
      knapp.dataset.lage = på ? "av" : "på";
      knapp.setAttribute("aria-pressed", på ? "false" : "true");
      if (slag === "ljud") ljud = !på;
      else {
        röst = !på;
        if (!röst && "speechSynthesis" in window) speechSynthesis.cancel();
      }
      knapp.classList.toggle("av", på);
      if (på) rapport("sound_off");
    });
  }
  bindLjud(el.ljud, "ljud");
  bindLjud(el.röst, "röst");

  /* ---------- start ------------------------------------------------------ */
  window.addEventListener("resize", storlek);
  storlek();
  startaNiva(START_NIVA);
  requestAnimationFrame(tick);

  // för tester och föräldrar som vill felsöka
  window.__lada = { S, NIVÅER, RECEPT, DELAR, startaNiva, smält, kvarvarandeSteg };
})();