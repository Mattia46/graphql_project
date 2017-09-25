const videoA = {
  id: 'a',
  title: 'Create a GraphQL Schema',
  duration: 120,
  watched: true,
};
const videoB = {
  id: 'b',
  title: 'Ember.js CLI',
  duration: 240,
  watched: false,
};
const videos = [videoA, videoB];


// Example of list of item and a filter method to return one of them through the arg passed in the query
const getVideoById = (id) => new Promise((resolve) => {
  const [video] = videos.filter((video) => {
    return video.id === id;
  });

  resolve(video);
});

exports.getVideoById = getVideoById;

// Method to return the full list of items
const getVideos = () => new Promise((resolve) => resolve(videos));
exports.getVideos = getVideos;

// Create a new video
const createVideo = ({ title, duration, released }) => {
  const video = {
    id: (new Buffer(title, 'utf8')).toString('base64'),
    title,
    duration,
    released,
  };

  videos.push(video);

  return video;
};

exports.createVideo = createVideo;
