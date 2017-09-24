'use strict';

const { graphql, buildSchema } = require('graphql');
const videos = require('./videos');

const schema = buildSchema(`
    type Video {
        id: ID,
        title: String,
        duration: Int, 
        watched: Boolean
    }
    type Query {
        video: Video
        videos: [ Video ]
    }
    type Schema {
        query: Query
    }
    `);

const resolvers = {
    video: () => ({
        id: '1',
        title: 'Foo',
        duration: 180,
        watched: true
    }),
    videos: () => videos,
};

const query = `
query myFirstQuery {
    videos {
        id,
        title,
        duration,
        watched
    }
}`;

module.exports = { schema, resolvers };
