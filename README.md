# webuploader

A node http server that handles file upload and download through directory listing.

Every time I take a shot on the iPhone and I need to transfer it right away on my laptop it's always a PITA:
- Airdrop does not work on older macbooks
- a.t.m. my Internet bandwidth is crappy so sending an email to self or uploading it to online storage is slow when every pic is > 4MB.
- no availability of samba/ftp clients on iOS that allows upload.

Hence I figured out I could just code a web server that handles file uploads and download and writing it in Node was the obvious choice, despite my newbie knowledge of it.