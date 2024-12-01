# Where's Waldo

A photo tagging app using React frontend and Rails backend.

## Features

- Magnifying glass zooms in on image within its field of view
- When section clicked, presents options of possible characters
- Pixel position is stored on the database, will verify if selected target is correct
- Timer for players to rank who can find all characters the fastest and display high scores

### Process

- First played with modals within React to get functionality working for pop-up menu
- Originally tried playing with HTML canvas to create a targeting box but was ultimately not ideal
- Played with offset functions to find the pixel position ratio of a given image regardless of the scale
- Created the magnifying glass by setting the floating div background image as a magnification of the underlying background image
- Once it was time to test I ported the sandbox over as a template to create the actual app and removed the old files I no longer needed. I like this method as I don't feel the stress of having the app be "perfect" off the bat
- For testing, realized I needed to decouple the clickable background image from the MousePosition and likely make a hidden debug panel below the image in order to test hovering and click effects
