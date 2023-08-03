const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('./plants.db', (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Connected to the SQLite database.');
});

db.run(`CREATE TABLE plants (
    id INTEGER PRIMARY KEY,
    common_name TEXT,
    scientific_name TEXT,
    other_name TEXT,
    family TEXT,
    origin TEXT,
    type TEXT,
    dimensions_min REAL,
    dimensions_max REAL,
    dimensions_unit TEXT,
    cycle TEXT,
    watering TEXT,
    watering_period TEXT,
    sunlight TEXT,
    pruning_month TEXT,
    seeds INTEGER,
    attracts TEXT,
    propagation TEXT,
    flowers INTEGER,
    pest_susceptibility TEXT,
    fruits INTEGER,
    edible_fruit INTEGER,
    leaf INTEGER,
    leaf_color TEXT,
    growth_rate TEXT,
    medicinal INTEGER,
    poisonous_to_humans INTEGER,
    poisonous_to_pets INTEGER,
    rare_level INTEGER,
    indoor INTEGER,
    image_url TEXT
)`, (err) => {
    if (err) {
        console.error(err.message);
    } else {
        console.log("Plants table created successfully");
    }
});

db.close((err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Closed the database connection.');
});
