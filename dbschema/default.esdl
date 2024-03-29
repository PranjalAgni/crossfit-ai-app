module default {
  type Gyms {
    required gymid: int64;
    required name: str;
    required country: str;
    required city: str;
    required state: str;
    required street: str;
    logo: str;
    required coordinates: Coordinates;
  }

  type Coordinates {
    required lat: float64;
    required long: float64;
  }
}
