module.exports = {
    getFeed() {
        return this.getDummyFeed();
    },

    getDummyFeed() {
        return {
            til: [{
                _ID: 1,
                uid: 1,
                contents: "# Feed1",
                hash: "AAA",
                directory: "Node",
                forkRef: 1,
                created: "a",
                updated: "b",
            }, {
                _ID: 2,
                uid: 2,
                contents: "# Feed2",
                hash: "BBB",
                directory: "Vue",
                forkRef: 2,
                created: "a",
                updated: "b",
            }, {
                _ID: 3,
                uid: 3,
                contents: "# Feed3",
                hash: "CCC",
                directory: "React Native",
                forkRef: 3,
                created: "a",
                updated: "b",
            }, {
                _ID: 4,
                uid: 4,
                contents: "# Feed4",
                hash: "DDD",
                directory: "React",
                forkRef: 4,
                created: "a",
                updated: "b",
            }, {
                _ID: 5,
                uid: 5,
                contents: "# Feed5",
                hash: "EEE",
                directory: "JS",
                forkRef: 5,
                created: "a",
                updated: "b",
            }, ]
        }
    }
};