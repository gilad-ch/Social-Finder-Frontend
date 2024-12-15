export function fetchTwitts(status) {
  // Generate sample twitts
  const twitts = Array.from({ length: 20 }, (_, i) => {
    const isChained = i % 7 === 0;
    const isRetwitt = i % 5 === 0 && !isChained;

    const createTwitt = (id) => ({
      twitt_id: `${id}`,
      username: `User${id}`,
      hastag: `@user${id}`,
      profile_image: `https://picsum.photos/48?random=${id}`,
      twitt_text: `Status: ${status} This is sample twitt #${id}. It contains some text to demonstrate the layout.`,
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
        createTwitt(i + 1),
        createTwitt(i + 2),
        {
          ...createTwitt(i + 3),
          retwitt: createTwitt(`rt-${i + 3}`),
        },
        createTwitt(i + 4),
      ];
    } else if (isRetwitt) {
      return {
        ...createTwitt(i + 1),
        retwitt: createTwitt(`rt-${i + 1}`),
      };
    } else {
      return createTwitt(i + 1);
    }
  });
  return twitts;
}
