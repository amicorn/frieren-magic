// handling for the magic engine and gesture system

import * as THREE from 'three';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { COUNT, patterns } from './patterns.js';

/** * Magic Engine State
 */
let currentTech = 'neutral';
let handPos = { x: 0, y: 0 };
let lastHandPos = { x: 0, y: 0 };
let handVel = { x: 0, y: 0 };
let glowColor = '#d4af37';

const uiElements = {
    name: document.getElementById('technique-name'),
    mana: document.getElementById('mana-fill'),
    video: document.querySelector('.input_video'),
    canvas: document.getElementById('output_canvas')
};

/**
 * Three.js Infrastructure
 */
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 60;

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
document.body.appendChild(renderer.domElement);

// Post-processing
const composer = new EffectComposer(renderer);
composer.addPass(new RenderPass(scene, camera));
const bloomPass = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 2.5, 0.4, 0.85);
composer.addPass(bloomPass);

/**
 * Particle System Setup
 */
const geometry = new THREE.BufferGeometry();
const targetPositions = new Float32Array(COUNT * 3);
const targetColors = new Float32Array(COUNT * 3);
const targetSizes = new Float32Array(COUNT);

geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(COUNT * 3), 3));
geometry.setAttribute('color', new THREE.BufferAttribute(new Float32Array(COUNT * 3), 3));
geometry.setAttribute('size', new THREE.BufferAttribute(new Float32Array(COUNT), 1));

const particles = new THREE.Points(geometry, new THREE.PointsMaterial({ 
    size: 0.25, vertexColors: true, blending: THREE.AdditiveBlending, transparent: true, depthWrite: false 
}));
scene.add(particles);

/**
 * Gesture Recognition Logic
 */
const hands = new Hands({locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`});
hands.setOptions({ maxNumHands: 2, modelComplexity: 1, minDetectionConfidence: 0.7 });

hands.onResults((results) => {
    const ctx = uiElements.canvas.getContext('2d');
    ctx.clearRect(0, 0, uiElements.canvas.width, uiElements.canvas.height);
    let detected = 'neutral';

    if (results.multiHandLandmarks?.length > 0) {
        const h1 = results.multiHandLandmarks[0];
        
        // Track Velocity and Position
        handPos.x = (0.5 - h1[9].x) * 100;
        handPos.y = (0.5 - h1[9].y) * 80;
        handVel.x = handPos.x - lastHandPos.x;
        handVel.y = handPos.y - lastHandPos.y;
        lastHandPos = { ...handPos };

        // Detection Heuristics
        if (results.multiHandLandmarks.length === 2) {
            const h2 = results.multiHandLandmarks[1];
            const dist = Math.hypot(h1[8].x - h2[8].x, h1[8].y - h2[8].y);
            detected = dist < 0.1 ? 'rune' : (Math.hypot(h1[0].x - h2[0].x) > 0.4 ? 'burst' : 'neutral');
        } else {
            const isUp = (t, p) => h1[t].y < h1[p].y;
            const upCount = [8, 12, 16, 20].filter(i => isUp(i, i - 2)).length;
            const heartDist = Math.hypot(h1[4].x - h1[8].x, h1[4].y - h1[8].y);

            if (heartDist < 0.04) detected = 'heart';
            else if (upCount === 1) detected = 'flame';
            else if (upCount === 4) detected = 'ice';
            else if (upCount === 0) detected = 'void';
        }

        // Draw HUD Landmarks
        results.multiHandLandmarks.forEach(hand => {
            ctx.shadowBlur = 15;
            ctx.shadowColor = glowColor;
            drawConnectors(ctx, hand, HAND_CONNECTIONS, {color: glowColor, lineWidth: 4});
            drawLandmarks(ctx, hand, {color: '#fff', lineWidth: 1, radius: 2});
        });
    }
    updateState(detected);
});

function updateState(tech) {
    if (currentTech === tech) return;
    currentTech = tech;

    const meta = {
        heart: { color: '#ff69b4', name: "FRIEREN SECRET WEAPON: BLOW HEART KISS", bloom: 3.0, mana: "80%" },
        rune: { color: '#ff0077', name: "ELDRITCH RUNE GATE TO HIMMEL", bloom: 2.5, mana: "95%" },
        flame: { color: '#ff4400', name: "SOLAR FLAME ERUPTION", bloom: 3.0, mana: "75%" },
        burst: { color: '#fff700', name: "FIELD OF LIGHT FLOWERS", bloom: 3.5, mana: "100%" },
        ice: { color: '#00f2ff', name: "ZOLTRAAK CRYSTALLINE FRACTURE", bloom: 2.0, mana: "60%" },
        void: { color: '#aa00ff', name: "ABYSSAL REACH", bloom: 2.5, mana: "40%" },
        neutral: { color: '#d4af37', name: "SENSING MANA...", bloom: 1.0, mana: "20%" }
    }[tech];

    glowColor = meta.color;
    uiElements.name.innerText = meta.name;
    bloomPass.strength = meta.bloom;
    uiElements.mana.style.height = meta.mana;

    for (let i = 0; i < COUNT; i++) {
        const p = patterns[tech](i);
        targetPositions[i * 3] = p.x; targetPositions[i * 3 + 1] = p.y; targetPositions[i * 3 + 2] = p.z;
        targetColors[i * 3] = p.r; targetColors[i * 3 + 1] = p.g; targetColors[i * 3 + 2] = p.b;
        targetSizes[i] = p.s;
    }
}

/**
 * Animation Loop
 */
function animate() {
    requestAnimationFrame(animate);
    const pos = particles.geometry.attributes.position.array;
    const col = particles.geometry.attributes.color.array;
    const siz = particles.geometry.attributes.size.array;

    // Smooth following
    particles.position.x += (handPos.x - particles.position.x) * 0.1;
    particles.position.y += (handPos.y - particles.position.y) * 0.1;

    // Technique specific rotation
    if (currentTech === 'rune') particles.rotation.y += 0.015;
    else if (currentTech === 'heart') particles.rotation.z = Math.sin(Date.now() * 0.002) * 0.1;
    else {
        particles.rotation.y += handVel.x * 0.05 + 0.005;
        particles.rotation.x -= handVel.y * 0.05;
    }

    // Morphing Interpolation
    for (let i = 0; i < COUNT * 3; i++) {
        pos[i] += (targetPositions[i] - pos[i]) * 0.1;
        col[i] += (targetColors[i] - col[i]) * 0.1;
    }
    for (let i = 0; i < COUNT; i++) {
        siz[i] += (targetSizes[i] - siz[i]) * 0.1;
    }

    particles.geometry.attributes.position.needsUpdate = true;
    particles.geometry.attributes.color.needsUpdate = true;
    particles.geometry.attributes.size.needsUpdate = true;
    composer.render();
}

// Initialization
const cameraUtils = new Camera(uiElements.video, {
    onFrame: async () => {
        uiElements.canvas.width = uiElements.video.videoWidth;
        uiElements.canvas.height = uiElements.video.videoHeight;
        await hands.send({ image: uiElements.video });
    }, width: 640, height: 480
});

cameraUtils.start();
animate();

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    composer.setSize(window.innerWidth, window.innerHeight);
});