$( document ).ready(function() {
	console.log( "ready!" );
	setTimeout( function() {
		window.scrollTo(0, 1);
		// ADD PHP DYNAMIC CODE FOR DEMO URL LAUNCH
	}, 0);
	setTimeout(function(){ showUpTop(); }, 1500);
});

function showUpTop() {
	console.log("showUpTop()");
	$('upTopOpener').css("top", '-80px');
	$('upTop').css("top", '0px');
	$('pushDown').css('marginTop', '30px');
}

function hideUpTop() {
	console.log("hideUpTop()");
	$('upTop').css(top, '-34px');
	$('pushDown').css(top, '0px');
	$('upTopOpener').css(top, '-8px');
}

function sendSave() {
	console.log("sendSave()");
	hideId('sendSave');
	hideId('saveemail');
	hideId('saveEmailTitle');
	updateNote('<center>Processing...</center>');
	var postUrl = "ajax/save.php";
	var queryStr = fetchQuery('saveemail');
	queryStr = queryStr + "&" + bannerQuery();
	ajaxPost(postUrl,queryStr);
}

function fetchQuery(qName) {
    var qValue = $(qName).value;
	var qStr = qName + "=" + qValue;
	return qStr;
}


function ajaxPost(postUrl,postQuery) {
    var xmlHttpReq = false;
    if (window.XMLHttpRequest) {    
        xmlHttpReq = new XMLHttpRequest();
    }
    else if (window.ActiveXObject) {     
        xmlHttpReq = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlHttpReq.open('POST', postUrl, true);
    xmlHttpReq.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xmlHttpReq.onreadystatechange = function() {
        if (xmlHttpReq.readyState == 4) {
            updateNote(xmlHttpReq.responseText);
			$('saveCancel').innerHTML = "Done";
        }
		else if (xmlHttpReq.readyState == 1) {
			changeNotes("<center>Connecting...</center>");
		}
		else if (xmlHttpReq.readyState == 3) {
			changeNotes("<center>Sending...</center>");
		}
    }
    xmlHttpReq.send(postQuery);
}

function updateNote(str) {
    $("saveNote").innerHTML = str;
}

function fullPreview() {
	updateUpTop();
	// updateColor();
	updatePreview();
	hideTool();
}
function updateColor() {
	var bgColor = $('#colorBanner').value;
	var textColor = $('#colorText').value;
	$('upTop').style.backgroundColor = escapeHtml(bgColor);
	$('upTopText').style.color = escapeHtml(textColor);
}

// UPDATE BANNER TEXT
function updateUpTop() {
	updateBannerMessageText();
	updateBannerButtonText();
}
function updateBannerMessageText() {
	var messageText = $('#messageTextInput').val();
	if (messageText == "") {
		messageText = "Look at this.";
		$('#upTopText').html(messageText);
		$('#messageTextInput').val(messageText);
	}
	else {
		$('#upTopText').html(messageText);
	}
}
function updateBannerButtonText() {
	var messageText = $('#buttonTextInput').val();
	if (messageText == "") {
		messageText = "Click here!";
		$('#button').html(messageText);
		$('#buttonTextInput').val(messageText);
	}
	else {
		$('#button').html(messageText);
	}
}

function showTool() {
	console.log("showTool()");
	$('barTool').css('top', '20px');	
	$('showTool').css('bottom', '-200%');
}
function hideTool() {
	$('barTool').css('top', '300%');
	$('showTool').css('bottom', '-60px');
}

function updatePreview() {
	$('preFrame').css('display', 'block');
	var urlShow = $('#previewURL').val();
	if (urlShow == "") {
		urlShow = "http://www.amazon.com/?_encoding=UTF8&camp=1789&creative=390957&linkCode=ur2&tag=prosapps-20";
		$('preFrame').src  = urlShow;
		$('previewURL').value = "amazon.com";
		setTimeout(function(){
			showTool();
		}, 4000);
	}
	else {
		urlShow = "http://" + stripHttp(urlShow);
		$('preFrame').src  = urlShow;
		setTimeout(function(){
			showTool();
		}, 5000);
	}
}

function stripHttp(url) {
	if (url == "") {
		var newUrl = "lookuptop.com";
	}
	else {
		var newUrl = url.replace("http://","").replace("https://","");
		newUrl = encodeURIComponent(newUrl);
	}
	return newUrl;
}

function escapeHtml(text) {
  return text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;")
	  .replace("[b]", "<b>")
	  .replace("[i]", "<i>")
	  .replace("[/b]", "</b>")
	  .replace("[/i]", "</i>");
}

// SHARE BANNER

function shareBanner() {
	hideId('toolSettings');
	hideId('settingActions');
	showId('toolShare');
	showId('shareActions');
}

// SAVE BANNER

function saveBanner() {
	hideId('toolSettings');
	hideId('settingActions');
	showId('toolSave');
	showId('saveActions');
}

function makeDemoURL() {
	query = bannerQuery();
	var demoURL = "http://lookuptop.com/?demo=yes&" + query;
	return demoURL; 
}

function bannerQuery() {
	var messagetxt = $('#messageTextInput').val();
	var buttontxt = $('#buttonTextInput').val();
	var bgcolor = $('#colorBanner').val();
	var txtcolor =$('#colorText').val();
	var buttonurl = $('#linkURL').val();
	var pageurl = $('#previewURL').val();
	var bannerQuery = "messagetxt=" + messagetxt + "&buttontxt=" + buttontxt + "&bgcolor=" + bgcolor + "&txtcolor=" + txtcolor + "&buttonurl=" + buttonurl + "&pageurl=" + pageurl;
	return bannerQuery; 
}


// CANCEL ACTION
function cancelAction() {
	hideId('toolShare');
	hideId('shareActions');
	hideId('toolSave');
	hideId('saveActions');
	showId('toolSettings');
	showId('settingActions');
}


// HIDE
function hideId(targetId) {
	$(targetId).css('display', 'none');
}
function hideClass(targetClass) {
	$(targetClass).css('display', 'none');
}

// SHOW
function showId(targetId) {
	$(targetId).css('display', 'inline-block');
}
function showClass(targetClass) {
	$(targetClass).css('display', 'inline-block');
}


