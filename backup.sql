BEGIN TRANSACTION;
CREATE TABLE IF NOT EXISTS "teachers" (
	"id"	INTEGER,
	"firstname"	TEXT,
	"lastname"	TEXT,
	PRIMARY KEY("id")
);
CREATE TABLE IF NOT EXISTS "schedules" (
	"id"	INTEGER,
	"subject_id"	INTEGER,
	"room_id"	INTEGER,
	"week"	TEXT,
	"start_time"	NUMERIC,
	"end_time"	NUMERIC,
	PRIMARY KEY("id")
);
CREATE TABLE IF NOT EXISTS "users" (
	"id"	INTEGER,
	"username"	TEXT,
	"password"	TEXT,
	PRIMARY KEY("id")
);
CREATE TABLE IF NOT EXISTS "subjects" (
	"id"	INTEGER,
	"label"	TEXT,
	"subject_code"	TEXT,
	"time_allocation"	NUMERIC,
	"week"	TEXT,
	PRIMARY KEY("id")
);
INSERT INTO "teachers" VALUES (1,'Mang','Juan');
INSERT INTO "teachers" VALUES (2,'Foo','Bar');
INSERT INTO "teachers" VALUES (3,'Lil','Pi');
INSERT INTO "teachers" VALUES (4,'SAITAMA','GWAPO');
INSERT INTO "subjects" VALUES (1,'Math','MATH101',1,'monday, wednesday, friday');
INSERT INTO "subjects" VALUES (2,'Science','SCI101',1.5,'tuesday, thursday');
INSERT INTO "subjects" VALUES (3,'English','ENG101',1.5,'monday, tuesday, wednesday, thursday, friday');
INSERT INTO "subjects" VALUES (4,'Filipino','FIL101',1,'tuesday, thursday');
INSERT INTO "subjects" VALUES (5,'PE','PE101',1.5,'saturday');
INSERT INTO "subjects" VALUES (6,'Computer Science','CS101',2,'monday, wednesday, friday');
COMMIT;
