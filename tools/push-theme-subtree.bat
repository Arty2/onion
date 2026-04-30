@echo off
rem Push local theme changes back upstream when installed as a Git subtree.
rem Run from your Hugo site's repo root (where themes\onion exists).
if not exist themes\onion\ (
  echo [push-theme-subtree] No themes\onion directory here.
  echo Run this script from your Hugo site's repo root.
  pause
  exit /b 1
)
git subtree push --prefix=themes/onion onion master
pause
