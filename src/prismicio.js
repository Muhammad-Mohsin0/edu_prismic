import * as prismic from "@prismicio/client";

export const repositoryName = "edumim"; // Replace with your Prismic repo name

export const client = prismic.createClient(repositoryName, {
  accessToken:
    "MC5aMXdQUGhJQUFDSUF6TG9T.JgdnOFfvv70TIe-_vXvvv71Y77-9VW7vv73vv73vv73vv71y77-9T--_vTg3V--_vSFhQB4u", // Optional: If your repository requires an access token
});
