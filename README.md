# qt
Live Content Management System for HTML

## Before Setup
Make sure you have the ability to:
- Run PHP,
- Use SQL  (comminication with the database is done with [PDO](http://php.net/manual/en/intro.pdo.php).)
- Access a folder outside of the /public.
- Add users to your database.

## Setup
### Import the two .SQL files in your database system. 

### Manage Access
The passwords are stored outside of the public folder in .ini files, in the following form:
```
[database]
sn = 'localhost'
un = 'Jonh45'
pw = 'Pasword123'
db = 'qt_db'
```
You can find the pays in the links in ein the 3 connect files

There are 3 files you have to create 
- __insert.ini__, (Has full power to insert edit and delete)
- __select.ini__ and  (Has limited power to select)
- __users.ini__ (Can access the Databse with permision tokens)

And alow three users to acces teh databse with the follow permissions:
- qt_inse: SELECT, INSERT, DELETE, and UPDATE in qt_db
- qt_sele: SELECT in qt_db
- qt_user: SELECT in qt_users_db

## Creating the database.
1. Go to the phpMyAdmin staring page and choose SQL
2. Paste the data from the Setup.sql file.
