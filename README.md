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
