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
