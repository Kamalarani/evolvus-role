/*
 ** JSON Schema representation of the Role model
 */
 module.exports.schema = {
   "$schema": "http://json-schema.org/draft-06/schema#",
   "title": "roleModel",
   "type": "object",
   "properties": {
     "roleId": {
       "type": "number"
     },
     "roleName": {
       "type": "string",
       "minLength": 1,
       "maxLength": 100
     },
     "description": {
       "type": "string",
       "minLength": 0,
       "maxLength": 255
     }
   },
   "required": ["roleId", "roleName"]
 }
