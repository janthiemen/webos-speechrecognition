webos-speechrecogntion
======================

Speechrecognition app for webos using pocketsphinx (http://cmusphinx.sourceforge.net/), based on the MediaCapture and the txjs-fortunecookie sample from HP.
I build pocketsphinx and sphinxbase using the webOS internals development kit (WIDK).

Build instructions
==================
1. If you haven't already, install the webOS internals WIDK (http://www.webos-internals.org/wiki/WebOS_Internals_PDK).
2. Download sphinxbase and pocketsphinx (http://cmusphinx.sourceforge.net/wiki/download/)
3. Untar both of them and apply webos-sphinxbase-0.8-patch.txt and webos-pocketsphinx-0.8-patch.txt
4. start sb2 and go to your sphinxbase dir
5. ```export echo=echo```
6. ```./configure```
7. ```make```
8. ```make install```
9. Do step 4 - 8 for pocketsphinx
10. Your executables are now in /srv/preware/cross-compile/staging/armv7/
