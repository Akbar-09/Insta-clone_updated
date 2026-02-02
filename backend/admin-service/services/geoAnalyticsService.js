const internalApi = require('./internalApi');

// Simple static map for demo purposes. In production, use a library like 'iso-3166-1'
const COUNTRY_CODES = {
    'India': 'IN',
    'United States': 'US',
    'USA': 'US',
    'Brazil': 'BR',
    'Turkey': 'TR',
    'Bangladesh': 'BD',
    'Indonesia': 'ID',
    'Ghana': 'GH',
    'Nigeria': 'NG',
    'Jordan': 'JO',
    'Russia': 'RU',
    'Pakistan': 'PK',
    'China': 'CN',
    'United Kingdom': 'GB',
    'Canada': 'CA',
    'Australia': 'AU',
    'Germany': 'DE',
    'France': 'FR',
    'Italy': 'IT',
    'Spain': 'ES',
    'Japan': 'JP',
    'South Korea': 'KR'
};

const getCountryCode = (name) => {
    if (!name) return 'Unknown';
    return COUNTRY_CODES[name] || name.substring(0, 2).toUpperCase();
};

exports.getGeoUserDistribution = async (search, limit) => {
    try {
        // 1. Fetch from User Service
        const response = await internalApi.getCountries();
        const rawData = response.data.data || [];

        // 2. Map & Format
        let countries = rawData.map(item => ({
            code: getCountryCode(item.name),
            name: item.name || 'Unknown',
            users: parseInt(item.count)
        }));

        // 3. Filter (Search)
        if (search) {
            const lowerSearch = search.toLowerCase();
            countries = countries.filter(c => c.name.toLowerCase().includes(lowerSearch));
        }

        // 4. Sort
        countries.sort((a, b) => b.users - a.users);

        // 5. Calculate Summary (before limiting)
        const totalCountries = countries.length;
        const totalUsers = countries.reduce((sum, c) => sum + c.users, 0);
        const topCountry = countries.length > 0 ? countries[0] : null;

        // 6. Limit
        if (limit) {
            countries = countries.slice(0, parseInt(limit));
        }

        return {
            countries,
            summary: {
                totalCountries,
                totalUsers,
                topCountry
            }
        };

    } catch (error) {
        console.error('Geo Analytics Error:', error);
        throw error;
    }
};
