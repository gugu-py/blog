---
title: Migrating Nier Autonomia Saves
date: 2024-12-01 12:40:26
tags:
categories: foreigners
---

I at first played the YorHa Edition from Rutracker. After finishing A, B, C and D endings, I felt like the game is worth buying (even though it is very expensive to be honest).

To migrate the save, direct copy of the save data does not work. In addition to copy, you need this tool I found on Github -> https://github.com/jimmyazrael/NierAutoModSave

The following is the README of the project:

# NieR:AutoModSave v0.1 by jimmyazrael

This tool will guide and help you to import NieR: Automata's game saves shared by others.

## Warning

If you're using Steam Cloud Sync, switching saves will cause conflict between the cloud saves and the local files, and if choose to update cloud saves, it will raplace the original cloud saves.

You are advised to disable the Cloud Sync feature for this game to avoid trouble when using this tool.

## Requirements

1. Preferably you should have received the whole save folder, or at least you should have the following files:
    - `GameData.dat`
    - One or more than one of the `SlotData` files
    - and probably `SystemData.dat`. Although the use of `SystemData.dat` is still unknown.
2. Please make sure you back up your own save folder, as using other's save file will make yours unreadable. If you would like to use your save files again, simply treat your own backup save folder as the one shared by someone else and repeat the very same steps stated below.

## Steps

0. (***!IMPORTANT***) PUT YOUR STEAM TO OFFLINE MODE.
1. Back up your **WHOLE** save folder, which is likely located at `Documents\My Games\NieR_Automata`.
2. Remove everything except `Graphic.ini` in that folder.
3. Put the files (except `Graphic.ini`) you received from another player in the folder.

If you prefer exe:
    4. Put `NierAutoModSave.exe` in the same folder, run it, follow it, done.

If you prefer a Python script and you have Python installed:
    4. Put `NierAutoModSave.py` in the same folder and run it, follow it, done.

