CREATE TABLE Floorplans (
	floorplan_id SERIAL UNIQUE PRIMARY KEY,
	name TEXT UNIQUE NOT NULL,
	created_date TIMESTAMP DEFAULT now()
);

CREATE TABLE Blueprints (
	blueprint_id SERIAL UNIQUE PRIMARY KEY,
	owner_id INTEGER REFERENCES Floorplans(floorplan_id),
	filename TEXT NOT NULL,
	created_date TIMESTAMP DEFAULT now()
);