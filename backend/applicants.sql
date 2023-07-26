PRAGMA foreign_keys = OFF;
BEGIN TRANSACTION;

CREATE TABLE candidates {
    applicantID INTEGER NOT NULL PRIMARY KEY,

    applicantName TEXT,
    applicantEmail TEXT,
    applicantNumber TEXT,

    isLiked INTEGER NOT NULL,
    applicantNotes TEXT NOT NULL,

    resumeText TEXT NOT NULL,
    resumeSummary TEXT NOT NULL,
    fileBlob BLOB NOT NULL,

}

COMMIT;