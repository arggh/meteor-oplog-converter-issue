import { Meteor } from "meteor/meteor";
import { docs } from "../shared/collection";
import { Tracker } from 'meteor/tracker';

let doc;

// use static, known _id
const _id = 'SXxQsXPhLwfYw4buD';

// element handle to display doc contents
const docEl = document.getElementById("doc");

// subscribe for publication
Meteor.subscribe("doc", _id);


// update doc to view if it changes
Tracker.autorun(() => {
  doc = docs.findOne({ _id });

  if (docEl) {
    docEl.innerHTML = doc?.items.length + '\n\n' + JSON.stringify(doc, null, 1);
  }
});

async function breakOplogConverter(event) {
  Meteor.call('breakOplogConverter');
}

async function silentlyFail(event) {
  Meteor.call('silentlyFail');
}

document.querySelector('button#break')?.addEventListener('click', breakOplogConverter);
document.querySelector('button#silent-fail')?.addEventListener('click', silentlyFail);