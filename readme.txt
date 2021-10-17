Ubuntu 20.04 LTS

python --version //Python 3.8.8

pip --version //pip 20.2.3 from c:\users\lenovo\desktop\{FOLDER_NAME}\venv\lib\site-packages\pip (python 3.8)

python -m django --version 3.0.7

sudo apt install pip3 pip3 install virtualenv

which virtualenv /home/mete/.local/bin/virtualenv

source {venv}/bin/activate //COMMAND FOR LINUX   {venv}/Scripts/activate //COMMAND FOR WINDOWS

(venv)pip install -r requirements.txt

(venv)python manage.py makemigrations core

(venv)python manage.py migrate

(venv)python manage.py runserver 0.0.0.0:8000

.gitignore idea , core/migrations/ *