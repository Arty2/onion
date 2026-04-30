@echo off
rem Update the onion theme when installed as a Git submodule.
rem Run from your Hugo site's repo root (where themes\onion exists).
if not exist themes\onion\ (
  echo [pull-theme-submodule] No themes\onion directory here.
  echo Run this script from your Hugo site's repo root.
  pause
  exit /b 1
)
cd themes\onion
git checkout master
git pull
cd ..\..
pause
