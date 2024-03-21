export const getUser = () => {
  return {
    query: `query {
          getPost {
              id
              title
              content
          }
          }`,
  };
};
