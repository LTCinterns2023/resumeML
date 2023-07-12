
### >> pipeline 

```sh
...req...

/frontend -> sends request to backend { keywords, filters, ...rest}

/backend -> connects to search ipc { node-py ipc}

/search -> returns data to backend { txt/blob/stream etc. }

/backend -> returns to /frontend { text/stream etc. }

...res...
```

- [ ] resume parsing algorithm (not required)
- [x] primitive search algorithm
- [x] python and nodejs ipc
- [x] search.test.js
- [ ] benchmark ipc
- [ ] advanced search algorithm
- [ ] elastic search and nosql db