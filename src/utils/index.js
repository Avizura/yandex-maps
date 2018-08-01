export async function createPlacemark(coordinates) {
  /* eslint-disable no-undef */
  const geoObjectCollection = await ymaps.geocode(coordinates);
  const name = geoObjectCollection.geoObjects.get(0).properties.get('name');
  return {
    geometry: {
      coordinates
    },
    properties: {
      balloonContent: name
    }
  };
}
