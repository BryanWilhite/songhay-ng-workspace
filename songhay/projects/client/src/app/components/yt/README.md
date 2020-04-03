# b-roll `player-video-you-tube` setup

## use `npm`

```powershell
npm i --save `
    songhay `
    @songhay/core `
    @angular/animations `
    @angular/cdk `
    @angular/material `
    web-animations-js `
    @songhay/player-video-you-tube
```

There may be a need to install `@angular/http` to support deprecated services that will be removed.

## enable `web-animations-js`

Un-comment `import 'web-animations-js';` in `polyfills.ts`.

## import a Material theme

Add an `@import` in `styles.scss`.

## add conventional `sprites.svg`

Load `sprites.svg` in a component logically above the `YouTubeModule`, typically in `app.component.ts`.

## add a top-level module that routes to a wrapper module

In this repo folder, `yt.module.ts` is the top-level module that defines a route to the wrapper module, `YouTubeLibModule`.

### avoid route conflicts

The `YouTubeModule` contains an empty route which could clash with any empty routes declared or imported into the same module.

### the default component of `YouTubeModule` is expecting a top-level route

This route has be at the root of the app:

```typescript
{
    path: `${YouTubeRoutePaths.root}${YouTubeRoutePaths.uploads}`,
    loadChildren: () => import('./components/yt/you-tube-lib.module').then(m => m.YouTubeLibModule)

}
```

@[BryanWilhite](https://twitter.com/BryanWilhite)