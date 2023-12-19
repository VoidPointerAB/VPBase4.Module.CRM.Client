@echo off

set envType=prod

if exist dist echo "Removing old dist folder..." && rmdir /q /s dist

call npm run build:%envType%

set tempdate=%DATE:/=%
set temptime=%TIME::=%
set temptime=%temptime: =0%

for /f %%i in ('git rev-parse --short HEAD') do set currgit=%%i

set dirname="%tempdate:~0,4%%tempdate:~5,2%%tempdate:~8,2%_%temptime:~0,4%_%currgit%_%envType%"

echo Renaming build file...
rename build %dirname%

echo Creating dist folder...
mkdir dist

echo Moving npm-generated files to dist...
move %dirname% dist

pause
