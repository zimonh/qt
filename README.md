# qt
qt is a platform where you can share and run blocks of code.
- You can create new pages and open multiple blocks like this: qt.zimonh.at/page1,page2
- All changes are tracked so you get live __inserts__ notification of __updates, and deletes__ as others make changes.
- And changes and deletes are stored in a save place.
- re run <scipt> in a block using ctrl-enter.
- share encrpted blocks
- create un-indexed pages by adding __secret__ in the page name.

## Example
<img src="https://blog.zimonh.at/wp-content/uploads/2018/06/qt_sceen.jpg"/>

## Before Setup
Make sure you have the ability to:
- Run PHP,
- Use SQL  (comminication with the database is done with [PDO](http://php.net/manual/en/intro.pdo.php).)
- Access a folder outside of the /public.
- Add users to your database.

## Setup
### Creating the database.
1. Go to the phpMyAdmin staring page and choose SQL
2. Paste the data from the two .sql files.

### Manage Access
The passwords are stored outside of the public folder in .ini files, in the following form:
```
[database]
sn = 'localhost'
un = 'Jonh45'
pw = 'Pasword123'
db = 'qt_db'
```
There are 3 of these files you have to create 
- __insert.ini__, (Has full power to insert edit and delete)
- __select.ini__ and  (Has limited power to select)
- __users.ini__ (Can access the Databse with permision tokens)

And alow three users to acces the databse with the follow permissions:
- qt_inse: SELECT, INSERT, DELETE, and UPDATE in qt_db
- qt_sele: SELECT in qt_db
- qt_user: SELECT in qt_users_db

__You can find the link to the .ini files in the 3 connect files.__

## License
<a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/"><img alt="Creative Commons License" style="border-width:0" src="https://i.creativecommons.org/l/by-nc-sa/4.0/88x31.png" /></a><br>
Copyright - ZIMONH 2018
