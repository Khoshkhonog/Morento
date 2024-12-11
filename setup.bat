@echo off

cd car_rent_react || (
    echo Directory car_rent_react not found
    pause  
    exit /b 1
)

echo Building React application...
 
call npm install 
call npm run build    

cd ..\backend || (
    echo Directory backend not found
    pause   
    exit /b 1
)

echo Installing Python dependencies...
pip install -r requirements.txt

echo Setup completed successfully.
pause   