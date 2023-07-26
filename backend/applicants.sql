PRAGMA foreign_keys = OFF;
BEGIN TRANSACTION;

CREATE TABLE candidates {
    applicantID INTEGER NOT NULL;
    resumeData TEXT NOT NULL;
}

CREATE TABLE resume_pdfs(filename TEXT PRIMARY KEY, content BLOB); 
COMMIT;