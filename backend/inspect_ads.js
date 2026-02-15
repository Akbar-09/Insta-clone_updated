const Ad = require('./ad-service/models/Ad');
const AdMedia = require('./ad-service/models/AdMedia');
const AdBudget = require('./ad-service/models/AdBudget');
const BoostedContentReference = require('./ad-service/models/BoostedContentReference');

async function run() {
    try {
        const ads = await Ad.findAll({
            include: [
                { model: AdMedia, as: 'media' },
                { model: BoostedContentReference, as: 'boostedContent' },
                { model: AdBudget, as: 'budget' }
            ]
        });

        console.log(`Total Ads: ${ads.length}`);
        ads.forEach(ad => {
            console.log('\n--- Ad Details ---');
            console.log(`ID: ${ad.id}`);
            console.log(`Title: ${ad.title}`);
            console.log(`Type: ${ad.adType}`);
            console.log(`Status: ${ad.status}`);
            console.log(`Budget: ${ad.budget ? ad.budget.dailyBudget : 'MISSING'}`);

            if (ad.adType === 'BOOST_CONTENT' && ad.boostedContent) {
                const data = ad.boostedContent.originalData || {};
                const url = data.mediaUrl || data.imageUrl || (data.media && data.media[0] && data.media[0].url);
                console.log(`Boosted URL: ${url}`);
            } else if (ad.media && ad.media.length > 0) {
                console.log(`Media URL: ${ad.media[0].url}`);
            } else {
                console.log('No Media found for this ad');
            }
        });
    } catch (e) {
        console.error('Inspection failed:', e);
    } finally {
        process.exit();
    }
}

run();
