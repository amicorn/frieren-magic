// Math algorithms and calculations for all the anime spells

export const COUNT = 50000;

export const patterns = {
    heart: (i) => {
        const t = (i / COUNT) * Math.PI * 2;
        const x = 16 * Math.pow(Math.sin(t), 3);
        const yBase = 13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t);
        return { x: x * 1.5, y: -yBase * 1.5, z: (Math.random() - 0.5) * 10, r: 1, g: 0.2, b: 0.6, s: 1.2 };
    },
    flame: (i) => {
        const t = i / COUNT;
        const angle = t * Math.PI * 20;
        const radius = 5 + t * 35;
        return { x: Math.cos(angle) * radius, y: t * -100 + 50, z: Math.sin(angle) * radius, r: 1, g: 0.3, b: 0, s: 1.5 };
    },
    rune: (i) => {
        const total = COUNT;
        if (i < total * 0.4) {
            const angle = (i / (total * 0.4)) * Math.PI * 2;
            const r = 30;
            return { x: Math.cos(angle) * r, y: 20, z: Math.sin(angle) * r, r: 1.0, g: 0.8, b: 0.2, s: 0.8 };
        } else if (i < total * 0.8) {
            const pillarIdx = i % 4;
            const offsets = [{x:15, z:15}, {x:-15, z:15}, {x:15, z:-15}, {x:-15, z:-15}];
            const h = (Math.random() - 0.5) * 60;
            return { x: offsets[pillarIdx].x + (Math.random()-0.5)*2, y: -h, z: offsets[pillarIdx].z + (Math.random()-0.5)*2, r: 1.0, g: 0.1, b: 0.5, s: 1.5 };
        }
        return { x: (Math.random()-0.5)*80, y: (Math.random()-0.5)*80, z: (Math.random()-0.5)*80, r: 1, g: 1, b: 1, s: 0.5 };
    },
    ice: (i) => {
        const angle = (i / COUNT) * Math.PI * 100;
        const radius = Math.sqrt(i / COUNT) * 45;
        return { x: Math.cos(angle) * radius, y: Math.sin(angle) * radius, z: Math.sin(i)*5, r: 0.5, g: 0.9, b: 1, s: 1.2 };
    },
    void: (i) => {
        const r = 25 + Math.random() * 50;
        const theta = Math.random() * Math.PI * 2;
        return { x: r * Math.cos(theta), y: r * Math.sin(theta), z: (Math.random()-0.5)*20, r: 0.6, g: 0, b: 1, s: 0.8 };
    },
    burst: (i) => {
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        const r = 50 + Math.random() * 30;
        return { x: r * Math.sin(phi) * Math.cos(theta), y: r * Math.sin(phi) * Math.sin(theta), z: r * Math.cos(phi), r: 1.0, g: 0.85, b: 0.4, s: 0.8 };
    },
    neutral: () => ({
        x: (Math.random()-0.5)*10, y: (Math.random()-0.5)*10, z: (Math.random()-0.5)*10, r:0.2, g:0.5, b:0.5, s:0.3
    })
};