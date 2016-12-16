'use strict';
const snoowrap = require('snoowrap');

const r = new snoowrap({
	userAgent: 'redditposter',
  	clientId: 'Cqx8SkZO8ppXIQ',
  	clientSecret: 'Zgf9SGtSCJmGvLLz4OYqV37KPcQ',
  	username: 'Pm_happy_thoughts',
  	password: 'omarsito1'
});


//gets the top post form /r/gifs
//r.getSubreddit('gifs').getHot().then(function(submitions){
//	var count;
//	for(var i =0;submitions.length;i++){
//		if(!submitions[i].stickied){
//			count=i;
//			break;
//		}
//		console.log('post stickied skiped');
//	}
//	console.log(submitions[count].title+" "+submitions[count].url);
//});
//
//
////gets the top post from shower thougths
//r.getSubreddit('Showerthoughts').getHot().then(function(submitions){
//	var count;
//	for(var i =0;submitions.length;i++){
//		
//		if(!submitions[i].stickied){
//			count=i;
//			break;
//		}
//		console.log('stickied post skiped');
//	}
//	console.log("posted on /r/Showerthoughts:"+submitions[count].title+"\n-by /u/"+submitions[count].author.name);
//});
//
//
////gets the top post from photoshopbattles
//r.getSubreddit('photoshopbattles').getHot().then(function(submitions){
//	var count;
//	for(var i =0;submitions.length;i++){
//		
//		if(!submitions[i].stickied){
//			count=i;
//			break;
//		}
//		console.log('stickied post skiped');
//	}
//	console.log('Photoshopbattles' +'\n' +submitions[count].title+' ' +submitions[count].url);
//	submitions[count].expandReplies([{limit:3}]).then(function(sub){
//		var links= [];
//		for(var i=0;i<3;i++){
//			var comment= sub.comments[1].body;
//			
//			if(comment.indexOf(']')> -1){
//				var link= comment.substring(comment.indexOf("](")+2, comment.indexOf(")",comment.indexOf("](")+1));
//				links.push(link);
//			}else{
//				links.push(comment);
//	
//			}
//		}
//		console.log(links);
//
//	})
//});
//
////get the post from /r/aww
//r.getSubreddit('aww').getHot().then(function(submitions){
//	var count;
//	for(var i =0;submitions.length;i++){
//		
//		if(!submitions[i].stickied){
//			count=i;
//			break;
//		}
//		console.log('stickied post skiped');
//	}
//	console.log("posted on /r/aww:\n" +submitions[count].title+"\n-by /u/"+submitions[count].author.name+" "+ submitions[count].url);
//});
console.log("url.gifv".substr(-4) === "gifv");
r.getSubreddit('pic').getHot().then(function(submitions){
	var count;
	console.log(submitions[3]);
	for(var i =0;submitions.length;i++){
		
		if(!submitions[i].stickied){
			count=i;
			break;
		}
		console.log('stickied post skiped');
	}
	//console.log(submitions[count]);
});
