import sqlite3 as sql

conn = sql.connect("./backend/database.db", check_same_thread=False)
cursor = conn.cursor()
cursor.execute("PRAGMA foreign_keys = ON")

def show():
    print(cursor.execute("SELECT resumeText FROM candidates WHERE applicantID = 30;").fetchall())

    conn.commit()

def nuke():
    cursor.execute("DELETE FROM candidates")
    conn.commit()


if __name__ == "__main__":
    nuke()
    
conn.close()
