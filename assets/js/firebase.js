/* Copyright (C) Vivank Sharma, Inc - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
  * Modifying, copying and changing in any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Vivank Sharma <vivanksharma@ymail.com>, January 2019
 */

fn = document.getElementById("form_name")
em = document.getElementById("form_email")
sub = document.getElementById("form_subject")
m = document.getElementById("form_message")

function submitClick(){
	

	var firebaseRef = firebase.database().ref();

	var nametext = fn.value;
	var emailtext = em.value;
	var subtext = sub.value;
	var msgtext = m.value;
	firebaseRef.push().set(
	{
		Name : nametext.toString(),
		Email : emailtext.toString(),
		Subject : "subtext.toString()",
		Message : "msgtext.toString()",
	});
	

	window.alert(nametext)
}