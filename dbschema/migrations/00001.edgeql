CREATE MIGRATION m1imguiioa3oxxizwudkagpmhu5xnlf4opz7tb3jmjulrza7qqcd2a
    ONTO initial
{
  CREATE TYPE default::Coordinates {
      CREATE REQUIRED PROPERTY lat: std::float64;
      CREATE REQUIRED PROPERTY long: std::float64;
  };
  CREATE TYPE default::Gyms {
      CREATE REQUIRED LINK coordinates: default::Coordinates;
      CREATE REQUIRED PROPERTY city: std::str;
      CREATE REQUIRED PROPERTY country: std::str;
      CREATE REQUIRED PROPERTY gymid: std::int64;
      CREATE PROPERTY logo: std::str;
      CREATE REQUIRED PROPERTY name: std::str;
      CREATE REQUIRED PROPERTY state: std::str;
      CREATE REQUIRED PROPERTY street: std::str;
  };
};
