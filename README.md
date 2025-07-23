# Minecraft Sound Browser

An interactive web application for browsing, playing, and managing Minecraft sound effects. Built with Vue 3 and Vite.

## Features

- 🔍 Browse and search through all Minecraft sound effects
- 🎵 Play individual sounds or create sound combinations
- 🎚️ Adjust pitch and volume for each sound
- 🏷️ Filter sounds by categories and tags
- 📋 Copy sound commands for use in-game or in MythicMobs
- 📎 Share sound combinations via URL

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- A modern web browser

### Installation

1. Clone the repository:
```bash
git clone https://github.com/xmorose/minecraftsounds.git
cd minecraft-sound-browser
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Building for Production

To create a production build:

```bash
npm run build
```

The built files will be in the `dist` directory.

## Development

### Recommended IDE Setup

- [IntelliJ IDEA](https://www.jetbrains.com/idea/) with the following plugins:
    - Vue.js
    - JavaScript / TypeScript (In this case i use JS only)
    - ESLint
  
At least thats what i use idk use whatever you want

### Project Structure

```
public/
├── sounds/          # Sound files (.ogg)
├── favicon.ico      # Site favicon
└── sound_tags.json  # Sound tag definitions

src/
├── components/      # Vue components
├── assets/         # Project assets
└── App.vue         # Root component

generateSounds.cjs   # Script to process sound data
```

### Updating Sound Data

The project includes scripts to generate and update sound data:

1. Run the sound generation script:
```bash
node generateSounds.cjs
```

Sound data is sourced from the [Minecraft Wiki](https://minecraft.wiki/w/Java_Edition_history_of_sound_events) and processed to work with this application.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is not affiliated with Mojang Studios or Microsoft. Minecraft content and materials are trademarks and copyrights of Mojang Studios or its licensors.

## Contact

For support or inquiries, please contact us at hello@minecraftsounds.com

## Acknowledgments

- Sound data sourced from the [Minecraft Wiki](https://minecraft.wiki/)
- Special thanks to the Minecraft community for maintaining documentation of sound events