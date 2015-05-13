// ==UserScript==
// @name         Sort Course Links
// @namespace    http://your.homepage/
// @version      0.1
// @description  Sorts course content alphabetically
// @author       Gerome Schutte
// @match        http://www.cs.up.ac.za/courses/*
// @grant        none
// @require http://code.jquery.com/jquery-latest.js
// ==/UserScript==

$(document).ready(
    function() {
        var fileList = $(".fileList");
        for (var k = 0; k < fileList.length; ++k)
        {
            var itemList = fileList.eq(k).find(".file");
            
            for (var l = 0; l < itemList.length-1; ++l)
            {
                for (var m = l+1; m < itemList.length; ++m)
                {
                    if (itemList.eq(l).children("a").first().text() > itemList.eq(m).children("a").first().text())
                    {
                        var tmpContent = itemList.eq(m).html();
                        itemList.eq(m).html(itemList.eq(l).html());
                        itemList.eq(l).html(tmpContent);
                    }
                }
            }
        }
    }
);