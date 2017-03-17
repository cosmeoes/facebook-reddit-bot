//seting up fb api wrapper
var FB = require('fb');
//expira 13 mayo 2017
FB.setAccessToken('EAAbJ6X4F5c8BAAZCZBDZCA15R4WXMLHmAsEDwOtFoZCFRCcuvffDO9tZBqQsQxv3oeK7lwhaMTjWjvloLIQ30zpTi6DMsiZCQAQsQZAZAehMqkiGki6E5JmLZCPk8U1oJrp9xeKqpXmTxNzHXHPsMVrXW7PXpPOZBT6qFYsr3BfbiRiAZDZD');
//sleep thread variable
var sleep = require('system-sleep');

//seting oup reddit api wrapper
'use strict';
const snoowrap = require('snoowrap');

const r = new snoowrap({
	userAgent: 'redditposter',
  	clientId: 'Cqx8SkZO8ppXIQ',
  	clientSecret: 'Zgf9SGtSCJmGvLLz4OYqV37KPcQ',
  	username: 'Pm_happy_thoughts',
  	password: 'omarsito1'
});

//photoshopbattes not jet implemented
/*r.getSubreddit('photoshopbattles').getHot().then(function(submitions){
	var count;
	for(var i =0;submitions.length;i++){
		
		if(!submitions[i].stickied){
			count=i;
			break;
		}
		console.log('stickied post skiped');
	}
	console.log('Photoshopbattles' +'\n' +submitions[count].title+' ' +submitions[count].url);
	submitions[count].expandReplies([{limit:3}]).then(function(sub){
		var links= [];
		links.push(submitions[count].url);
		for(var i=0;i<3;i++){
			var comment= sub.comments[1].body;
			
			if(comment.indexOf(']')> -1){
				var link= comment.substring(comment.indexOf("](")+2, comment.indexOf(")",comment.indexOf("](")+1));
				links.push(link);
			}else{
				links.push(comment);
	
			}
		}
		post(submitions.title,links);

	})
});*/
var array=["videos","todayilearned","funny","gifs","LifeProTips","aww",
	   "pics","movies","AdviceAnimals","AnimalsBeingJerks","facepalm",
           "thisismylifenow","mildlyinteresting","comics","interestingasfuck",
	   "Unexpected","instant_regret","ChildrenFallingOver","BikiniBottomTwitter",
	   "PerfectTiming"];
var cont=0;
for(var i=0;i<array.length;i++){
   	postFromSubRedditWithUrl(array[i]);	
   	sleep(1000*60*60*4);
}
//setInterval(postFromSubRedditWithUrl,1000*60*60*4,array[cont]);
setInterval(postFromSubRedditWithOutUrl, 1000*60*60*24,"Showerthoughts");

/*
setInterval(postFromSubRedditWithUrl, 1000*60*60*9,"videos");
setInterval(postFromSubRedditWithUrl, 1000*60*60*12,"todayilearned");
setInterval(postFromSubRedditWithUrl, 1000*60*60*7,"funny");
setInterval(postFromSubRedditWithUrl, 1000*60*60*24,"gifs");
setInterval(postFromSubRedditWithUrl, 1000*60*60*15,"LifeProTips");
setInterval(postFromSubRedditWithOutUrl, 1000*60*60*6,"Showerthoughts");
setInterval(postFromSubRedditWithUrl, 1000*60*60*9,"aww");
setInterval(postFromSubRedditWithUrl, 1000*60*60*6,"pics");
setInterval(postFromSubRedditWithUrl, 1000*60*60*12,"movies");
setInterval(postFromSubRedditWithUrl, 1000*60*60*6,"AdviceAnimals");
setInterval(postFromSubRedditWithUrl, 1000*60*60*10,"AnimalsBeingJerks");
setInterval(postFromSubRedditWithUrl, 1000*60*60*12,"facepalm");
setInterval(postFromSubRedditWithUrl, 1000*60*60*30,"thisismylifenow");
setInterval(postFromSubRedditWithUrl, 1000*60*60*10,"mildlyinteresting");
setInterval(postFromSubRedditWithUrl, 1000*60*60*13,"comics");
setInterval(postFromSubRedditWithUrl, 1000*60*60*10,"interestingasfuck");
setInterval(postFromSubRedditWithUrl, 1000*60*60*11,"Unexpected");
setInterval(postFromSubRedditWithUrl, 1000*60*60*12,"instant_regret");
setInterval(postFromSubRedditWithUrl, 1000*60*60*10,"ChildrenFallingOver");
setInterval(postFromSubRedditWithUrl, 1000*60*60*11,"BikiniBottomTwitter");
setInterval(postFromSubRedditWithUrl, 1000*60*60*10,"PerfectTiming");
*/




function postFromSubRedditWithUrl(subreddit){
	r.getSubreddit(subreddit).getHot().then(function(submitions){
		var count;
		for(var i =0;submitions.length;i++){
			if(i == submitions.length-1){
				count=i;
				break;
			}
			if(!submitions[i].stickied && !submitions[i].over_18 && submitions[i].url.substr(-4) != "gifv"){
				count=i;
				break;
			}

			console.log('gifv, post stickied or nsfw skiped');
		}


		if(submitions[count].domain.indexOf('i.redd.it')>-1 || submitions[count].domain.indexOf('i.imgur')>-1){
			postimage(submitions[count].title+"\n-by /u/"+submitions[count].author.name+" on /r/"+submitions[count].subreddit.display_name,submitions[count].url);
		}else{
			post(submitions[count].title+"\n-by /u/"+submitions[count].author.name+" on /r/"+submitions[count].subreddit.display_name ,submitions[count].url);
		}
		cont++;
	});
	
}

function postFromSubRedditWithOutUrl(subreddit){
	r.getSubreddit(subreddit).getHot().then(function(submitions){
		var count;
		for(var i =0;i< submitions.length;i++){
			
			if(!submitions[i].stickied && !submitions[i].over_18){
				count=i;
				break;
			}
			console.log('stickied post skiped');
		}
		post(submitions[count].title+"\n-by /u/"+submitions[count].author.name+" on /r/"+submitions[count].subreddit.display_name);
	});
}



function postimage(mensaje, link){
	FB.api('me/photos',{caption:mensaje, url:link,picture:link},function(res){
		if(!res || res.error){
	    	console.log(!res ? 'error occurred' : res.error);
	    	post(mensaje,link);

	    	return;
	  	}
	  	if(!res.id){
	  		console.log("posting as link");
	  		post(mensaje,link);
	  		return;
	  	}

	  	console.log('Image post Id: ' + res.id);

	});

}



//function to post in fb
function post(mensaje, link){
	FB.api('me/feed', 'post', { message: mensaje,link:link}, function (res) {
	  if(!res || res.error){
	    console.log(!res ? 'error occurred' : res.error);
	    return;
	  }
	  console.log('Post Id: ' + res.id);
	});
}


