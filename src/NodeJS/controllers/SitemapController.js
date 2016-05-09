var fs = require('fs');
var data = JSON.parse(fs.readFileSync(__dirname + "/../db/collection.json", 'utf8'));
var MetaInspector = require('node-metainspector');
var jade = require('jade');
var urls = new Array();
for(var url in data) {
    urls.push({ url : url });
}
var result;
module.exports = {
	get_index : function(req, res) {
		var sitemap = require('sitemap').createSitemap ({
			hostname: req.protocol + '://' + req.get('host'),
		    cacheTime: 600000,
		    urls: urls
		});
		sitemap.toXML( function (err, xml) {
			if (err) {
				return res.status(500).end();
			}
			res.header('Content-Type', 'application/xml');
			res.send( xml );
		});
	},

	get_checker : function(req, res) {
		for (var i = 0; i < urls.length ; i++){
			checkMeta(urls[i].url, req, res);
		}
		res.send(result);
	}
}


function checkMeta(url, req, res) {
   var url = req.protocol + '://' +'marcel:marcel99@'+ req.get('host') + url
   var client = new MetaInspector(url, { timeout: 5000 });
   client.on("fetch", function(){
    var meta = new Array();
    var regH1 = new RegExp('<h1.*>(.*?)</h1>');
    var regH2 = new RegExp('<h2.*>(.*?)</h2>*');
    var h1 = client.document.match(regH1) || 'non présent';
    var h2 = client.document.match(regH2) || 'non présent';
    var h = { h1: h1, h2: h2};
    meta.push({ title: client.title, description:client.description, ogtitle:client.ogTitle, ogdescription:client.ogDescription, ogimage: client.image, keywords: client.keywords, h:h})
    var links = new Array();
    for(var i = 0; i < client.links.prevObject.length; i++) {
        console.log(client.links.prevObject[i].attribs);
        links.push({ url: client.links.prevObject[i].attribs.href, title:client.links.prevObject[i].attribs.alt});
    }
    var images = new Array();
    for(var i = 0; i < client.images.prevObject.length; i++) {
        images.push({ url: client.images.prevObject[i].attribs.src, alt:client.images.prevObject[i].attribs.alt});
    }

   result += jade.renderFile('../../web/www/templates/admin/meta.jade', { "url":url, "meta": meta, "links":links, "images" : images});
  
});
   client.on("error", function(err){
    console.log(err);
});
   client.fetch();
}
