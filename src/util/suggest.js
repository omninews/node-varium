export default function nameError(keys, prop) {
  const suggestions = suggestName(keys, prop);
  if (suggestions.length === 0) {
    return "Unable to offer any suggestions.";
  }
  if (suggestions.length === 1 || suggestions[0] === prop) {
    return `Maybe you meant ${suggestions[0]}?`;
  }
  return `Maybe you meant one of these: ${suggestions.join("|")}`;
}

// ESM export for levDistance and other helpers if needed
export function levDistance(a, b) {
  if (typeof a === "undefined") return 9000;
  if (typeof b === "undefined") return 9000;
  if (a.length === 0) return b.length;
  if (b.length === 0) return a.length;

  if (a.toLowerCase() === b.toLowerCase()) return 0;

  const matrix = [];

  // increment along the first column of each row
  let i;
  for (i = 0; i <= b.length; i += 1) {
    matrix[i] = [i];
  }

  // increment each column in the first row
  let j;
  for (j = 0; j <= a.length; j += 1) {
    matrix[0][j] = j;
  }

  // Fill in the rest of the matrix
  for (i = 1; i <= b.length; i += 1) {
    for (j = 1; j <= a.length; j += 1) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1, // substitution
          Math.min(
            matrix[i][j - 1] + 1, // insertion
            matrix[i - 1][j] + 1
          )
        ); // deletion
      }
    }
  }

  return matrix[b.length][a.length];
}

const sortByProp = (prop, list) =>
  list
    .slice(0)
    .sort((a, b) => (a[prop] < b[prop] ? -1 : a[prop] > b[prop] ? 1 : 0));

const suggestName = (alternatives, search) => {
  const possibleMatches = alternatives
    .map((name) => ({
      name,
      distance: levDistance(name, search),
    }))
    .filter((alternative) => alternative.distance < 3);

  return sortByProp("distance", possibleMatches).map(
    (alternative) => alternative.name
  );
};

export function suggestNameError(alternatives, search) {
  const suggestions = suggestName(alternatives, search);
  if (suggestions.length === 0) {
    return "Unable to offer any suggestions.";
  }
  if (suggestions.length === 1 || suggestions[0].distance === 0) {
    return `Maybe you meant ${suggestions[0]}?`;
  }
  return `Maybe you meant one of these: ${suggestions.join("|")}`;
}
