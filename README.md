# React Digital TV Guide 

- A simple responsive web application that uses the public TVMaze API (https://www.tvmaze.com/api) to display TV Shows and some basic details.
- Working login/logout function.
- Functional registration
- Administrative users can manage other registered users (delete users)
- There is a Search bar for finding Shows by title.
- Although the genres are unreliable, and I’ve found a few results which do not include them, results which include “Adult” in the genre have been excluded from the basic user account. To prove this, create both respective accounts and search for Naked News, which has an adult rating. Admin will retrieve a result, while basic will not. 

### Set port
.env
```
PORT=8081
```

## Project setup

In the project directory, you can run:

```
npm install
# or
yarn install
```

or

### Compiles and hot-reloads for development

```
npm start
# or
yarn start
```

Open [http://localhost:8081](http://localhost:8081) to view it in the browser.

The page will reload if you make edits.
