'use strict';

/////////////////////////////////
// Class: User
class User {
  static newsSettingsStarter = {
    pageSize: 10,
    category: 'General',
  };

  constructor(
    firstName,
    lastName,
    username,
    password,
    newsSettings = User.newsSettingsStarter
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.username = username;
    this.password = password;
    this.newsSettings = newsSettings;
  }

  async fetchNews(country, category, pageSize, page) {
    try {
      const url =
        `https://newsapi.org/v2/top-headlines?` +
        `country=${country}&` +
        `category=${category}&` +
        `pageSize=${pageSize}&` +
        `page=${page}&` +
        `apiKey=46732a4f19664c4db0fa2f443bf6e500`;
      console.log(url);
      const response = await fetch(url);
      if (!response.ok)
        throw new Error(`Something wrong! ERROR ${response.status}`);
      const data = await response.json();
      if (data.totalResults === 0) {
        throw new Error('Canot find news!');
      }
      return data;
    } catch (err) {
      throw err;
    }
  }
}

const a = new User(1, 2, 3, 4, 6);

/////////////////////////////////
// Function: Parse user data
const parseUser = function (data) {
  const user = new User(
    data.firstName,
    data.lastName,
    data.username,
    data.password,
    data.newsSettings
  );
  return user;
};
