const edgedb = require("edgedb");

const URL = "https://www.crossfit.com/wp-content/uploads/affiliates.json";
const db = edgedb.createClient();

async function insertGymWithLocation(properties, geometry) {
  const { name, street, id, city, state, country, images } = properties;
  const { coordinates } = geometry;
  try {
    const gym = await db.querySingle(`
    INSERT Gyms {
      gymid := ${id},
      name := '${name}',
      country := '${country}',
      city := '${city}',
      state := '${state}',
      street := '${street}',
      logo := '${images.logo.url}',
      coordinates := {
        (insert Coordinates {
          lat := ${coordinates[0]},
          long := ${coordinates[1]}
        }),
      }
    };
  `);

    const gymId = gym.id;

    console.log(`Inserted gym with ID: ${gymId}`);
    return gymId;
  } catch {
    console.error("Failed inserting: ", properties);
  }
  return -1;
}

async function fetchCrossfitAffiliates() {
  const response = await fetch(URL);
  const data = await response.json();
  console.log("Number of rows: ", data.features.length);
  for (const features of data.features) {
    await insertGymWithLocation(features.properties, features.geometry);
  }
}

fetchCrossfitAffiliates();
