const cloudinary = require('cloudinary').v2;
 
 cloudinary.config({
   cloud_name: 'djrsrv5sh',
   api_key: '283357323873757',
   api_secret: 'PjuJMsfDXYcFsFj4lGJmO7jrxZU'
 });
 
 module.exports = cloudinary;