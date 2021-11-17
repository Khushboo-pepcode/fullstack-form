

var row = 1;

var submit = document.getElementById("submit");
submit.addEventListener("click", displayDetails);

document.getElementById("update").addEventListener("click", update);


 function displayDetails(){
	// var Id = document.getElementById("Id").value;
 	var name = document.getElementById("name").value;
 	var email = document.getElementById("email").value;
 	var mobile = document.getElementById("mobile").value;
 	var subject = document.getElementById("subject").value;
	 

	// reset
	var	reset = document.getElementById("reset");
	reset.addEventListener("click" , resetDetails);

	function resetDetails(){
		var name = document.getElementById("name").value = "";
		var email = document.getElementById("email").value = "";
		var mobile = document.getElementById("mobile").value = "";
		var subject = document.getElementById("subject").value = "";
	}


 	//table
 	var data = document.getElementById("data");
 	var	newRow = data.insertRow(data.length);

 	// cells

 	var cell1 = newRow.insertCell(0);
 	var cell2 = newRow.insertCell(1);
 	var cell3 = newRow.insertCell(2);
 	var cell4 = newRow.insertCell(3);
	var cell5 = newRow.insertCell(4);
	var cell6 = newRow.insertCell(5);

 	// geeting values in cells
	// cell1.innerHTML = Id;
 	// cell2.innerHTML = name;
 	// cell3.innerHTML = email;
 	// cell4.innerHTML = mobile;
 	// cell5.innerHTML = subject;
	// cell6.innerHTML = `<a onClick="onEdit(this)"><i class="fas fa-edit"></i></a> <a onClick="onDelete(this)"><i class="fas fa-trash-alt"></i></a>`;

	return false;
  
 }
//  passing value in hidden

// var id = document.getElementById("Id");
// id.addEventListener("click", displayDetails);
 
//  function myEdit(id){
//  	selectedRow = Id.parentElement.parentElement;
// 	document.getElementById("Id").value = data.id.innerHTML;
//  	document.getElementById("name").value = data.id.name.innerHTML;
//  	document.getElementById("email").value = data.id.email.innerHTML;
//  	document.getElementById("mobile").value = data.id.mobile.innerHTML;
//  	document.getElementById("subject").value = data.id.subject.innerHTML;
// 	 console.log(selectedRow.cells);
//  }
 
 function myEdit(data) {
	let { ID, name, email, mobile, subject } = JSON.parse(data);
	// selectedRow = id.parentElement;
	
		document.getElementById("Id").value = ID;
 		document.getElementById("name").value = name;
 		document.getElementById("email").value = email;
 		document.getElementById("mobile").value = mobile;
 		document.getElementById("subject").value = subject;

	// var details = 
	// selectedRow = id.parentElement;
	
	//  {
	// 	document.getElementById("Id").value = data.id.innerHTML;
 	// 	document.getElementById("name").value = data.id.name.innerHTML;
 	// 	document.getElementById("email").value = data.id.email.innerHTML;
 	// 	document.getElementById("mobile").value = data.id.mobile.innerHTML;
 	// 	document.getElementById("subject").value = data.id.subject.innerHTML;
	//   }
	// };
  }



 function update(e){
	 e.preventDefault();
	let data = {};
	let id = document.getElementById("Id").value;
	data.name = document.getElementById("name").value;
 	data.email = document.getElementById("email").value;
 	data.mobile = document.getElementById("mobile").value;
 	data.subject = document.getElementById("subject").value;
	 console.log(id, data);
	 fetch(`/details/${id}`, { method: "POST", body: data });
 }

 function myDelete(id){
 	fetch(`/details/${id}`, { method: "DELETE" });
 }

//  window.onload = function(){
// 	document.getElementById('form').onsubmit = function(){
// 		return false 
// 	}
// }

// function submit(){
// 	var count = parseInt(document.getElementById('studentId').value);
// 	for(i=0; i<data.length; i++){
// 		count(i);
// 	}
	
// 	document.getElementById('studentId').value=count;
// }

