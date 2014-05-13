/**
 *
 * @author Michael Pearson <michael@cloudspark.com.au>
 * Copyright (c) 2010-2014 CloudSpark pty ltd http://www.cloudspark.com.au
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

function Message(podConfig) {
  this.name = 'message';
  this.description = 'Message',
  this.description_long = 'Returns the extracted meaning from a sentence, based on instance data.',
  this.trigger = false;
  this.singleton = true;
  this.podConfig = podConfig;
}

Message.prototype = {};

Message.prototype.getSchema = function() {
  return {        
    "imports": {
      "properties" : {
        "q" : {
          "type" :  "string",
          "description" : "Query"
        },
        "msg_id" : {
          "type" :  "string",
          "description" : "Message ID (optional)"
        }
      }
    },
    "exports": {
      "properties" : {
        "msg_id" : {
          "type" :  "string",
          "description" : "Message ID"
        },
        "msg_body" : {
          "type" :  "string",
          "description" : "Message Body"
        },
        "outcome" : {
          "type" :  "object",
          "description" : "Outcome"
        },
        "confidence" : {
          "type" : "number",
          "description" : "Confidence Level"
        }
      }
    }
  }
}

Message.prototype.invoke = function(imports, channel, sysImports, contentParts, next) {  
  
  if (imports.q) {    
    var get = this.$resource._httpGet,
      url = 'https://api.wit.ai/message?q=' + encodeURIComponent(imports.q);    
      
    if (imports.msg_id) {
      url += '&msg_id=' + imports.msg_id;
    }

    get(
      url,
      function(err, resp, headers, statusCode) {
        next(err, resp);
      },
      {
        'Authorization' : 'Bearer ' + sysImports.auth.issuer_token.password,
        'Accept' : 'application/vnd.wit.20160202+json'
      }
    );
  }
}
// -----------------------------------------------------------------------------
module.exports = Message;