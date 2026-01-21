import mysql.connector

# connect to mysql
conn = mysql.connector.connect(
    host="localhost",
    user="root",
    password="root",   # change password if needed
    database="firstdb"    # your database name
)

cursor = conn.cursor()

# SQL to create table
sql = """
CREATE TABLE students (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50),
    age INT,
    city VARCHAR(50)
)
"""

cursor.execute(sql)
conn.commit()

print("Table created successfully")

conn.close()
