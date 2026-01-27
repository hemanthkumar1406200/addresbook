import pymysql

pymysql.version_info = (2, 2, 1, "final", 0) # This tricks Django's version check
pymysql.install_as_MySQLdb()