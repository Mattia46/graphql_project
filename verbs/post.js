// Instead of passing the obj exposed, with GraphQLInputObjectType we can create an object an pass it through. The advantage of this approach is to define a common object an use it in multiple places ( cleaner way )
const videoInputType = new GraphQLInputObjectType({
  name: 'VideoInput',
  fields: {
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
});

const mutationType = new GraphQLObjectType({
  name: 'Mutation',
  description: 'The root Mutation type.',
  fields: {
    createVideo: {
      type: videoType,
      args: {
        video: {
          type: new GraphQLNonNull(videoInputType),
        },
      },
      resolve: (_, args) => {
        return createVideo(args.video);
      },
    },
  },
});
