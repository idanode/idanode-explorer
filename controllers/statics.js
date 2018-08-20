/*jslint node: true */
'use strict';

var db = require('idanode-common/db.js');
var storage = require('idanode-common/storage.js');
var moment = require('moment');
var async = require('async');
var staticdata = {};

var activeAddress;
var allAddress;
var level;
var allUnits;
var allUserUnits;

// recent 24 hours
var totalUnits;
var totalUserUnits;
var totalFees;
var date;
//
function updateStatistics(){


	// user transaction
	db.query("SELECT \n\
        COUNT( DISTINCT units.unit ) as count \n\
	FROM \n\
        units \n\
        LEFT JOIN unit_authors ON units.unit = unit_authors.unit \n\
	WHERE \n\
        unit_authors.address NOT IN ( '2SATGZDFDXNNJRVZ52O4J6VYTTMO2EZR', '33RVJX3WBNZXJOSFCU6KK7O7TVEXLXGR', 'FYQXBPQWBPXWMJGCHWJ52AK2QMEOICR5', 'J3XIKRBU4BV2PX2BP4PSGIXDVND2XRIF', 'K5JWBZBADITKZAZDTHAPCU5FLYVSM752', 'KM5FZPIP264YRRWRQPXF7F7Y6ETDEW5Y', 'NBEFJ3LKG2SBSBK7D7GCFREOAFMS7QTQ', 'RIHZR7AHPVKZWTTDWI6UTKC7L73BJJQW', 'TIPXQ4CAO7G4C4P2P4PEN2KQK4MY73WD', 'X27CW2UWU5SGE647LK5SBTIPOOIQ7GJT', 'X6DWZUEW4IBFR77I46CAKTJVK4DBPOHE', 'XIM76DRNUNFWPXPI5AGOCYNMA3IOXL7V' ) AND units.creation_date>"+db.addTime("-24 HOUR"), function(rows) {
		totalUserUnits = rows[0].count;
	});

	// all transaction
	db.query("SELECT \n\
        COUNT( DISTINCT units.unit ) as count  \n\
	FROM \n\
        units \n\
        LEFT JOIN unit_authors ON units.unit = unit_authors.unit \n\
	WHERE \n\
        units.creation_date>"+db.addTime("-24 HOUR"), function(rows) {
		totalUnits = rows[0].count;
	});

	// max_level
	db.query("SELECT MAX(level)  as level from units", function(rows) {
		level = rows[0].level;
	});

	//all address
	db.query("SELECT COUNT( DISTINCT address ) as count FROM outputs", function(rows) {
		allAddress = rows[0].count;
	});

	// active address
	db.query("SELECT COUNT( DISTINCT address ) as count FROM outputs WHERE is_spent =0", function(rows) {
		//console.log(rows);
		activeAddress = rows[0].count;

	});

	// recent  fees
	db.query("SELECT SUM(headers_commission+payload_commission) as fee from units LEFT JOIN unit_authors ON units.unit = unit_authors.unit WHERE \n\
	unit_authors.address NOT IN ( '2SATGZDFDXNNJRVZ52O4J6VYTTMO2EZR', '33RVJX3WBNZXJOSFCU6KK7O7TVEXLXGR', 'FYQXBPQWBPXWMJGCHWJ52AK2QMEOICR5', 'J3XIKRBU4BV2PX2BP4PSGIXDVND2XRIF', 'K5JWBZBADITKZAZDTHAPCU5FLYVSM752', 'KM5FZPIP264YRRWRQPXF7F7Y6ETDEW5Y', 'NBEFJ3LKG2SBSBK7D7GCFREOAFMS7QTQ', 'RIHZR7AHPVKZWTTDWI6UTKC7L73BJJQW', 'TIPXQ4CAO7G4C4P2P4PEN2KQK4MY73WD', 'X27CW2UWU5SGE647LK5SBTIPOOIQ7GJT', 'X6DWZUEW4IBFR77I46CAKTJVK4DBPOHE', 'XIM76DRNUNFWPXPI5AGOCYNMA3IOXL7V' ) \n\
		AND units.creation_date>"+db.addTime("-24 HOUR"), function(rows) {
		// console.log(rows);
		totalFees = rows[0].fee;
	});


	// all units
	db.query("SELECT COUNT( * ) as count FROM units", function(rows) {
		//console.log(rows);
		allUnits = rows[0].count;

	});

	// all user units
	db.query("SELECT COUNT( * ) as count FROM units LEFT JOIN unit_authors ON units.unit = unit_authors.unit  WHERE \n\
        unit_authors.address NOT IN ( '2SATGZDFDXNNJRVZ52O4J6VYTTMO2EZR', '33RVJX3WBNZXJOSFCU6KK7O7TVEXLXGR', 'FYQXBPQWBPXWMJGCHWJ52AK2QMEOICR5', 'J3XIKRBU4BV2PX2BP4PSGIXDVND2XRIF', 'K5JWBZBADITKZAZDTHAPCU5FLYVSM752', 'KM5FZPIP264YRRWRQPXF7F7Y6ETDEW5Y', 'NBEFJ3LKG2SBSBK7D7GCFREOAFMS7QTQ', 'RIHZR7AHPVKZWTTDWI6UTKC7L73BJJQW', 'TIPXQ4CAO7G4C4P2P4PEN2KQK4MY73WD', 'X27CW2UWU5SGE647LK5SBTIPOOIQ7GJT', 'X6DWZUEW4IBFR77I46CAKTJVK4DBPOHE', 'XIM76DRNUNFWPXPI5AGOCYNMA3IOXL7V' ) ", function(rows) {
		//console.log(rows);
		allUserUnits = rows[0].count;

	});



	date = moment(Date.now()).format();
}




function getStatistics(){
	var data={};
	data['activeAddress'] = activeAddress;
	data['allAddress'] = allAddress;
	data['level'] = level;
	data['totalUnits'] = totalUnits;
	data['totalUserUnits'] = totalUserUnits;
	data['totalFees'] = totalFees;
	data['date'] = date;
	data['allUnits'] = allUnits;
	data['totalUsersUnits'] = allUserUnits;

	

	return data;
}


exports.getStatistics = getStatistics;
setTimeout(updateStatistics,1000*5);
setInterval(updateStatistics,10*60*1000);



