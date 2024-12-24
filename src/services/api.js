export function fetchTwitts(status) {
  // Generate sample twitts
  const twitts = Array.from({ length: 20 }, (_, i) => {
    const isChained = i % 7 === 0; // Determine if the tweet should have chained tweets
    const isRetwitt = i % 5 === 0 && !isChained; // Determine if the tweet should be a retweet

    // Function to generate a random 9-digit number for twitt_id
    const generateRandomId = () => Math.floor(100000000 + Math.random() * 900000000);

    // Function to create a single tweet
    const createTwitt = () => {
      const twitt_id = generateRandomId(); // Generate random 9-digit twitt_id
      return {
        twitt_id: `${twitt_id}`, // Convert to string
        status: 0,
        username: `User${twitt_id}`,
        hastag: `@user${twitt_id}`,
        profile_image: `https://picsum.photos/48?random=${twitt_id}`,
        twitt_text: `Status: ${status} This is sample twitt #${twitt_id}.`,
        post_date: new Date(
          Date.now() - Math.floor(Math.random() * 10000000000)
        ).toISOString(),
        media:
          Math.random() > 0.7
            ? `https://picsum.photos/500/300?random=${twitt_id}`
            : Math.random() > 0.2
            ? `https://video.twimg.com/amplify_video/1868153605234077696/vid/avc1/1280x720/Au6vN9i2rMrEnD85.mp4?tag=16`
            : null,
      };
    };

    // If it's a chained tweet, add a `chained_twitts` property with an array of tweets
    if (isChained) {
      const mainTwitt = createTwitt(); // Main tweet in the chain
      return {
        ...mainTwitt,
        chained_twitts: [
          createTwitt(),
          createTwitt(),
          {
            ...createTwitt(),
            retwitt: createTwitt(), // If it's a retweet, include it here
          },
          createTwitt(),
        ], // Add chained tweets
      };
    } else if (isRetwitt) {
      // If it's a retweet, simply create a retweet structure
      return {
        ...createTwitt(),
        retwitt: createTwitt(), // Add retwitt property
      };
    } else {
      // Normal tweet without any chaining or retweet
      return createTwitt();
    }
  });

  return twitts;
}