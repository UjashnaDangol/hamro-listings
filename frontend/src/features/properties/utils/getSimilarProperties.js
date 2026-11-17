
export function getSimilarProperties(
  currentProperty,
  allProperties,
  limit = 3
) {
  if (!currentProperty || !Array.isArray(allProperties)) {
    return [];
  }

  // Exclude the current property and different listing types
  const eligibleProperties = allProperties.filter(
    (property) =>
      property.id !== currentProperty.id &&
      property.listingType === currentProperty.listingType
  );

  const scoredProperties = eligibleProperties.map((property) => {
    let score = 0;

    // Same city
    if (
      property.city &&
      currentProperty.city &&
      property.city.toLowerCase() === currentProperty.city.toLowerCase()
    ) {
      score += 25;
    }

    // Same property type
    if (
      property.propertyType &&
      currentProperty.propertyType &&
      property.propertyType.toLowerCase() ===
        currentProperty.propertyType.toLowerCase()
    ) {
      score += 20;
    }

    // Similar price (within 20%)
    if (property.price > 0 && currentProperty.price > 0) {
      const difference =
        Math.abs(property.price - currentProperty.price) /
        currentProperty.price;

      if (difference <= 0.2) score += 15;
    }

    // Same bedrooms
    if (
      property.bedrooms != null &&
      property.bedrooms === currentProperty.bedrooms
    ) {
      score += 5;
    }

    // Similar area (within 20%)
    if (property.area > 0 && currentProperty.area > 0) {
      const difference =
        Math.abs(property.area - currentProperty.area) /
        currentProperty.area;

      if (difference <= 0.2) score += 5;
    }

    return {
      ...property,
      similarityScore: score,
    };
  });

  // Sort by highest score; use ID as a tie-breaker
  scoredProperties.sort(
    (a, b) =>
      b.similarityScore - a.similarityScore ||
      a.id.localeCompare(b.id)
  );

  return scoredProperties.slice(0, limit);
}
