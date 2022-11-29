### Reproduction for breaking oplog converter

Meteor's oplog converter breaks currently with certain types of updates, causing data integrity/loss issues. This repro is not necessarily a complete covering of the different update operation patterns that break Meteor's oplog converter, but this is a start.

At least [jagi:astronomy](https://jagi.github.io/meteor-astronomy/) produces the update operations used in this repro when:

1. An item is added to an array, document saved
2. Another item is pushed to beginning of array, document saved


### Instructions

A replica set is required naturally to get the oplog converter working.

1. Run a replica set MongoDB database at localhost:27017, localhost:27018, localhost:27019 or configure your own in package.json's 'start' script.
2. npm run start
3. open browser at localhost:3002
4. Click "Break oplogconverter"
5. Observe this error popup in the console

```
Error in oplog callback TypeError: Cannot read property 'a' of null
    at isArrayOperator (packages/mongo/oplog_v2_converter.js:46:19)
    at packages/mongo/oplog_v2_converter.js:91:11
    at Array.forEach (<anonymous>)
    at convertOplogDiff (packages/mongo/oplog_v2_converter.js:71:24)
    at packages/mongo/oplog_v2_converter.js:109:9
    at Array.forEach (<anonymous>)
    at convertOplogDiff (packages/mongo/oplog_v2_converter.js:71:24)
    at packages/mongo/oplog_v2_converter.js:109:9
    at Array.forEach (<anonymous>)
    at convertOplogDiff (packages/mongo/oplog_v2_converter.js:71:24)
    at oplogV2V1Converter (packages/mongo/oplog_v2_converter.js:122:3)
    at packages/mongo/oplog_observe_driver.js:607:16
    at Object.Meteor._noYieldsAllowed (packages/meteor.js:785:12)
    at OplogObserveDriver._handleOplogEntrySteadyOrFetching (packages/mongo/oplog_observe_driver.js:579:12)
    at packages/mongo/oplog_observe_driver.js:133:20
    at packages/mongo/oplog_observe_driver.js:17:9
    at Object.Meteor._noYieldsAllowed (packages/meteor.js:785:12)
    at packages/mongo/oplog_observe_driver.js:121:16
    at packages/mongo/oplog_tailing.js:108:7
    at runWithEnvironment (packages/meteor.js:1347:24)
    at Object.callback (packages/meteor.js:1360:14)
    at packages/ddp-server/crossbar.js:114:36
```

### Reproduction for failing silently

1. Same steps as above
2. Click "Fail silently"
3. Observe how the DB got updated, but the client doesn't get notified of new data
