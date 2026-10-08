Local iPhone Tweaks
==================
A small Cyanide JavaScript repository containing one tested Home Screen tweak.
This is not a jailbreak, Sileo/APT repository or native tweak-injection framework.

Package: Dock Backdrop 1.0.0
---------------------------
Hide or show the background behind the dock while keeping its icons visible.
Tested with Cyanide 1.7.2 on iPhone 15 Pro Max, iOS 18.5 (22F76).

Repository address
------------------
https://raw.githubusercontent.com/avins0/iphone-tweak-repo/main/repo.json

In Cyanide, add that address under Sources, refresh, open Dock Backdrop and
install it through the queue. Hide Dock Background defaults ON. After applying,
return to the Home Screen to inspect the dock. The log should contain:
[LocalDock 1.0.0] PASS: dock background hidden=true (was false)

Restoration and removal
-----------------------
Switch Hide Dock Background OFF and apply again before removing or replacing
the package. Confirm the background is visible. The log should read:
[LocalDock 1.0.0] PASS: dock background hidden=false (was true)

Cyanide's Remove action clears the script/settings; it does not automatically
restore a view that the script changed. A SpringBoard restart recreates its
views, but respring/reboot recovery has not been tested for this package here.
Only the iOS 18.5 firmware range is enabled in the catalog. Other hardware,
future updates and interactions with other tweaks remain untested.

The tested local file is byte-for-byte identical to the repository payload.
The catalog is hosted. Installation needs on-device validation after correcting
the iOS version bounds to the runtime's three-component format (18.5.0).
See TESTING.txt and SHA256SUMS for the verified scope and payload digest.

Credits and references
----------------------
Cyanide supplies the QuickLoader/RemoteCall runtime:
https://github.com/kolbicz/Cyanide
The dock hierarchy was researched using the publisher's public script:
https://github.com/0xjohnnydev/0xjohnnydev.github.io/blob/main/hide_dock.js
The local implementation adds target/hierarchy checks, a reversible boolean
setting, readback verification and explicit stage/result logging. The bundle
contains this script, catalog and documentation; no native Cyanide components.

Publication
-----------
The repository and script URLs use direct HTTPS on raw.githubusercontent.com.
They do not depend on the default Cyanide source's broken custom-domain redirect.
The repository uses branch main. The catalog appeared on the device; installing
with the corrected version bounds and removal still need validation.
See TESTING.txt for status.
