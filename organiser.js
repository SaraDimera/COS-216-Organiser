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

function getDay(date)
{
    var matcher = /(([1-2]{1}[0-9]{1}|[3]{1}[0-1]{1})|[1-9]{1})/;
    return matcher.exec(date)[0];
}

function getMonth(date)
{
    var matcher = /(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)/;
    return matcher.exec(date)[0];
}

function getYear(date)
{
    return date.substr(date.length-1-10,4);
}

function getTime(date)
{
    return date.substr(date.length-1-4,5);
}

function getHours(date)
{
    return date.substr(date.length-1-4,2);
}

function getMinutes(date)
{
    return date.substr(date.length-1-2,2);
}

function date2IsMoreRecent(line1, line2) {
    var dateMatcher = /(([1-2]{1}[0-9]{1}|[3]{1}[0-1]{1})|[1-9]{1})\s{1}(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s{1}20[0-9]{2},\s{1}[0-9]{2}:[0-9]{2}/g;
    var date1;
    var date2;
    var myArray;
    
    //initialize dates
    while ((myArray = dateMatcher.exec(line1)) !== null)
        date1 = myArray[0];
    
    dateMatcher.lastIndex = 0;
    
    while ((myArray = dateMatcher.exec(line2)) !== null)
        date2 = myArray[0];

    date1 = getMonth(date1) + " " + getDay(date1) + ", " + getYear(date1) + " " + getTime(date1) + ":00";
    date2 = getMonth(date2) + " " + getDay(date2) + ", " + getYear(date2) + " " + getTime(date2) + ":00";
    
    var dObj1 = new Date(date1);
    var dObj2 = new Date(date2);
    
    return (dObj2 > dObj1);
}

function sortModuleContent()
{
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

function sortAnnouncements()
{
    var announcebox = $('.box.blue.padded.announcement');
    var descriptions = announcebox.find('div.description');

    for (var k = 0; k < descriptions.length-1; ++k)
    {
        for (var l = k+1; l < descriptions.length; ++l)
        {
            if (date2IsMoreRecent(descriptions.eq(k).text(), descriptions.eq(l).text()))
            {
                //swop posts
                var tmp;

                tmp = descriptions.eq(k).html();
                descriptions.eq(k).html(descriptions.eq(l).html());
                descriptions.eq(l).html(tmp);

                tmp = descriptions.eq(k).next().html();
                descriptions.eq(k).next().html(descriptions.eq(l).next().html());
                descriptions.eq(l).next().html(tmp);

                tmp = descriptions.eq(k).prev().html();
                descriptions.eq(k).prev().html(descriptions.eq(l).prev().html());
                descriptions.eq(l).prev().html(tmp);
            }
        }
    }
}


$(document).ready(
    function() {
        sortModuleContent();
        sortAnnouncements();
    }
);