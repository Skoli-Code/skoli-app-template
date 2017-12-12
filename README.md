# Skoli app template
Simple application template based on [Gatsby][gatsby].

## Features
- Markdown based content (see `content/`)
- Custom components in Markdown thanks to [remark-jsx][rjsx] 
- Static SEO & social sharing meta data generation based on frontmatter (check a `.md` file in `content/`)
- [Note & Reference system](#notes-and-references)

## Install dependencies
```sh
$ npm install
```
## Run the application in local
```sh
$ npm run develop
# OR 
$ yarn develop
# OR (if gatsby is globally installed)
$ gatsby develop
```
## Add a page
2 kind of pages are possible:
- markdown-based pages
- component-based pages

### Markdown-based pages
To create a markdown-based page, just create a markdown file (`.md`) under the `content` folder.
Then you'll be able to add specific information about this page into the page's header like bellow.
Those information will be used as meta-tags for SEO & Social Media (Facebook and Twitter cards).
```md
---
- title: "Custom Page"
- description: "A simple description"
- keywords: "a,list,of,keywords"
- image: images/custom-page.png
---
```

### Component-based pages
This kind of page can be used if you need to have a specific behavior for your page. To add one 
component-based page in your app you need to create a `.js` file under `src/pages/`. 

### Add a link of your page to the navigation bar & menu
To add your newly created page to the navigation bar you must configure a new link in `src/constants`.
You'll see there a `NAVBAR_LINKS` constant that's designed to hold the navigation bar links configuration.
Please note that the links are based on the page's filename. So if you want a different link, just
rename the file and update the link in `NAVBAR_LINKS`.
```js
import CustomIcon from 'icons/custom'
const NAVBAR_LINKS = [
  // ...
  {
    to: '/custom-page',
    text: 'My Custom Page',
    // optional icon
    icon: CustomIcon
  },
]
```

## Components inside markdown
In order to make custom components inside markdown 2 things must be done:
- add the component inside `remark-custom-elements` plugin configuration (`gatsby-config.js`)
- import & add the component inside the `componentMap` (`src/templates/markdown-page.js``)

## Notes and references 
Notes and references are two different things. Notes are designed to contextualize a term, 
to explain it in more depth without weightening the text. References are elements took from
elsewhere like quotes from books or other articles for instance. 

They have different behavior, when you click on a reference it just scroll to the clicked 
ref. When you click on a note it opens a modal/panel to show the complete note content.

### Notes
To add a note in markdown, just use the Note component in markdown like follow:
```md
This is an example <Note content="of a note">This is the textual content of the note, it won't be shown in the article</Note>
```

### References
Like with note, you must use the `Ref` component but with a different syntax:
```md
This is an example of <Ref>a reference</Ref>
```

[gatsby]: http://gatsbyjs.org/
[rjsx]: https://github.com/fazouane-marouane/remark-jsx/
