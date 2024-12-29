export function fetchTwitts(status) {
  // generates sample twitts
  const twitts = Array.from({ length: 20 }, (_, i) => {
    const isChained = i % 7 === 0; // Determine if the tweet should have chained tweets
    const isRetwitt = i % 5 === 0 && !isChained; // Determine if the tweet should be a retweet

    const generateRandomId = () => Math.floor(100000000 + Math.random() * 900000000);

    const generateMedia = (twitt_id) => {
      if (Math.random() > 0.4) {
        return [`https://picsum.photos/500/300?random=${twitt_id}`];
      }
      if (Math.random() > 0.8) {
        return [
          `https://video.twimg.com/amplify_video/1868153605234077696/vid/avc1/1280x720/Au6vN9i2rMrEnD85.mp4?tag=16`,
        ]; // Return a video link as a list
      }
      return []; // Return an empty list if no media
    };

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
        media: generateMedia(twitt_id), 
      };
    };

    // If chained tweet, add  `chained_twitts` with an array of tweets
    if (isChained) {
      const mainTwitt = createTwitt(); // Main tweet in the chain
      return {
        ...mainTwitt,
        chained_twitts: [
          createTwitt(),
          createTwitt(),
          {
            ...createTwitt(),
            retwitt: createTwitt(), // If contains a retweet
          },
          createTwitt(),
        ], // Add chained tweets
      };
    } else if (isRetwitt) {
      // If it's a retweet
      return {
        ...createTwitt(),
        retwitt: createTwitt(), 
      };
    } else {
      // Normal tweet without any chaining or retweet
      return createTwitt();
    }
  });

  return twitts;
}

export function fetchUsers(){
  const mockUsers = [
    { username: "@user1", lastScan: "2023-05-15 10:30:00" },
    { username: "@user2", lastScan: "2023-05-14 15:45:00" },
    { username: "@user3", lastScan: "2023-05-13 09:20:00" },
  ];
  return mockUsers;
}
