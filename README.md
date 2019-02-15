# Songhay Angular workspace

_Angular workspace of shared libraries and ‘studio floor’ client_

The intention here is to share Angular-based code among studio Angular projects. [The research](https://github.com/BryanWilhite/nodejs/tree/master/angular-workspace-minimal) on how to structure this workspace and projects starts in my `nodejs`, self-education repo.

## `@songhay/core` project

[These](songhay/projects/songhay/core) are the core types building on top of the more framework-agnostic `songhay-core` [repo](https://github.com/BryanWilhite/songhay-core).

## `@songhay/player-video-you-tube` project

[This](songhay/projects/songhay/player-video-you-tube) is the library for the YouTube video app of the b-roll player.

## initial setup commands

Starting in the root folder of this repo:

```console
ng new songhay --create-application=false --routing=true --style=scss --verbose=true
cd songhay
ng generate library @songhay/core --prefix=rx
npm i moment lodash
npm i @angular/animations @angular/cdk @angular/cdk-experimental @angular/material
ng generate library @songhay/player-video-you-tube --prefix=rx
```

Note that a library-generation command like `ng generate library @songhay/player/video/you-tube --prefix=rx` does not work for CLI >=7.2.3.

Also for studio-specific and historical reasons these commands are also needed:

```console
npm i @angular/http@7.2.0
npm i ..\..\songhay-core\dist\
```

Finally build the libraries:

```console
ng build @songhay/core
ng build @songhay/player-video-you-tube
```

@[BryanWilhite](https://github.com/BryanWilhite)
