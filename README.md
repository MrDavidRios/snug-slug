# Snug Slug

### Running Web UI locally

1. Install dependencies: `npm install`
2. Run the environment: `npm run dev`

After this, it should start a local server where you can view, work on, and test the web UI.

## Making *changes*
1. Making SASS (CSS) changes? Make sure you have the SASS compiler watching your every move by opening another terminal window and running `npm run sass`.

That's it. The environment hot-reloads, so your React changes will automatically update the relevant components on the page.

## Adding a new component
A good example is located in [`src/assets/components/button`](https://github.com/MrDavidRios/snug-slug/tree/main/src/components/button).
1. Make a new folder under [`src/assets/components`](https://github.com/MrDavidRios/snug-slug/tree/main/src/components)
2. Make a .tsx file with your component name as the file name (e.g. Button.tsx - *uppercase filename is React component convention*)
3. Make a .scss file with your component name as the file name (e.g. button.scss - *lowercase filename is CSS convention*)
4. In [`src/styles/index.scss`](https://github.com/MrDavidRios/snug-slug/blob/main/src/styles/index.scss), add an `@import` line that references your newly created .scss file. This makes sure that it's included in the compiled styles. (e.g. `@import "../components/button/button";`)

You're good to go!
