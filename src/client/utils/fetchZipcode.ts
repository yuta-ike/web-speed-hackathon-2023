const cache: Record<string, string[][] | null> = {};

export const fetchZipcodeJa = async (zipcodeFragment: string) => {
  console.log(zipcodeFragment);
  if (cache[zipcodeFragment] !== undefined) {
    return cache[zipcodeFragment];
  }

  const res = await fetch(`/${zipcodeFragment}.json`);

  try {
    const data: string[][] = await res.json();

    cache[zipcodeFragment] = data;

    return data;
  } catch {
    cache[zipcodeFragment] = null;
    return null;
  }
};
