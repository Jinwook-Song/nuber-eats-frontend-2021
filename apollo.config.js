module.exports = {
  client: {
    includes: ["./src/**/*.{tsx,ts}"],
    tagName: "gql",
    service: {
      name: "nuber-eats-backend-2021",
      url: "http://localhost:5000/graphql",
    },
  },
};
