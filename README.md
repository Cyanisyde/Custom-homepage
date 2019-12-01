# Custom homepage

This project was visually inspired by http://weboas.is/ but has been rewritten from the ground in React to be more customizable by the user.
A demo of the website can be seen [here].
## Features
  - Define your own number of categories and their content.
  - Customize the colors to your desire.
  - Add your own websites to the built in search tool.
  - Last.FM integration.
  - Set the welcome text to your super 1337 internet name.
  - A very cool background which is totally not inspired by The Matrix.

## Setup guide (~10 min)
  - Follow [this](https://github.com/gitname/react-gh-pages) guide to create a barebones website.
  - Install the `moment` package by typing `npm install moment` in the root directory of your react-app.
  - Copy over the `src` and `public` folders from this repository to your new react-app.
  - Make the appropriate changes to you want to customize your experience in ./src/website.json
  - Build and publish the app by executing the command "npm run deploy" in the root directory of the project. 
  - You're done!

## Customization
This homepage offers a lot of quick and easy customization. Take note that all customization in this part takes place in the file `./src/website.json`
  - Add another "category circle"
    1. Create a new object inside of `categories` in the customization file.
    2. The letters that appear on the category circle will be the first two letters of your new objects name.
 - Populate a "category circle"
    1. Locate the object of the category circle that you want to populate with links.
    2. Create a key-value pair cosisting of what you want the link to be shown as and the actual link
    3. Take note that the key should be the name and the value should be the link
 - Add another website to the search tool 
    1. Create a key-value pair in `categories.searchValues.searchTags` consisting of the search tag and the search link
        - Take note that the search tag will need to be the key and the search link will need to be the pair
    2. Create a key-value pair in the `categories.searchValues.searchInfo` object consisting of the searchtag you chose above and the placeholder text you want displayed on the searchbar.
        - Take note that the search tag will need to be the key and the placeholder text will need to be the value.
- Adding your own name to the top of the website
    1. In the object `welcomeText` change the value of the existing key-value pair to your desired name.
- Activating Last.FM currently scrobbling text
    - In the `lastfm` object, give the key-value pairs your information.
        1. `name` is your username.
        2. `apikey` is your own generated apikey for this cause. How to generate one can be found on [this] page.
        3. `activate` is to be set to `true` if you want this functionality.
- Changing the colors of elements on the website
    - In `categories.colorSettings` set the value of the keys to your desdire.
        - The name at the top
            - `nameColorFlash` is what color the name will flash after finishing drawing the outline.
            - `nameColorOutline` is the color of the outline of the name.
            - `nameColorFill` is the color of the name.
        - Category circles
            - `categoryCircleBackground` is the background color of each category circle.
            - `categoryCircleText` is the color of the text in the circle.
        - Background matrix rain
            - `matrixRain` is the color of the matrix rain.

### Special Thanks
   - [@p-kostic] (Introduction to the language, various bug fixing, and constructing the logic for importing an easily changeable .json file to add categories and links to the website)






   [Github pages]: <https://github.com/gitname/react-gh-pages>
   [here]: <https://cyanisyde.github.io/custom-homepage/>
   [this]: <https://www.last.fm/api/authentication>
   [@p-kostic]: <https://github.com/p-kostic>