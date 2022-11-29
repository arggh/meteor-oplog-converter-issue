import { Meteor } from "meteor/meteor";
import { docs } from "../shared/collection";
import { doc } from "./fixture";

Meteor.publish("doc", function (_id) {
  return docs.find({ _id });
});

Meteor.methods({
  /**
   * This simulates the following flow using jagi:astronomy
   * 
   * 1. Add item to array, save
   * 2. Add another item to the beginning of array, save
   */
  breakOplogConverter() {
    docs.update(
      { _id: doc._id },
      {
        $push: {
          items: {
            id: "FJwSQHqwpenCN6RQH",
            name: "Bill Clinton",

            title: {
              en: "Just Bill",
              sv: "",
            },
            bio: {
              en: "Former President",
              sv: "",
            },
            avatar: null,
            languages: [
              {
                key: "sv",
                englishName: "Swedish",
                localName: "Sverige",
              },
            ],

          },
        },
      }
    );

    docs.update(
      {
        _id: doc._id,
      },
      {
        $set: {
          "items.0.id": "m57DsX8g8L66bM5JX",
          "items.0.name": "John Doe",
          "items.0.bio.en": "Just John",
          "items.0.languages.0.key": "en",
          "items.0.languages.0.englishName": "English",
          "items.0.languages.0.localName": "English",
          "items.1": {
            id: "FJwSQHqwpenCN6RQH",
            name: "Bill Clinton",
            title: {
              en: "Just Bill",
              sv: "",
            },
            bio: {
              en: "Former President",
              sv: "",
            },
            avatar: null,
            languages: [
              {
                key: "sv",
                englishName: "Swedish",
                localName: "Sverige",
              },
            ],
          },
        },
      }
    );
  },

  silentlyFail() {
    docs.update(
      { _id: doc._id },
      {
        $push: {
          items: {
            id: "FJwSQHqwpenCN6RQH",
            name: "Bill Clinton",
          },
        },
      }
    );

    docs.update(
      {
        _id: doc._id,
      },
      {
        $set: {
          "items.0.id": "m57DsX8g8L66bM5JX",
          "items.0.name": "John Doe",
          "items.1": {
            id: "FJwSQHqwpenCN6RQH",
            name: "Bill Clinton",
          },
        },
      }
    );
  }
});


Meteor.startup(() => {
  // clear db, add fixture
  docs.remove({});
  docs.insert(doc);
});
