﻿/*! 
A compact JavaScript cross browser microformats parser by Glenn Jones. Based 
on the Mozilla Labs Operator microformats parser created by Michael Kaply 

Copyright (C) 2010 Glenn Jones. All Rights Reserved.
License: http://microformatshiv.com/license/
*/

/* 
This definition has not been test to see if it fully conforms to the wiki specification
*/

function ufhReview(node) {
  if (node) {
      ufShiv.parser.newMicroformat(this, node, "hReview");
  }
}

var ufhReview_definition = {
  mfObject: ufhReview,
  className: "hreview",
  required: ["item"],
  properties: {
    "dtreviewed" : {
      datatype: "dateTime"
    },
    "description" : {
    },
    "item" : {
      datatype: "custom",
      customGetter: function(propnode) {
        var item;
        if (propnode.className.match("(^|\\s)" + "vcard" + "(\\s|$)")) {
            item = ufShiv.parser.getMicroformat(propnode, 'hCard');
        } else if (propnode.className.match("(^|\\s)" + "vevent" + "(\\s|$)")) {
            item = ufShiv.parser.getMicroformat(propnode, 'hCalendar');
        } else {
          item = {};
          var fns = ufShiv.getElementsByClassName(propnode, "fn");
          if (fns.length > 0) {
              item.fn = ufShiv.parser.defaultGetter(fns[0]);
          }
          var urls = ufShiv.getElementsByClassName(propnode, "url");
          if (urls.length > 0) {
              item.url = ufShiv.parser.uriGetter(urls[0]);
          }
          var photos = ufShiv.getElementsByClassName(propnode, "photo");
          if (photos.length > 0) {
              item.photo = ufShiv.parser.uriGetter(photos[0]);
          }
        }
        /* Only return item if it has stuff in it */
        for (var i in item) {
          return item;
        }
        return;
      }
    },
    "rating" : {
      datatype: "float"
    },
    "best" : {
      datatype: "float"
    },
    "worst" : {
      datatype: "float"
    },
    "reviewer" : {
      datatype: "microformat",
      microformat: "hCard"
    },
    "summary" : {
    },
    "type" : {
      types: ["product", "business", "event", "person", "place", "website", "url"]
    },
    "tag" : {
      plural: true,
      rel: true,
      datatype: "microformat",
      microformat: "tag"
    },
    "version" : {
    }
  }
};

ufShiv.add("hReview", ufhReview_definition);

