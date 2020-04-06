$(document).ready(function() {//테이블 내 모든 버튼 시작과동시에 작동불가
		$("#tableall input[type=button]").attr("disabled", true);
	});


$(document).ready(function() {
$("#gametime").on("keyup", function() {//gametime 숫자만 입력
			$("#gametime").val($("#gametime").val().replace(/[^0-9]/g, ""));
		});

		$('#gametime').blur(function() {//gametime 60분,60초 맞는 숫자형식
			var gametime = document.getElementById("gametime").value;
			var m1 = Math.floor(gametime / 1000);
			var m2 = Math.floor(gametime / 100) - m1 * 10;
			var s1 = Math.floor(gametime / 10) - (m1 * 100 + m2 * 10);
			var s2 = gametime - (m1 * 1000 + m2 * 100 + s1 * 10);
			if ((m1 * 10 + m2 > 60) || (s1 * 10 + s2 > 60)) {
				alert((m1 * 10 + m2) + "분" + (s1 * 10 + s2) + "초로 잘못 입력됐습니다");
				document.getElementById("gametime").value = null;
			}

		});
});
///////////////////////////////////////////////////////


var count = 0;
var logcount = 0;
function logremove() {
	if ($('#log option:selected').val()) {
		var str = ($('#log option:selected').text()).split(' ');
		if (str[1].substr(0, 2) == "항목")
			alert("선택된 로그가 없습니다.");
		else {
			if (($('#log option:selected').val()) == 1) {
				document.getElementById("p1_" + str[2].substr(0, 1)).value = eval(document
						.getElementById("p1_" + str[2].substr(0, 1)).value
						+ "-1");
				pointsum();
			} else if (($('#log option:selected').val()) == 2) {
				document.getElementById("p2_" + str[2].substr(0, 1)).value = eval(document
						.getElementById("p2_" + str[2].substr(0, 1)).value
						+ "-1");
				pointsum();
			}
			$('#log option:selected').remove();// 선택한거 지우기
			logcount--;
			$('#log option:first').remove();
			$('#log').prepend(
					"<option value='not' >" + logcount + "개의 항목" + "</option>");
			$('#log option:selected').prop("selected", false);
			$('#log option:first').attr("selected", "selected");
			$('#log').scrollTop(0);
		}
	} else {
		alert("선택된 로그가 없습니다.");
	}

}

// ///////////////////////////////////////////////////log

function logpoint(player, point) {
	var gametime = document.getElementById("gametime").value;
	var name1 = document.getElementById("name1").value;
	var name2 = document.getElementById("name2").value;
	count++;
	logcount++;
	$('#log option:first').remove();
	$('#log').prepend(
			"<option value='not' disabled>" + logcount + "개의 항목" + "</option>");

	if (player == 1) {
		var option = $("<option value='" + player + "'>" + " " + name1
				+ " " + point + " " + gametime + "</option>");
		$('#log').append(option);
	} else {
		var option = $("<option value='" + player + "'>" + " " + name2
				+ " " + point + " " + gametime + "</option>");
		$('#log').append(option);
	}

	$('#log option:selected').prop("selected", false);
	$('#log option:last').attr("selected", "selected");
	$('#log').scrollTop($(document).height());
}

function pointsum() {
	document.all.p2_rp.value = document.all.p2_P.value;
	document.all.p2_ra.value = document.all.p2_A.value;
	document.all.p2_result.value = 4 * parseInt(document.all.p2_4.value) + 3
			* parseInt(document.all.p2_3.value) + 2
			* parseInt(document.all.p2_2.value);

	document.all.p1_rp.value = document.all.p1_P.value;
	document.all.p1_ra.value = document.all.p1_A.value;
	document.all.p1_result.value = 4 * parseInt(document.all.p1_4.value) + 3
			* parseInt(document.all.p1_3.value) + 2
			* parseInt(document.all.p1_2.value);

	
	//이기고있는유저 색변화
	if (document.all.p1_result.value * 1 > document.all.p2_result.value * 1) {
		document.getElementById("player1p").className = "resultp1w";
		document.getElementById("player2p").className = "resultpw";
	} else if (document.all.p1_result.value * 1 < document.all.p2_result.value * 1) {
		document.getElementById("player1p").className = "resultpw";
		document.getElementById("player2p").className = "resultp2w";
	} else {
		if (document.all.p1_ra.value * 1 > document.all.p2_ra.value * 1) {
			document.getElementById("player1p").className = "resultp1w";
			document.getElementById("player2p").className = "resultpw";
		} else if (document.all.p1_ra.value * 1 < document.all.p2_ra.value * 1) {
			document.getElementById("player1p").className = "resultpw";
			document.getElementById("player2p").className = "resultp2w";
		} else {
			if (document.all.p1_P.value * 1 < document.all.p2_P.value * 1) {
				document.getElementById("player1p").className = "resultp1w";
				document.getElementById("player2p").className = "resultpw";
			} else if (document.all.p1_P.value * 1 > document.all.p2_P.value * 1) {
				document.getElementById("player1p").className = "resultpw";
				document.getElementById("player2p").className = "resultp2w";
			} else {
				document.getElementById("player1p").className = "resultpw";
				document.getElementById("player2p").className = "resultpw";
			}
		}
	}

}

// /////////////////////////////////////////////////////////점수연산

var time = -1;
var running = 0;
var startfirst = 0;
var resetbutton = 0;
var gametime;
var gametimeuse = new Array();
var secs;
var mins;
var tenths;

function startPause() {
	if (startfirst == 0) {// 스타트 처음눌렸을때
		if (document.getElementById("gametime").value == "") {// 공백으로 시작하면
			// 5분카운트
			document.getElementById("gametime").value = "0500";
		}
		if (document.getElementById("name1").value == "")
			document.getElementById("name1").value = "Player1";
		if (document.getElementById("name2").value == "")
			document.getElementById("name2").value = "Player2";

		document.getElementById("name1").disabled = true;
		document.getElementById("name2").disabled = true;
		document.getElementById("gametime").disabled = true;
		document.getElementById("endreset").disabled = false;
		gametime = parseInt(document.getElementById("gametime").value);
		gametimeuse[0] = Math.floor(gametime / 1000);
		gametimeuse[1] = Math.floor(gametime / 100) - gametimeuse[0] * 10;
		gametimeuse[2] = Math.floor(gametime / 10)
				- (gametimeuse[0] * 100 + gametimeuse[1] * 10);
		gametimeuse[3] = gametime
				- (gametimeuse[0] * 1000 + gametimeuse[1] * 100 + gametimeuse[2] * 10);

		secs = gametimeuse[2] * 10 + gametimeuse[3];
		mins = gametimeuse[0] * 10 + gametimeuse[1];

		startfirst = 1;
		running = 0;
	}

	if (running == 2) {// 경기끝
		document.getElementById("start").innerHTML = "START";
		document.getElementById("start").style.color="#000000";
		document.getElementById("startPause").style.backgroundColor = "#e89c9e";
		document.getElementById("startPause").style.borderColor = "#e89c9e";
		document.getElementById("startPause").disabled = true;
		document.getElementById("endreset").disabled = false;
		document.getElementById("end").innerHTML = "RESET";
		document.getElementById("end").style.color="#000000";
		resetbutton = 1;
		document.getElementById("endreset").style.backgroundColor = "#91baf9";
		document.getElementById("endreset").style.borderColor = "#91baf9";
		$("#tableall input[type=button]").attr("disabled", true);
	} else if (running == 0) {// 돌아가고있을때 버튼클릭
		running = 1;
		decrement();
		document.getElementById("start").innerHTML = "PAUSE";
		document.getElementById("start").style.color="#ffffff";
		document.getElementById("startPause").style.backgroundColor = "#e89c9e";
		document.getElementById("startPause").style.borderColor = "#e89c9e";

		$("#tableall input[type=button]").attr("disabled", false);
	} else {// 일시중지시 버튼클릭
		running = 0;
		document.getElementById("start").innerHTML = "START";
		document.getElementById("start").style.color="#000000";
		document.getElementById("startPause").style.backgroundColor = "#e89c9e";
		document.getElementById("startPause").style.borderColor = "#e89c9e";

		$("#tableall input[type=button]").attr("disabled", true);
	}
}
function endreset() {
	if (resetbutton == 0) {// 게임종료기능 버튼
		gameover();
		resetbutton = 1;
		document.getElementById("startPause").disabled = true;
		document.getElementById("end").innerHTML = "RESET";
		document.getElementById("end").style.color="#000000";
		document.getElementById("endreset").style.backgroundColor = "#91baf9";
		document.getElementById("endreset").style.borderColor = "#91baf9";
		document.getElementById("logbutton").disabled = true;
	} else {
		resetbutton = 0;
		$('#log option[value!="not"]').remove();
		count = 0;
		logcount = 0;
		$('#log option:first').remove();
		$('#log').prepend(
				"<option value='not' >" + logcount + "개의 항목" + "</option>");
		document.getElementById("end").innerHTML = "END";
		document.getElementById("end").style.color="#ffffff";
		document.getElementById("logbutton").disabled = false;
		document.getElementById("endreset").style.backgroundColor = "#e89c9e";
		document.getElementById("endreset").style.borderColor = "#e89c9e";
		document.getElementById("endreset").disabled = true;
		running = 3;
		time = -1;
		startfirst = 0;
		document.getElementById("name1").disabled = false;
		document.getElementById("name2").disabled = false;
		document.getElementById("gametime").disabled = false;
		document.getElementById("startPause").disabled = false;
		document.getElementById("name1").value = null;
		document.getElementById("name2").value = null;
		document.getElementById("gametime").value = null;
		document.getElementById("start").innerHTML = "START";
		document.getElementById("start").style.color="#000000";
		document.getElementById("startPause").style.backgroundColor = "#e89c9e";
		document.getElementById("startPause").style.borderColor = "#e89c9e";
		$("#tableall input[type=button]").attr("disabled", true);

		document.getElementById("p1_4").value = 0;
		document.getElementById("p1_3").value = 0;
		document.getElementById("p1_2").value = 0;
		document.getElementById("p1_P").value = 0;
		document.getElementById("p1_A").value = 0;

		document.getElementById("p2_4").value = 0;
		document.getElementById("p2_3").value = 0;
		document.getElementById("p2_2").value = 0;
		document.getElementById("p2_P").value = 0;
		document.getElementById("p2_A").value = 0;

		pointsum();
	}

}

function decrement() {
	if (running == 1) {
		setTimeout(function() {
			++time;
			tenths = 100 - Math.floor(time % 100);
			if (tenths == 100)
				tenths = 0;
			/*
			 * 타이머 색변화 if (mins == 0 && secs <= 29) {
			 * document.getElementById("gametime").style.color = "#FF5A5A"; }
			 * else if (mins == 0 && secs <= 59) {
			 * document.getElementById("gametime").style.color = "#FFBB00"; }
			 */
			if (tenths == 0) {
				if (secs > 0) {
					secs -= 1;
				} else if (secs == 0) {
					if (mins > 0) {
						mins -= 1;
						secs = 59;
					} else if (mins == 0) {
						document.getElementById("gametime").value = "00:00:00";
						gameover();
					}
				}
			}

			if (mins < 10)
				document.getElementById("gametime").value = "0" + mins;
			else
				document.getElementById("gametime").value = mins;
			if (secs < 10)
				document.getElementById("gametime").value += ":0" + secs;
			else
				document.getElementById("gametime").value += ":" + secs;
			if (tenths < 10)
				document.getElementById("gametime").value += ":0" + tenths;
			else
				document.getElementById("gametime").value += ":" + tenths;

			if (running == 3)
				document.getElementById("gametime").value = null;
			else
				decrement();
		}, 10)
	}
}

function gameover() {// 경기시간끝!
	
	var name1 = document.getElementById("name1").value;
	var name2 = document.getElementById("name2").value;

	var p1_result = document.getElementsByName("p1_result")[0].value * 1;
	var p2_result = document.getElementsByName("p2_result")[0].value * 1;

	var p1_ra = document.getElementsByName("p1_ra")[0].value * 1;
	var p2_ra = document.getElementsByName("p2_ra")[0].value * 1;

	var p1_rp = document.getElementsByName("p1_rp")[0].value * 1;
	var p2_rp = document.getElementsByName("p2_rp")[0].value * 1;
	
	
	
	if (p1_result > p2_result) {
		alert(p1_result + " Point " + name1 + " Win!");
	} else if (p1_result < p2_result) {
		alert(p2_result + " Point " + name2 + " Win!");
	} else {
		alert(p2_result + " SamePoint! Advantage Check!");
		if (p1_ra > p2_ra) {
			alert(p1_ra + " Advantage " + name1 + " Win!");
		} else if (p1_ra < p2_ra) {
			alert(p2_ra + " Advantage " + name2 + " Win!");
		} else {
			alert(p2_ra + " SameAdvantage! Penalty Check!");
			if (p1_rp < p2_rp) {
				alert(p1_rp + " Penalty " + name1 + " Win!");
			} else if (p1_rp > p2_rp) {
				alert(p2_rp + " Penalty " + name2 + " Win!");
			} else {
				alert(p2_rp + " SamePenalty!");
				alert("A Referee Decides!");
			}
		}
	}
	
	running = 2;
	startPause();

}// //////////////////////////////////////////////////////////////////타이머,
// 버튼관련

