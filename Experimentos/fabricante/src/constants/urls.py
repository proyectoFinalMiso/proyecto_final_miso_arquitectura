from os import getenv

# External routes
DB_HOST = getenv('DB_HOST')
DB_USER = getenv('DB_USER')
DB_PWD = getenv('DB_PWD')
DB_NAME = getenv('DB_NAME')

DATABASE_URI = f'postgresql+pg8000://{getenv(DB_USER)}:{getenv(DB_PWD)}@{getenv(DB_HOST)}/{getenv(DB_NAME)}'