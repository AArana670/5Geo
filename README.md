# 5Geo

Deploy server:

gunicorn --workers 4 --bind 0.0.0.0:5000 app:app
