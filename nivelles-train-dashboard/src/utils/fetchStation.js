const BASE_URL = "https://api.irail.be";

export async function fetchIRail(endpoint, params = {}) {

    const queryString = new URLSearchParams({
        format: "json",
        station: "Nivelles",
        arrdep: "departure",
        lang: "fr",
        ...params,
    }).toString();

    const url = `${BASE_URL}/${endpoint}/?${queryString}`;

    try {
        const response = await fetch(url, {
            headers: {
                "User-Agent": "Nivelles-Station-trains-display/1.0 (https://github.com/hugovrl29; verlyhugo959@gmail.com)"
            }
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch data from ${endpoint}`);
        }

        const data = await response.json()
        console.log(data);

        return data;
    } catch (error) {
        console.error(`Error fetching from ${endpoint}:`, error);
        return null;
    }
}
