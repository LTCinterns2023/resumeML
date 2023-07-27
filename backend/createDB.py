import sqlite3

if __name__ == "__main__":
    conn = sqlite3.connect("applicants.db")
    c = conn.cursor()

    c.execute("""
        CREATE TABLE IF NOT EXISTS candidates (
            applicantID INTEGER PRIMARY KEY,

            applicantName TEXT,
            applicantEmail TEXT,
            applicantNumber TEXT,

            isLiked INTEGER NOT NULL,
            applicantNotes TEXT NOT NULL,

            resumeText TEXT NOT NULL,
            resumeSummary TEXT NOT NULL,
            fileBlob BLOB NOT NULL
        )
    """)

    conn.commit()
    conn.close()
