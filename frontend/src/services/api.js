export function get_twitts(status) {
  // Generate sample tweets
  const tweets = Array.from({ length: 20 }, (_, i) => {
    const isChained = i % 7 === 0;
    const isRetweet = i % 5 === 0 && !isChained;

    const createTweet = (id) => ({
      tweet_id: `${id}`,
      username: `User${id}`,
      hastag: `@user${id}`,
      profile_image: `https://picsum.photos/48?random=${id}`,
      tweet_text: `Status: ${status} This is sample twitt #${id}. It contains some text to demonstrate the layout.`,
      post_date: new Date(
        Date.now() - Math.floor(Math.random() * 10000000000)
      ).toISOString(),
      media:
        Math.random() > 0.7
          ? `https://picsum.photos/500/300?random=${id}`
          : null,
    });

    if (isChained) {
      return [
        createTweet(i + 1),
        createTweet(i + 2),
        {
          ...createTweet(i + 3),
          retweet: createTweet(`rt-${i + 3}`),
        },
        createTweet(i + 4),
      ];
    } else if (isRetweet) {
      return {
        ...createTweet(i + 1),
        retweet: createTweet(`rt-${i + 1}`),
      };
    } else {
      return createTweet(i + 1);
    }
  });
  return tweets;
}
