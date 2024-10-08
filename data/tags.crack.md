"boolean" properties (checkboxes):
----------------------------------

[recrack]               not a genuine crack (*1)
[import]                imported from/to another country (usually us<->eu) (*1)
[firstrelease]          first released crack
[one filed]             one-filed version of originally multi filed game
[one sided]             one-sided version of originally two (or more) sided game
[preview]       -       unfinished preview

*1) if ticked, it should be possible to add the csdb id of the original crack, 
    so a link to it can be shown

[auto naming override]  disable auto-naming, see below.


single selection properties:
----------------------------

[video system]
    unknown
    any
    PAL
    NTSC
    PAL/NTSC fixed      +F
    NTSC/PAL fixed      +F

[release proper]
    ok
    broken                indicates a broken/not (fully) working crack. (unlike
                          "corrupted file", which indicates a broken file)
    100%                  when no previously released crack worked
    101%                  when bugs present in the original where fixed and/or
                          features where added (like 2 players)


multiple selection properties:
------------------------------

[extra features]
    IFFL
    fastloader
    hi saver      +H
    translated    +T

[extra hardware support]
    REU         +R
    IDE64       +I
    MMC64
    GEORAM
    1581
    4 Player    +J      4 Player joystick adapter support
    Easyflash

[included files]
    intro               game intro
    picture             loading picture
    music               music rip

[included documentation]
    docs        +D      includes general documentation
    passwords   +P      includes list of passwords
    walkthrough +W      includes walkthrough
    map                 includes map

integer properties:
-------------------

[trainers]              number of trainers

--------------------------------------------------------------------------------
release naming
--------------------------------------------------------------------------------

generally the release title/name should ONLY contain the actual name of the
respective game, and no other information. ("delta", not "delta +4HI")

now when the release title is displayed, some information from the properties
above are used to generate "scene like" names:

- first comes the game name
- if [preview] is true, then a minus sign is appended
- (space)
- if any trainers or any of the properties associated with a letter above is
  selected, a plus sign follow by all associated letters is added.
  - the number of trainers always comes first ("delta +4H" not "delta +H4")
  - as a special case, if only one trainer and no other properties associated
    with a letter is selected, the "1" after the plus sign is dropped
    ("delta +" not "delta +1")
- (space)
- if [release proper] is "100%" or "101%" the respective string is appended

if [auto naming override] is selected, the above does not apply and the release
title will shown as is. this is to properly represent release names that are
very hard to put into the above scheme ("delta +10HI 95%FIX")

================================================================================
References
================================================================================

from "New Int. Standard" (http://csdb.dk/release/?id=10236)

+    normal unlimited lives trainer
++   from leveltrainer to long trainer menu
+m   more trainer-functions, which can be changed while game is playing

-    for previews and unfinished games
%    instruction file

100% when no other cracked-version works
101% when a game had got new and better features than the original

--------------------------------------------------------------------------------

 ! = Picture
 # = Instructions
 % = Intro
 & = Music
 - = Preview

 H = Highscore saver added

 No real standardization on this one, I've found both "+2H" and "+2+H". Also HI, 
 HIGH and HS have been used instead of only H.
 
 +M was for the in-game trainer like Levelskip etc. but hardly used anymore after 
    1990... Often people couldnt agreed if a levelskip meant +M or +1M which means 
    if they got 4 trainers some people ment it was +4M and other +5M.
 It is uncertain when they stopped using the +M / ++ way to mark trainers.
 
 +F or FX or FIX is also used for NTSC/PAL fixing

 +P or +PW = Password file

--------------------------------------------------------------------------------

+R = REU
+D = docs
+I = ide64
+T = translated
+J = 3/4 player joystick compat
+W = walkthrough
+P = Password file

nostalgia didn't use +M for map, cuz it already means megatrainer from old times

    