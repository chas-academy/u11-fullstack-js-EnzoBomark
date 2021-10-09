U11-FULLSTACK-JS-ENZOBOMARK

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]

<!-- PROJECT LOGO -->
<br />
<p align="center">
  <!-- <a href="https://github.com/">
    <img src="images/logo.png" alt="Logo" width="80" height="80">
  </a> -->

  <h3 align="center">Peak</h3>

  <p align="center">
    Peak is a mountaineering, hiking and climbing community site to inspire, share information about landmarks, climbing spots and gear reviews. 
    <br />
    <br />
    <a href="https://the-peek.vercel.app/" target="_blank">View Demo</a>
    ·
    <a href="https://github.com/chas-academy/u11-fullstack-js-EnzoBomark/issues" target="_blank">Report Bug</a>
    ·
    <a href="https://github.com/chas-academy/u11-fullstack-js-EnzoBomark/issues" target="_blank">Request Feature</a>
  </p>
</p>

<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#requirements-specification-u11">Requirements specification u11</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgements">Acknowledgements</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

The goal of this assignment was to create a website that uses the knowledge and skills required to go from an idea and concept phase to a complete application. The submission should demonstrate understanding of, application, and use of a RESTful API in node with JWT-based authentication with the MongoDB document database.

### Built With

- [NextJS](https://nextjs.org/)
- [NodeJS](https://nodejs.org/en/)
- [ExpressJS](https://expressjs.com/)
- [TypeScipt](https://www.typescriptlang.org/)

<!-- GETTING STARTED -->

## Getting Started

### Prerequisites

- node v16.10.0
- npm
  ```sh
  npm install npm@latest -g
  ```

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/chas-academy/u11-fullstack-js-EnzoBomark
   ```
2. Install NPM packages (In the client and server folders)
   ```sh
   npm install
   ```
3. Rename .env.example to .env and fill out the fields (In the client and server folders)
   ```JS
   API_KEY=ENTER YOUR API
   ...
   ```
4. Run 
   ```sh
   cd server && npm run server, cd client && npm run dev
   ```

<!-- Users -->

## Requirements specification u11

<!-- Add some user stories -->
### Non-functional requirements
* The application must provide a RESTful API
* The application must work in all modern browsers
* The application must be responsive

### Functional requirements
* A user must be able to register an account
* A user must be able to login to their account
* A user must be able to search in the application
* An administrative user must be able to log in to a basic dashboard and create/update/delete users

### Bonus requirements
* An administrative user should be able to set permissions based on user roles
* An administrative user should be able to create/read/update/delete user roles
* An administrative user should be able to send out emails from the admin dashboard

For more examples, please refer to the [Requirements](https://docs.google.com/document/d/18ohx7WOUoyz-AiarJBFRcs___fK5TmOZZSPyCmi_4rs/edit?usp=sharing)

<!-- ROADMAP -->

## Roadmap

See the [open issues](https://github.com/chas-academy/u11-fullstack-js-EnzoBomark/issues) for a list of proposed features (and known issues).

<!-- CONTRIBUTING -->

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<!-- LICENSE -->

## License

Distributed under the MIT License. See `LICENSE` for more information.

<!-- CONTACT -->

## Contact

Email - enzo.bomark@chasacademy.se

LinkedIn: [Enzo Bomark](https://www.linkedin.com/in/enzo-bomark-9046651b1/)

<!-- ACKNOWLEDGEMENTS -->

## Acknowledgements

- [SlateJS](https://github.com/ianstormtaylor/slate)
- [Styled-components](https://styled-components.com/)
- [Redux](https://redux.js.org/)
- [yup](https://github.com/jquense/yup)
- [React Hook Form](https://react-hook-form.com/)
- [Dotenv](https://github.com/motdotla/dotenv)

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[contributors-shield]: https://img.shields.io/github/contributors/chas-academy/u11-fullstack-js-EnzoBomark.svg?style=for-the-badge
[contributors-url]: https://github.com/chas-academy/u11-fullstack-js-EnzoBomark/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/chas-academy/u11-fullstack-js-EnzoBomark.svg?style=for-the-badge
[forks-url]: https://github.com/chas-academy/u11-fullstack-js-EnzoBomark/network/members
[issues-shield]: https://img.shields.io/github/issues/chas-academy/u11-fullstack-js-EnzoBomark.svg?style=for-the-badge
[issues-url]: https://github.com/chas-academy/u11-fullstack-js-EnzoBomark/issues
[license-shield]: https://img.shields.io/github/license/chas-academy/u11-fullstack-js-EnzoBomark.svg?style=for-the-badge
[license-url]: https://github.com/chas-academy/u11-fullstack-js-EnzoBomark/blob/main/LICENSE.txt
