import { faker } from "@faker-js/faker";

export const postFactory = (count) => {
  const posts = [];
  for (let i = 0; i < count; i++) {
    posts.push({
      title: faker.lorem.sentence(),
      content: faker.lorem.paragraph(),
    });
  }
  return posts;
};
