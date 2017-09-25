// Implementing the JS queries instead of interpolation + Description

'use strict';

const { getVideoById } = require('./src/data');
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLBoolean,
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
    video: {
      type: videoType,
      args: {
        id: {
          type: GraphQLID,
          description: 'The id of the video.',
        },
      },
      resolve: (_, args) => {
        return getVideoById(args.id);
      },
    },
  },
});

const schema = new GraphQLSchema({
  query: queryType,
});

module.exports = { schema };
