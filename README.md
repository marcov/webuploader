# Webuploader

A node http server that handles file upload and download through directory listing.

Every time I take a shot on the iPhone and I need to transfer it right away on my laptop it's always a PITA:
- Airdrop does not work on older macbooks
- a.t.m. my Internet bandwidth is crappy so sending an email to self or uploading it to online storage is slow when every pic is > 4MB.
- no availability of samba/ftp clients on iOS that allows upload.

Hence I figured out I could just code a web server that handles file uploads and download and writing it in Node was the obvious choice, despite my newbie knowledge of it.

## Setup
- Clone the code locally.
- `cd webuploader`
- `npm install`

## Usage
Run the application with: `node ./bin/www`. This will start up a web server listening on port 3000 and storing files inside the "uploads" folder. Environment variables:
- PORT=1234 to listen on a custom port.
- UPLOADS_ROOT=my_upload_folder to store/serve files from a custom location.

For local use fire up a browser and go to http://localhost:3000.

## Development
For development, just use nodemon to automatically have the application restarting whenever you save an edit: `DEBUG=webuploader:* nodemon`

