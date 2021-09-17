# learn-scrypt-contents
The contents repo of interactive learning project @Learn-sCrypt


## Structure
<pre>
#language
├── course-#courseNum
│   ├── index.json                                      (required)
│   ├── lesson-#lessonNum
│       ├── chapter-#chapterNum
│           ├── README.md                               (required) 
│           ├── script-#scriptNum                       (optional)
│               ├── puzzle.#ext                         (optional)
│               ├── solution.#ext                       (required)
</pre>

**Note**: 

* `#courseNum` / `#lessonNum` / `#chapterNum` should all be numbers and continuously increased.

## Example of `index.json`

```json
{
    "title": "Learn sCrypt", // the course's title (required)
    "desc": "This is the first course for learning sCrypt", // the course's description (required)
    "lessons": [
        {
            "title": "Let's start learning sCrypt",  // the lesson's title (required)
            "num": 1,  // the lesson's number (optional)
            "chapters": [
                {
                    "num": 1, // the chapter's number (optional)
                    "title": "What is Bitcoin smart contract?" // the chapter's title (required)
                },
                {
                    "num": 2,
                    "title": "The first sCrypt contract",
                    "scripts": [  // the scripts of this chapter (optional)
                        {
                            "name": "demo.scrypt",  // the name of the script, extension included. (required)
                            "lang": "scrypt",  // the language of the script code (optional)
                            "hints": ["You can name it Demo"] // the hints for the script puzzles (optional)
                        },
                        {
                            "name": "demo.scrypttest.js",
                            "lang": "javascript"
                        }
                    ]
                }
            ]
        }
    ]
}
```

