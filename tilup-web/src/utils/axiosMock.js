
const content4 = `Collaborative data science
ZEPL brings all types of notebook and people you need together so your team can be data driven.`

const content3 = `We want to implement single page application **which can manage notes**(in other words, memo).

## Spec
And for managing notes, We need notebook which can organize note.
Expected User behavior in organizing note will be like this.
[This is a github link](https://github.com/milooy/noote)`

const content2 = `Returns the prop value for the root node of the wrapper with the provided key. 
prop(key) can only be called on a wrapper of a single node.
NOTE: When called on a shallow wrapper, .prop(key) will return values for props on the root node that the component renders, not the component itself. To return the props for the entire React component, use wrapper.instance().props. See .instance() => ReactComponent`

const content1 = `Don't lose it all in the blur of the stars
seeing is deceiving, dreaming is believing.
It's ok not to be okay, sometimes it's hard to follow your heart
But tears don't mean you're losing, everybody bruising. Just be true to who you are.`


/* Mocking axios HTTP request and returns json response */
let axiosMock = {
  noteBaseData: [
    { id: 4, title: "What is zepl?", date: "2018-01-19", notebookId: 1, notebookTitle: 'TODO' , contents: content4},
    { id: 3, title: "Specification of noote", date: "2018-01-18", notebookId: 1, notebookTitle: 'TODO' , contents: content3},
    { id: 2, title: "Using props value", date: "2018-01-17", notebookId: 2, notebookTitle: 'DONE', contents: content2},
    { id: 1, title: "Fall in love again", date: "2018-01-12", notebookId: 1, notebookTitle: 'TODO', contents: content1}
  ],

  tilListData: [
  {
    _ID: 1,
    user: {
      name: "jayjin",
      avatar: "https://vignette.wikia.nocookie.net/edukayfun/images/0/0b/Soo_soo_ANOYING%21%21%21%21%21%21%21%21%21%21%21%21%21%21.png/revision/latest?cb=20171206164413"
    },
    contents: `# rm -rf
최상위 폴더와 그 하위 파일들을 모두 삭제하는 명령어다. 실수로 하면 망한다.
오픈핵 2018 뱃지 컬렉션에 있다.`,
    hash: [
      "Java",
      "Android",
    ],
    directory: {
      name: "Inbox",
      created: Date.now(),
      updated: Date.now(),
    },
    created: Date.now(),
    updated: Date.now(),
  },
  {
    _ID: 2,
    user: {
      name: "애플",
      avatar: "https://vignette.wikia.nocookie.net/annoyingorange/images/e/e7/Apple_%28Season_5%29.PNG/revision/latest?cb=20140706161012"
    },
    contents: `안녕히계세오 애플이에오
- 이것은
- 리스트
- 랍니다`,
    hash: [
      "Java",
      "Android",
    ],
    directory: {
      name: "Inbox",
      created: Date.now(),
      updated: Date.now(),
    },
    created: Date.now(),
    updated: Date.now(),
  },
],

  notebookBaseData: [
    { id: 1, title: "TODO", desc: "Do it today", noteIdList: [1, 3, 4], color: "#F8BA00" },
    { id: 2, title: "DONE", desc: "I've done it", noteIdList: [2], color: "#F86422" }
  ],

  /* Returns Promise object that contains data */
  _promiseMaker: function(data) {
    return new Promise((resolve, reject) => {
      resolve({ data });
    });
  },

  /* Get array and returns sorted array(by title) */
  _sortByTitle: function(arr) {
    return arr.sort((a, b) => {
      const titleA = a.title.toUpperCase(), titleB = b.title.toUpperCase();
      if(titleA < titleB) {
        return -1;
      } else if(titleA > titleB) {
        return 1;
      }
      return 0;
    });
  },

  /* Get array and returns sorted array(by date) */
  _sortByDate: function(arr) {
    return arr.sort((a, b) => {
      return new Date(b.date) - new Date(a.date);
    });
  },

  /* Get array, query and returns filtered bookList that contains query in title, contents */
  _searchByTitleAndContents: function(arr, query) {
    return arr.filter(obj => {
      const text = obj.title + ' ' + obj.contents;
      return text.toUpperCase().search(query.toUpperCase()) >= 0 ;
    });
  },

  /* Deep copy of javascript object */
  _clone: function(obj) {
    if (obj === null || typeof(obj) !== 'object') {
      return obj;
    }
    let copy = obj.constructor();
    for (let attr in obj) {
      if (obj.hasOwnProperty(attr)) {
        copy[attr] = this._clone(obj[attr]);
      }
    }
    return copy;
  },

  /* Mockup of GET method */
  get: function(url, option, modified) {
    /* NOTE LIST */
    if(url === '/api/note/') {
      /* Clone object because react doesn't render just modified (same) object. */
      return this._promiseMaker(this._clone(this.noteBaseData));
    }



    /* NOTEBOOK LIST */
    else if(url === '/api/feed/') {
      return this._promiseMaker(this.tilListData);
    }




    /* NOTEBOOK LIST */
    else if(url === '/api/notebook/') {
      return this._promiseMaker(this.notebookBaseData);
    }
    /* NOTEBOOK DETAIL DATA */
    else if(/\/api\/notebook\/\d+\//.exec(url)) {
      const id = url.split('/')[3];
      const filteredNotebookBaseData = this.notebookBaseData.find(notebookData => {
        if(notebookData.id === Number(id)) {
          notebookData.noteList = this.noteBaseData.filter(noteData => {
            return notebookData.noteIdList.includes(noteData.id);
          });
          return true;
        } else { return false }
      });
      if(option && option.params) {
        /* Sort notes in notebook by title, date */
        if(option.params.sort === 'title') {
          filteredNotebookBaseData.noteList = this._sortByTitle(filteredNotebookBaseData.noteList);
        } else if(option.params.sort === 'date') {
          filteredNotebookBaseData.noteList = this._sortByDate(filteredNotebookBaseData.noteList);
        }
        /* Filter notebook by query */
        if(option.params.query) {
          filteredNotebookBaseData.noteList = this._searchByTitleAndContents(filteredNotebookBaseData.noteList, option.params.query);
        }
      }
      /* Clone object because react doesn't render just modified (same) object. */
      return this._promiseMaker(this._clone(filteredNotebookBaseData));
    }
    /* NOTE DETAIL DATA */
    else if(/\/api\/note\/\d+\//.exec(url)) {
      const emptyObj = { id: 1, title: "", date: '', notebookId: 1, notebookTitle: 'TODO', contents: ""}
      return this._promiseMaker(this.noteBaseData.filter(d => d.id === Number('')).pop() || emptyObj)
    }
  },

  post: function(url, option) {
    /* SAVE NOTE BY ID */
    if(/\/api\/note\/\d+\//.exec(url)) {
      let id = url.split('/')[3];
      return this._promiseMaker(`Note no.${id} successfully saved`);
    }
  },

  delete: function(url) {
    /* DELETE NOTE BY ID */
    let id = url.split('/')[3];
    this.noteBaseData = this.noteBaseData.filter(d => d.id !== Number(id));
    return this._promiseMaker(`Note no.${id} successfully deleted`);
  },

  put: function(url) {
    /* MOVE NOTE BY ID */
    return this._promiseMaker(`Note was successfully moved`);
  }
}

export default axiosMock;