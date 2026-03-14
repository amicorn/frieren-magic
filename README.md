
# 葬送のフリーレン (Sousou no Frieren) — Mana Particle Visualization
Code and design by Amy Ouyang.

An immersive, real-time Computer Vision application that allows users to manifest iconic magic from the anime *Frieren: Beyond Journey's End*. Using **MediaPipe Hand Tracking** and **Three.js**, the program translates physical hand gestures into complex 50,000-particle mathematical visualizations.

I love this anime, highly recommend to anyone interested in the philosophy of life and what truly matters from the perspective of an immortal. And anyone who likes art, fantasy, and ethereal, Celtic folk music.

## ✨ Features

* **Real-time Gesture Recognition:** Leverages MediaPipe to detect finger counts, palm spread, and specific hand shapes.
* **Dynamic Particle Physics:** 50,000 individual particles rendered with `THREE.Points` and hardware-accelerated via WebGL.
* **Post-Processing Bloom:** Cinematic glow effects using `UnrealBloomPass` to mimic the ethereal feel of "Mana."
* **Adaptive UI:** The Japanese title and "Mana Meter" respond in real-time to the intensity and nature of the cast magic.

## 🔮 Magic Spells & Hand Gestures

| Spell/Technique Name | Visual Description | Gesture Requirement |
| :--- | :--- | :--- |
| **Sensing Mana** | Neutral teal particle cloud | Default / No hand detected |
| **Blow Heart Kiss** | Pink heart-shaped throb | Finger Heart (Thumb/Index touching) |
| **Solar Flame Eruption** | Spiraling orange solar flares | One finger pointed up |
| **Zoltraak Fracture** | Crystalline blue crystalline array | Four fingers pointed up |
| **Abyssal Reach** | Deep purple void particles | Closed fist |
| **Eldritch Rune Gate** | Pink/Gold pillars and circular gate | Two hands touching (index tips) |
| **Field of Light Flowers** | Expansive gold/white burst | Two hands spread wide |

---

## 📸 Screenshots + Visualization Gallery (all references to the anime!)

| Mana Sensing & Basic State | Solar & Flame Magic | Abyssal & Void |
| :---: | :---: | :---: |
| <img src="screenshots/base_state_sensing_mana.png" width="250"/> <br> *Sensing Mana (Neutral)* | <img src="screenshots/orange_solar_flame.png" width="250"/> <br> *Solar Flame Eruption* | <img src="screenshots/purple_abyssal_reach.png" width="250"/> <br> *Abyssal Reach* |
| <img src="screenshots/golden_halo_particle.png" width="250"/> <br> *Mana Resonance* | <img src="screenshots/orange_solar_flame_2.png" width="250"/> <br> *Solar Flame (Side View)* | <img src="screenshots/purple_abyssal_reach_2.png" width="250"/> <br> *Void Compression* |

| Eldritch Rune Gates | Frieren's Secret Weapon | Zoltraak & Flower Fields |
| :---: | :---: | :---: |
| <img src="screenshots/pink_gold_eldritch_rune_gate.png" width="250"/> <br> *Rune Gate Activation* | <img src="screenshots/frieren_blow_heart.png" width="250"/> <br> *Blow Heart Kiss* | <img src="screenshots/blue_zoltraack.png" width="250"/> <br> *Zoltraak Crystalline* |
| <img src="screenshots/pink_gold_eldritch_rune_gate_circular.png" width="250"/> <br> *Circular Rune Geometry* | <img src="screenshots/frieren_blow_heart_2.png" width="250"/> <br> *Heart 2* | <img src="screenshots/blue_zoltraack_crystal.png" width="250"/> <br> *Crystal Fracture* |
| <img src="screenshots/pink_gold_rune_gate_2.png" width="250"/> <br> *Himmel's Gate* | <img src="screenshots/frieren_blow_heart_3.png" width="250"/> <br> *Heart 3* | <img src="screenshots/gold_field_of_light_flowers.png" width="250"/> <br> *Field of Flowers made of light* |

---

## 🛠️ Tech Stack

* **Frontend:** HTML5, CSS3 (Cinzel Web Font)
* **3D Engine:** [Three.js](https://threejs.org/)
* **Computer Vision:** [Google MediaPipe Hands](https://google.github.io/mediapipe/solutions/hands.html)
* **Post-Processing:** UnrealBloomPass (Three.js Add-on)

## 🚀 How to Run Locally

1.  Clone the repository:
    ```bash
    git clone [https://github.com/your-username/frieren-cv-magic.git](https://github.com/your-username/frieren-cv-magic.git)
    ```
2.  Since the project uses ES Modules via `importmap`, you need to serve the file from a local server.
    * **Using VS Code:** Right-click `index.html` and select **"Open with Live Server"**.
    * **Using Python:** Run `python -m http.server` in the project directory.
3.  Allow Camera permissions in your browser.
4.  Perform gestures to start visualizing mana!

## 📜 License
Code by Amy Ouyang. This project is for fan-use and educational purposes. Inspired by the work of Kanehito Yamada and Tsukasa Abe.
