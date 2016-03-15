'use strict';

module.exports = {
  config: { 
    "db": "mongodb://localhost:27017",
    "server": {
        "port": 4210,
        "address": "0.0.0.0"
    },
    "accessControl": {
        "allowOrigin": "*",
        "allowMethods": "GET,POST,PUT,DELETE,HEAD,OPTIONS",
        "allowCredentials": false
    },
    "mongoOptions": {
        "serverOptions": {
        },
        "dbOptions": {
            "w": 1
        }
    },
    "humanReadableOutput": true,
    "urlPrefix": ""
},
withAuth:{
	"db": {
		"port": 27017,
		"host": "localhost"
	},
	"logger": {
		verbose : function(e){ console.log(e) },
		warning : function(e){ console.log(e) }
	},
	"server": {
		"port": 4210,
		"address": "0.0.0.0"
	},
	"accessControl": {
		"allowOrigin": "*",
		"allowMethods": "GET,POST,PUT,DELETE,HEAD,OPTIONS",
        "allowCredentials": false
	},
    "mongoOptions": {
        "serverOptions": {
        },
        "dbOptions": {
            "w": 0
        }
    },
	"humanReadableOutput": true,
	"collectionOutputType": "json",
	"urlPrefix": "",
	"auth": {
		"usersDBConnection": "mongodb://localhost/auth",
		"usersCollection": "users",
		"tokenDBConnection": "mongodb://localhost/auth",
		"tokensCollectionName": "tokens",
		"universalAuthToken": "this-token-grants-universal-access-so-please-change-it",
		"tokenExpirationTimeHours": 8
	}
},
ssl:{
	"db": "mongodb://localhost:27017",
	"server": {
		"port": 4210,
		"address": "0.0.0.0"
	},
	"accessControl": {
		"allowOrigin": "*",
		"allowMethods": "GET,POST,PUT,DELETE,HEAD,OPTIONS",
        "allowCredentials": false
	},
    "mongoOptions": {
        "serverOptions": {
        },
        "dbOptions": {
            "w": 1
        }
    },
	"humanReadableOutput": true,
	"collectionOutputType": "json",
	"urlPrefix": "",
	"ssl": {
		"enabled": true,
		"keyFile": "/path/to/server.key",
		"certificate": "/path/to/server.crt",
		"options": {
			"ciphers": "ECDHE-RSA-AES256-SHA384:AES256-SHA256:!RC4:HIGH:!MD5:!aNULL:!EDH:!AESGCM:!SSLV3:!eNULL"
		}
	}
}


};
