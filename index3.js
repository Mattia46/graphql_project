// Implementing the JS queries instead of interpolation + Description

'use strict';

const { getVideoById, getVideos, createVideo } = require('./src/data');
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLBoolean,
  GraphQLNonNull, // shows the error message instead of just Null
  GraphQLList, // To return a list of items
  GraphQLInputObjectType, // To create an obj to send in the mutation
} = require('graphql');

const videoType = new GraphQLObjectType({
  name: 'Video',
  description: 'This is a video Obj',
  fields: {
    id: {
      type: GraphQLID,
      description: 'The id of the video.',
    },
    title: {
      type: GraphQLString,
      description: 'The title of the video.',
    },
    duration: {
      type: GraphQLInt,
      description: 'The duration of the video (in seconds).',
    },
    watched: {
      type: GraphQLBoolean,
      description: 'Whether or not the viewer has watched the video.',
    },
  },
});

// Query without arguments
//const queryType = new GraphQLObjectType({
  //name: 'QueryType',
  //description: 'The root query type.',
  //fields: {
    //video: {
      //type: videoType,
      //resolve: () => new Promise((resolve) => {
        //resolve({
          //id: 'a',
          //title: 'GraphQL',
          //duration: 180,
          //watched: false,
        //});
      //}),
    //},
  //},
//});

// Query passing arguments
const queryType = new GraphQLObjectType({
  name: 'QueryType',
  description: 'The root query type.',
  fields: {
    // Return a list of items, not passing an argument
    videos: {
      type: new GraphQLList(videoType),
      resolve: getVideos,
    },
    // Return a specific item, filtering the list through the arg passed
    video: {
      type: videoType,
      args: {
        id: {
            type: new GraphQLNonNull(GraphQLID), // Wrapped GraphQLID in GraphQLNonNull to receive the full error message instead of just null
          description: 'The id of the video.',
        },
      },
      resolve: (_, args) => {
        return getVideoById(args.id);
      },
    },
  },
});

// MutationType is a method to mutate the Obj, in this case to Add new objs
// For a cleaner way, check verbs/post.js
const mutationType = new GraphQLObjectType({
  name: 'Mutation',
  description: 'The root Mutation type.',
  fields: {
    createVideo: {
      type: videoType,
      args: {
        title: {
          type: new GraphQLNonNull(GraphQLString),
          description: 'The title of the video.',
        },
        duration: {
          type: new GraphQLNonNull(GraphQLInt),
          description: 'The duration of the video (in seconds).',
        },
        released: {
          type: new GraphQLNonNull(GraphQLBoolean),
          description: 'Whether or not the video is released.',
        },
      },
      resolve: (_, args) => {
        return createVideo(args);
      },
    },
  },
});

const schema = new GraphQLSchema({
  query: queryType,
  mutation: mutationType, // Added mutationType
});

module.exports = { schema };
