export const getPost = () => {
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
