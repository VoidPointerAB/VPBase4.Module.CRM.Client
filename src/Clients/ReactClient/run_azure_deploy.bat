@echo off

set "appname="
set "giturl="

IF [%appname%] == [] goto :noAppName
IF [%giturl%] == [] goto :noAppName

:: Set Temp Folder Path
set "tp=%temp%\vp_azure_deploy\%appname%"

:choice
set /P c=Are you sure you want to deploy [Y/N]?
if /I "%c%" EQU "Y" goto :deploy
if /I "%c%" EQU "N" goto :abort
goto :choice

:deploy

echo Deploying to prod

@echo off
for %%a in ("%~dp0\.") do set "parent=%%~nxa"

set /p comment="Enter deploy comment: "

set gitDir=%tp%

IF not exist %gitDir% (
	mkdir %gitDir%
	git clone %giturl% %gitDir% 
) ELSE (
	cd /D %gitDir%
	git pull
	cd ..
)

for /d %%i in ("%gitDir%\*") do if /i not "%%~nxi"==".git" del /s /q "%%i"
del /q %gitDir%\*.*

xcopy /s %~dp0. %gitDir%

cd /D %gitDir%

:deploychoice
set /P c=Are you sure you want to deploy [Y/N]?
if /I "%c%" EQU "Y" goto :gitdeploy
if /I "%c%" EQU "N" goto :abort
goto :deploychoice

:gitdeploy

git add -A
git commit -m "%comment% - %parent%"
git push

echo Deploy complete! :)

pause
exit


:noAppName
echo No appname present. Please check environment config.
goto :abort


:abort

echo No deploy, exiting...

pause
