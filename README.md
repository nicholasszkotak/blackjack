# 1. Running the App/Tests

This is a basic Create React App application, so running the application and tests is straightforward:

1) Install NodeJS on the machine if necessary. This was built using version 20.10.0.
2) Clone the repository.
3) Open a terminal to the root directory of the application.
4) Run `npm start` to run the application in the browser.
5) Run `npm test` to run all unit tests in watch mode.

# 2. How to Play

The game is initialized on startup. Hands are dealt to the dealer and player. The player is able to select three options:
- Hit: Allows the player to draw another card. Hit will be available so/ long as the player has a score of less than 21.
- Stand: Allows the player to end their turn, passing control to the dealer. The dealer will draw cards so long as their score is less than 17. Stand will be available so long as the player has a score of less than 21.
- Restart: Restarts the game. Restart is always enabled.

Once the game reaches an end state, a message in red will appear below the buttons:
WIN: The player won the game by having a higher score than the dealer or if the dealer has over 21.
LOSE: The player lost the game by having a lower score than the dealer or if the player has over 21.
TIE: The player and dealer both ended the game on the same score.

# 3. Description of Project/Architecture

Frontend
========

I opted to build the frontend in React for two reasons. One, because using Create-React-App to bootstrap the application is simple and straightforward, and two because I understand there is some interest at Freestar in React. I didn't hyper-focus on my React architecture, but here are some basic callouts for what I built:

- /view/components - these are all the components of the application. I try to build my components to be small and pure functions of props, which make them very easy to maintain. If I need to maintain state, I try to keep that limited because tracking state all across an application can get messy quickly. This app was small enough where I just maintained a single state object in the `<Game />` component and passed down what I needed, but more complex apps would call for more sophistication.

- /view - the root directory contains the `<App />` component which I typically use as the location to load in any kind of broader state, initialize helper liibraries, etc. Here I just use it to establish a rudimentary dependency tree for the backend, but this is also where I may establish Redux, Context, and other cross-cutting functionality for the package.
 
Backend
=======

While there is no backend per se in the sense of having a server to talk to, I attempted to create a backend layer which generally follows the principles I would normally apply to a backend layer. This can be found in the /services and /models directory. Here are some high-level points of what I was trying to accomplish in each:

- /services - these are backend classes which provide stateless functions a la a REST API which can be consumed by anyone needing the functionality. I applied a dependency injection pattern where each service is an interface, which allows for a straightforward mocking approach in tests as well as some inherent decoupling and flexibility if there was a need to sub in different functionality. There wasn't an example of that here, but that can be useful in enterprise applications, for example using feature flagging to swap in a new service at runtime to trial a new feature. The most extreme example of this pattern in this code base may be the "RandomService" which is a facade over Math.random(). This allows for tests to be written which mock out the random element, leading to more stable tests.

- /models - these are the classes which represent state in the application. Typically I like to go for lean models/POJOs, preferring to have business logic in testable services and utilities. That said, I did implement a decent amount of business logic in the form of derived properties on the models. For example, the BlackJack scoring I implemented as a getter on the Player class, because I saw this is as a value that was directly calculated from the state of the Player. This also allows me to easily bind the score on the frontend. 

Tests
=====

I wrote unit tests for both the frontend and backend. For frontend tests, I wrote using React Testing Library, which is a bit of a departure from my earlier experience using Enzyme. RTL is opinionated toward a behavioral integration testing approach, whereas Enzyme allows for more of an implementation-based unit testing approach. I think there are pros and cons to both, but went with RTL because it was ready-packeged with CRA. As a result, these tests are a little more integration-oriented, especially for components higher in the tree like `<Game />`.

For the backend, I used more of a unit testing approach, where I tested each individual function's logic in relative isolation. My typical approach to testing is to allow for the flexibility to write tests of any type, but to write more unit tests than integration and higher as they are easier to write, quicker to run, and if there is a well-understood clean architecture in place, integration tests don't add a lot more value and so can be written as needed. This means that in certain tests, I make use of IoC to create mocks of service interfaces instead of using concrete implementations. 

All tests are written following the Arrange-Act-Assert method which has always been my favorite way to structure and visualize tests.

# 4. Random Thoughts

Redux/Context
=============

This application was simple enough that I stored the game state in a single object in React's local component state. At the beginning of the project I toyed with the idea of using React's Context API to store the state, as that's been a common pattern on several recent React projects I've worked on. In the past, I've also used Redux for this purpose or, more realistically, a combination of Redux and local React state. I have opinions on state management but mostly I look for consistent and mindful implementation where the best tool is used for the job. For example, Redux or the Context API are most useful if you have global state that is frequently accessed, like the current user or roles/permissions, and local state can be more helpful if you know that state should be self-contained, for example a user filling out a form.

Typescript
==========

I opted to use Typescript for this project. I'm always on the fence about its use, because while I think it can be a powerful tool, I always find it adds a lot of clutter and I'm not sure the best ways to use it. I especially feel this when incorporating it into React. My use of TS here is spotty and maybe not reflective of best practices. On a team, I would probably leave the team to decide when/how/if to use TS and focus more on having consistent design patterns reinforced through unit testing and code reviews. 

Other
=====

I enjoyed doing this project. It was straightforward, to the point, and took my mind in a few different places.  I think my value as an engineer comes less from my coding abilities and more from what I think about when I tackle a project like this. For example, in writing this, I considered the value of Typescript, how best to construct classes in JS, how to incorporate dependency injection into my design, where and how to handle state management, and how to open up my application to flexibility and testing. This involved research and thinking about what I may do in different scenarios, and where to make compromises and what that would mean overall. Such thoughts are difficult to capture by just looking at a codebase but I'm happy to talk about all these topics in depth. I love looking at a system in the big picture and building engineering teams around it such that development is easy, enjoyable, and informative, and hope that this README and codebase demonstrates that.