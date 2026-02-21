
/**
 * Groups a flat list of stories by userId.
 * @param {Array} stories - Flat array of story objects
 * @returns {Array} - Array of user groups { userId, username, userAvatar, stories: [] }
 */
export const groupStoriesByUser = (stories) => {
    if (!stories || !Array.isArray(stories)) return [];

    const groups_map = new Map();

    stories.forEach(story => {
        if (!groups_map.has(story.userId)) {
            groups_map.set(story.userId, {
                userId: story.userId,
                username: story.username || 'User',
                userAvatar: story.userAvatar || story.avatar,
                stories: []
            });
        }
        groups_map.get(story.userId).stories.push(story);
    });

    return Array.from(groups_map.values()).map(group => ({
        ...group,
        allSeen: group.stories.every(s => s.seen)
    }));
};
