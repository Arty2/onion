# tools/

Auxiliary scripts for working with the onion theme.

The `.bat` files are Windows helpers for users who vendor the theme into a
site via `git submodule` or `git subtree`. They are optional — every
equivalent `git` command works unchanged on macOS and Linux.

| script                       | purpose                                           |
| ---------------------------- | ------------------------------------------------- |
| `pull-theme-submodule.bat`   | Update the theme when installed as a submodule.   |
| `pull-theme-subtree.bat`     | Update the theme when installed as a subtree.     |
| `push-theme-subtree.bat`     | Push local theme changes back upstream (subtree). |
| `screenshot.sh`              | Capture `images/screenshot.png` (1500x1000) and `images/tn.png` (900x600) via Playwright. Required dimensions for Hugo Themes gallery submission. |

## Third-party content

`exampleSite/content/posts/3d-demo/cube.glb` is the Box sample from
[KhronosGroup/glTF-Sample-Models](https://github.com/KhronosGroup/glTF-Sample-Models),
distributed under the [MIT License](https://github.com/KhronosGroup/glTF-Sample-Models/blob/master/LICENSE.md).
