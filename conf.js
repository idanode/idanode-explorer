/*jslint node: true */
"use strict";

exports.port = null;
//exports.myUrl = 'wss://mydomain.com/bb';
exports.bServeAsHub = false;
exports.bLight = false;

exports.webPort = 6000;

exports.storage = 'sqlite';


exports.initial_witnesses = [
	'2SATGZDFDXNNJRVZ52O4J6VYTTMO2EZR',
	'33RVJX3WBNZXJOSFCU6KK7O7TVEXLXGR',
	'FYQXBPQWBPXWMJGCHWJ52AK2QMEOICR5',
	'J3XIKRBU4BV2PX2BP4PSGIXDVND2XRIF',
	'K5JWBZBADITKZAZDTHAPCU5FLYVSM752',
	'KM5FZPIP264YRRWRQPXF7F7Y6ETDEW5Y',
	'NBEFJ3LKG2SBSBK7D7GCFREOAFMS7QTQ',
	'RIHZR7AHPVKZWTTDWI6UTKC7L73BJJQW',
	'TIPXQ4CAO7G4C4P2P4PEN2KQK4MY73WD',
	'X27CW2UWU5SGE647LK5SBTIPOOIQ7GJT',
	'X6DWZUEW4IBFR77I46CAKTJVK4DBPOHE',
	'XIM76DRNUNFWPXPI5AGOCYNMA3IOXL7V'
];


/*'wss://idanode.org/tg' */
exports.initial_peers = [
	'wss://victor.idanode.org/tn',
	'wss://eason.idanode.org/tn',
	'wss://lymn.idanode.org/tn',
	'wss://bob.idanode.org/tn',
	'wss://curry.idanode.org/tn',
	'wss://kake.idanode.org/tn'
];

console.log('finished explorer conf');
